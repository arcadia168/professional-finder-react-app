import ProFinderService from '../../../src/client/service/pro-finder-service';
import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, `../../../src/client/service/professions.json`);
const mockProfessions = JSON.parse(fs.readFileSync(pathName, 'utf8'));
const visibleProfessions = mockProfessions.filter(currentProfession => !currentProfession.hidden);

describe('Pro Finder Api Service', () => {
    let mockAxiosPostSearch = jest.fn(() => Promise.resolve());
    let mockAxios = {
        get: mockAxiosPostSearch,
    };

    describe('When a pro finder api service is instantiated', () => {
        let proFinderServiceInstance;

        beforeEach(() => {
            proFinderServiceInstance = new ProFinderService(mockAxios);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Returns an instance of the service', () => {
            expect(
                proFinderServiceInstance
            ).toBeInstanceOf(
                ProFinderService
            )
        });

        it('Can take an instance of axios and assign this to a property', () => {
            expect(proFinderServiceInstance.axios).toEqual(mockAxios);
        });

        it('Returns a list of professions', () => {
            const professionList = proFinderServiceInstance.getProfessions();
            expect(
                professionList
            ).toEqual(
                visibleProfessions
            )
        });

        it('Removes any hidden professions from the list before returning them', () => {
            const visibleProfessionList = proFinderServiceInstance.getProfessions();
            let hiddenProfessions = [];
            visibleProfessionList.forEach(currentProfession => {
                if (currentProfession.hidden) {
                    hiddenProfessions.push(currentProfession);
                }
            });

            expect(
                hiddenProfessions.length
            ).toBe(
                0
            )
        });
    })
});
