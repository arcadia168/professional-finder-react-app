import ProFinderService from '../../../src/client/service/pro-finder-service';
import path from 'path';
import fs from 'fs';

jest.spyOn(console, 'error');

const mockCategoriesPathName = path.resolve(__dirname, `../../__mocks__/profession-categories-mock.json`);
const mockProfessionCategories = JSON.parse(fs.readFileSync(mockCategoriesPathName, 'utf8'));
const visibleProfessionCategoriesMock = mockProfessionCategories.filter(currentProfessionCategory => !currentProfessionCategory.hidden);

const mockLocalProfessionalsPathName = path.resolve(__dirname, `../../__mocks__/local-professionals-mock.json`);
const mockLocalProfessionals = JSON.parse(fs.readFileSync(mockLocalProfessionalsPathName, 'utf8'));

async function testSearchLocalProfessionalWithParams(proService, params, paramToCheck) {
    try {
        const searchForLocalProfressionalResults = await proService.searchForLocalProfessionals(
            ...params,
        );
        expect(searchForLocalProfressionalResults).toBe(null);
    } catch (error) {
        expect(
            error.message
        ).toBe(
            `ProFinderService.searchForLocalProfessional: Please pass in valid parameter ${paramToCheck}`
        )
        expect(
            console.error
        ).toHaveBeenCalledWith(
            `ProFinderService.searchForLocalProfessional: Please pass in valid parameter ${paramToCheck}`
        )
    }
}

