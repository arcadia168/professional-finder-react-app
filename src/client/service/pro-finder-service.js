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

    searchForLocalProfessionals(searchParams, paginationOffsetHeader) {
        if (!searchParams) {
            const searchProError = new Error(
                'ProFinderService.searchForLocalProfessional: Please pass in valid search parameters'
            )
            console.error(searchProError.message);
            throw searchProError
        }

        if (paginationOffsetHeader === undefined || paginationOffsetHeader === null) {
            const searchProError = new Error(
                'ProFinderService.searchForLocalProfessional: Please pass in valid paginationOffsetHeader header parameter'
            )
            console.error(searchProError.message);
            throw searchProError
        }

        // We always want this to be 20, this can be configured here.
        const xPaginationLimitHeader = 20;

        // Now use the axios instance to make the post request.
    }
}
