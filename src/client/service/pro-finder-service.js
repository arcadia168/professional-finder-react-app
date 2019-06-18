import path from 'path';
import fs from 'fs';

export default class ProFinderService {
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }

    getProfessionCategories() {
        const pathName = path.resolve(__dirname, `../../../src/client/service/profession-categories.json`);
        const professions = JSON.parse(fs.readFileSync(pathName, 'utf8'));
        const visibleProfessions = professions.filter(currentProfession => !currentProfession.hidden);
        return visibleProfessions;
    }
}
