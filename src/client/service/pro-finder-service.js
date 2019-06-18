import path from 'path';
import fs from 'fs';

export default class ProFinderService {
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }

    getProfessionCategories() {
        const pathName = path.resolve(__dirname, `../../../src/client/service/profession-categories.json`);
        const professionCategories = JSON.parse(fs.readFileSync(pathName, 'utf8'));
        const visibleProfessionCategories = professionCategories.filter(professionCategory => !professionCategory.hidden);
        this.cachedVisibleCategories = visibleProfessionCategories;
        return visibleProfessionCategories;
    }
}
