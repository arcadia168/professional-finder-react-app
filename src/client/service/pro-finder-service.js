import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, `../../../src/client/service/professions.json`);

export default class ProFinderService {
    constructor(axiosInstance) {
        this.axios = axiosInstance;
    }

    getProfessions() {
        const professions = JSON.parse(fs.readFileSync(pathName, 'utf8'));
        return professions;
    }
}
