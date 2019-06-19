import ProFinderService from '../../../src/client/service/pro-finder-service';
import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, `../../../src/client/service/profession-categories.json`);
const mockProfessionCategories = JSON.parse(fs.readFileSync(pathName, 'utf8'));
const visibleProfessionCategoriesMock = mockProfessionCategories.filter(currentProfessionCategory => !currentProfessionCategory.hidden);

describe('Pro Finder Api Service', () => {
    let mockAxiosPostSearch = jest.fn(() => Promise.resolve());
    let mockAxios = {
        post: mockAxiosPostSearch,
    };
    let proFinderServiceInstance;

    beforeEach(() => {
        proFinderServiceInstance = new ProFinderService(mockAxios);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When a pro finder api service is instantiated', () => {
        it('Should throw an error if no axios instance has been supplied', () => {
            try {
                const brokenProFinderServiceInstance = new ProFinderService();
                expect(brokenProFinderServiceInstance).toBe(null);
            } catch (error) {
                expect(
                    error.message
                ).toBe(
                    'ProFinderService.constructor: Please ensure you pass in a valid instance of axios when instantiating.'
                );
            }
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
    })

    describe('When the getProfessionCategories method is invoked', () => {
        it('Returns a list of professions', () => {
            const professionCategoriesList = proFinderServiceInstance.getProfessionCategories();
            expect(
                professionCategoriesList
            ).toEqual(
                visibleProfessionCategoriesMock
            )
        });

        it('Removes any hidden professions from the list before returning them', () => {
            const visibleProfessionCategories = proFinderServiceInstance.getProfessionCategories();
            let hiddenProfessionCategories = [];
            visibleProfessionCategories.forEach(currentProfessionCategory => {
                if (currentProfessionCategory.hidden) {
                    hiddenProfessionCategories.push(currentProfessionCategory);
                }
            });

            expect(
                hiddenProfessionCategories.length
            ).toBe(
                0
            )
        });

        it('Caches the retrieved JSON categories for faster access next time', () => {
            proFinderServiceInstance.getProfessionCategories();

            expect(
                proFinderServiceInstance.cachedVisibleCategories
            ).toEqual(
                visibleProfessionCategoriesMock
            )
        });

        it('Retrieves the categories from the cached property instead of reading them in from a file', () => {
            proFinderServiceInstance.getProfessionCategories();
            const fsSpy = jest.spyOn(fs, 'readFileSync');
            proFinderServiceInstance.getProfessionCategories();
            expect(fsSpy).not.toHaveBeenCalled()
        });
    });

    describe('When the searchForLocalProfessional method is invoked', () => {
        const apiUrl = 'https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/';

        // it('Should make a POST request to the API', async () => {
        //     const searchForLocalProfressionalResults = ProFinderService.searchForLocalProfressionalResults();

        // });
    });
});
