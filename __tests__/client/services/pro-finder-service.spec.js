import ProFinderService from '../../../src/client/service/pro-finder-service';

describe('Pro Finder Api Service', () => {
    describe('When a pro finder api service is instantiated', () => {
        it('Returns an instance of the service', () => {
            const proFinderServiceInstance = new ProFinderService();
            expect(
                proFinderServiceInstance
            ).toBeInstanceOf(
                ProFinderService
            )
        });
    })
});