describe('Pro Finder Api Service', () => {
    let mockAxios = jest.fn(() => Promise.resolve(mockLocalProfessionals));
    let proFinderServiceInstance;
    let validCategoryId = 5;
    let validLocation = "sw11";
    let validPaginationOffsetHeader = 0;
    beforeEach(() => {
        proFinderServiceInstance = new ProFinderService(mockAxios);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('When a pro finder api service is instantiated', () => {
        describe('When no axios instance has been supplied', () => {
            it('Should throw an error with a meaningful message', async () => {
                try {
                    const brokenProFinderServiceInstance = new ProFinderService();
                    expect(brokenProFinderServiceInstance).toBe(null);
                } catch (error) {
                    expect(
                        error.message
                    ).toBe(
                        'Error at ProFinderService.constructor: Please ensure you pass in a valid instance of axios when instantiating.'
                    );
                }
            });

            it('Should log the error to the console', () => {
                try {
                    const brokenProFinderServiceInstance = new ProFinderService();
                    expect(brokenProFinderServiceInstance).toBe(null);
                } catch (error) {
                    expect(
                        console.error
                    ).toHaveBeenCalledWith(
                        'Error at ProFinderService.constructor: Please ensure you pass in a valid instance of axios when instantiating.'
                    );
                }
            });
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
        describe('When the call to the API is successful', () => {
            let mockAxiosCategories;
            let proFinderServiceInstance;

            beforeEach(() => {
                mockAxiosCategories = jest.fn(() => Promise.resolve({
                    data: mockProfessionCategories
                }));
                proFinderServiceInstance = new ProFinderService(mockAxiosCategories);
            })

            it('Returns a list of professions', async () => {
                try {
                    const professionCategoriesList = await proFinderServiceInstance.getProfessionCategories();
                    expect(
                        professionCategoriesList
                    ).toEqual(
                        visibleProfessionCategoriesMock
                    )
                } catch (error) {
                    expect(error).toBe(null);
                }
            });

            it('Removes any hidden professions from the list before returning them', async () => {
                try {
                    const visibleProfessionCategories = await proFinderServiceInstance.getProfessionCategories();
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
                } catch (error) {
                    expect(error).toBe(null);
                }
            });

            it('Caches the retrieved JSON categories for faster access next time', async () => {
                await proFinderServiceInstance.getProfessionCategories();
                expect(
                    proFinderServiceInstance.cachedVisibleCategories
                ).toEqual(
                    visibleProfessionCategoriesMock
                )
            });

            it('Retrieves the categories from the cached property instead of reading them in from a file', async () => {
                await proFinderServiceInstance.getProfessionCategories();
                const fsSpy = jest.spyOn(fs, 'readFileSync');
                await proFinderServiceInstance.getProfessionCategories();
                expect(fsSpy).not.toHaveBeenCalled()
            });
        })

        describe('When the call to the API fails', () => {
            let mockAxiosError;
            let proFinderServiceInstanceError;

            beforeEach(() => {
                mockAxiosError = jest.fn(() => Promise.reject(new Error('api error')));
                proFinderServiceInstanceError = new ProFinderService(mockAxiosError);
            })

            it('Should throw a meaningful error and log to the console', async () => {
                try {
                    const searchResults = await proFinderServiceInstanceError.getProfessionCategories();
                    expect(searchResults).toBe(null);
                } catch (error) {
                    const expectedErrorMessage =
                        'Error at proFinderService.getProfessionCategories: api error';
                    expect(
                        error.message
                    ).toBe(
                        'Error at proFinderService.getProfessionCategories: api error'
                    )
                    expect(
                        console.error
                    ).toHaveBeenCalledWith(
                        expectedErrorMessage
                    )
                }
            });
        });
    });

    describe('When the searchForLocalProfessional method is invoked', () => {
        const apiUrl = 'https://demo.plentific.com/find-a-pro/api/v2/public/pro/search-pros/';

        describe('When invalid parameters are passed to the method', () => {
            describe('When incorrect categoryId is passed to the method', () => {
                describe('When an invalid categoryId is passed to the method', () => {
                    describe('When no categoryId is passed to the method', () => {
                        it('Should throw an error with a meaningful error message and log to console', async () => {
                            testSearchLocalProfessionalWithParams(
                                proFinderServiceInstance,
                                [
                                    null,
                                ],
                                'categoryId'
                            );
                        });
                    });

                    describe('When a categoryId is passed to the method that is not a number', () => {
                        it('Should throw an error with a meaningful error message and log to console', async () => {
                            testSearchLocalProfessionalWithParams(
                                proFinderServiceInstance,
                                [
                                    'five',
                                ],
                                'categoryId'
                            );
                        });
                    });
                });
            });

            describe('When an invalid paginationOffsetHeader is passed to the method', () => {
                describe('When no paginationOffsetHeader passed to the method', () => {
                    it('Should throw an error with a meaningful error message and log to console', async () => {
                        testSearchLocalProfessionalWithParams(
                            proFinderServiceInstance,
                            [
                                validCategoryId,
                            ],
                            'paginationOffsetHeader'
                        );
                    });
                });

                describe('When a paginationOffsetHeader is passed to the method that is not a number', () => {
                    it('Should throw an error with a meaningful error message and log to the console', async () => {
                        testSearchLocalProfessionalWithParams(
                            proFinderServiceInstance,
                            [
                                validCategoryId,
                                '5'
                            ],
                            'paginationOffsetHeader'
                        );
                    });
                });
            });

            describe('When incorrect location is passed to the method', () => {
                describe('When no location is passed to the method', () => {
                    it('Should throw an error with a meaningful error message and log to the console', async () => {
                        testSearchLocalProfessionalWithParams(
                            proFinderServiceInstance,
                            [
                                validCategoryId,
                                validPaginationOffsetHeader
                            ],
                            'location'
                        );
                    });
                });

                describe('When a categoryId is passed to the method that is not a string', () => {
                    it('Should throw an error with a meaningful error message', async () => {
                        testSearchLocalProfessionalWithParams(
                            proFinderServiceInstance,
                            [
                                validCategoryId,
                                validPaginationOffsetHeader,
                                123
                            ],
                            'location'
                        );
                    });
                });
            });
        });

        describe('When valid search paramters are passed to the method', () => {
            describe('When the call to the POST API endpoint fails', () => {
                let mockAxiosError;
                let proFinderServiceInstanceError;

                beforeEach(() => {
                    mockAxiosError = jest.fn(() => Promise.reject(new Error('api error')));
                    proFinderServiceInstanceError = new ProFinderService(mockAxiosError);
                })

                it('Should throw a meaningful error and log to the console', async () => {
                    try {
                        const searchResults = await proFinderServiceInstanceError.searchForLocalProfessionals(
                            validCategoryId,
                            validPaginationOffsetHeader,
                            validLocation
                        );
                        expect(searchResults).toBe(null);
                    } catch (error) {
                        const expectedErrorMessage =
                            'Error at proFinderService.searchForLocalProfessionals: api error';
                        expect(
                            error.message
                        ).toBe(
                            'Error at proFinderService.searchForLocalProfessionals: api error'
                        )
                        expect(
                            console.error
                        ).toHaveBeenCalledWith(
                            expectedErrorMessage
                        )
                    }
                });
            });
        });
    });
});
