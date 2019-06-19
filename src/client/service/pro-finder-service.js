import path from 'path';
import fs from 'fs';

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

    getProfessionCategories() {
        if (this.cachedVisibleCategories) {
            return this.cachedVisibleCategories;
        } else {
            const pathName = path.resolve(__dirname, `../../../src/client/service/profession-categories.json`);
            const professionCategories = JSON.parse(fs.readFileSync(pathName, 'utf8'));
            const visibleProfessionCategories = professionCategories.filter(professionCategory => !professionCategory.hidden);
            this.cachedVisibleCategories = visibleProfessionCategories;
            return visibleProfessionCategories;
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
        // Now use the axios instance to make the post request.
        const axiosConfig = {
            method: 'post',
            url: proFinderApiUrl,
            headers: {
                xPaginationLimitHeader,
                paginationOffsetHeader
            },
            body: {
                categoryId,
                location
            }
        }

        console.info(`The axiosConfig to be used is: ${JSON.stringify(axiosConfig)}`);

        // Use async/await for cleaner more readable async code.
        // try {

        // } catch (searchError) {

        // }
        const searchResults = this.axios(axiosConfig);
    }
}
