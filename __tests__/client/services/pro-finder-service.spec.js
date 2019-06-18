import ProFinderService from '../../../src/client/service/pro-finder-service';

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
});
