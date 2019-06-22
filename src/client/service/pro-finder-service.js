// import path from 'path';
// import fs from 'fs';
import qs from 'qs';
import axios from 'axios';

export default class ProFinderService {
    constructor(axiosInstance) {
        if (!axiosInstance) {
            const proFinderServiceInstanceError = new Error(
                'Error at ProFinderService.constructor: Please ensure you pass in a valid instance of axios when instantiating.'
            );
            console.error(proFinderServiceInstanceError.message);
            throw proFinderServiceInstanceError;
        }
        this.axios = axiosInstance;
    }

    getProfessionCategories(port) {
        if (this.cachedVisibleCategories) {
            return this.cachedVisibleCategories;
        } else {
            const axiosConfig = {
                method: 'get',
                url: 'http://localhost:8080/api/categories'
            }

            return this.axios(axiosConfig).then(professionCategories => {
                const visibleProfessionCategories = professionCategories.data.filter(professionCategory => !professionCategory.hidden);
                this.cachedVisibleCategories = visibleProfessionCategories;
                return visibleProfessionCategories;
            }).catch(error => {
                const getCategoriesError =
                    new Error(`Error at proFinderService.getProfessionCategories: ${error.message}`);
                console.error(getCategoriesError.message);
                throw getCategoriesError;
            })
        }
    }

    throwAndLogParameterError(invalidParameter) {
        const searchProError = new Error(
            `ProFinderService.searchForLocalProfessional: Please pass in valid parameter ${invalidParameter}`
        )
        console.error(searchProError.message);
        throw searchProError
    }

    searchForLocalProfessionals(categoryId, paginationOffsetHeader, location) {
        if (!categoryId || typeof (categoryId) !== 'number') {
            this.throwAndLogParameterError(`categoryId`);
        }

        console.log(`paginationOffsetHeader is: ${paginationOffsetHeader}`);
        if (
            paginationOffsetHeader === undefined ||
            paginationOffsetHeader === null ||
            typeof (paginationOffsetHeader) !== 'number'
        ) {
            this.throwAndLogParameterError(`paginationOffsetHeader`);
        }

        if (!location || typeof (location) !== 'string') {
            this.throwAndLogParameterError(`location`);
        }

        // We always want this to be 20, this can be configured here.
        const xPaginationLimitHeader = 20;
        const proFinderApiUrl = 'https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/';
        const data = {
            'category_id': categoryId,
            location
        };
        const axiosConfig = {
            method: 'post',
            url: proFinderApiUrl,
            headers: {
                'content-type': 'application/json',
                xPaginationLimitHeader,
                paginationOffsetHeader
            },
            data: data,
        }
        return this.axios(axiosConfig).then(response => {
            return {
                totalCount: response.headers['x-pagination-count'],
                results: response.data.response.pros,
            };
        }).catch(error => {
            const searchError = new Error(`Error at proFinderService.searchForLocalProfessionals: ${error.message}`);
            console.error(searchError.message);
            throw searchError;
        });
    }
}
