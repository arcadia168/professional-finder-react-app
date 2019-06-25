import React from 'react';
import ProfessionalFinder from '../../../src/client/components/professional-finder';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';
import { Pagination } from 'react-bootstrap';
import SearchForm from '../../../src/client/components/search-form';
import SearchResultsTable from '../../../src/client/components/search-results-table';
import ProFinderService from '../../../src/client/service/pro-finder-service';

const mockLocalProfessionalsPathName = path.resolve(__dirname, `../../__mocks__/local-professionals-mock.json`);
const mockLocalProfessionals = JSON.parse(fs.readFileSync(mockLocalProfessionalsPathName, 'utf8'));
const mockCategoriesPathName = path.resolve(__dirname, `../../__mocks__/profession-categories-mock.json`);
const mockProfessionCategories = JSON.parse(fs.readFileSync(mockCategoriesPathName, 'utf8'));
const visibleProfessionCategoriesMock = mockProfessionCategories.filter(currentProfessionCategory => !currentProfessionCategory.hidden);

xdescribe('Professional Finder', () => {
    const render = customProps => {
        const props = {
            // Default props
            categories: visibleProfessionCategoriesMock,
            ...customProps,
        }
        return mount(<ProfessionalFinder {...props} />);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <ProfessionalFinder categories={visibleProfessionCategoriesMock} />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Sets some default state with empty searchResulst on render', () => {
        const component = render();
        expect(
            component
                .state('searchResults')
        ).toEqual([]);
        expect(
            component.state('error')
        ).toBe(undefined)
    });

    it('Takes in a proFinderService instance and assigns this to a property', () => {
        const mockAxios = jest.fn();
        const proFinderServiceInstanceProp = new ProFinderService(mockAxios);
        const component = render({
            'proFinderService': proFinderServiceInstanceProp
        });
        expect(
            component
                .props().proFinderService
        ).toBe(proFinderServiceInstanceProp)
    });

    describe('When the method updateSearchResults is invoked', () => {
        describe('When the search results call to the API fails', () => {
            it('Assigns a meaningful error message to the state', async () => {
                const mockApiFailingSearch = jest.fn(() => Promise.reject(new Error('Some service error')));
                const failingProFinderService = {
                    searchForLocalProfessionals: mockApiFailingSearch,
                }
                const component = render({ 'proFinderService': failingProFinderService });

                await component.instance().updateSearchResults();
                expect(
                    component.state('error')
                ).toEqual(
                    'Please choose a valid job category'
                );
            });
        });
    });

    it('Renders the container for the layout', () => {
        const component = render();
        expect(
            component
                .find('[data-testid="pro-finder__container"]')
                .exists()
        ).toBeTruthy();
    });

    describe('Page Title', () => {
        it('Renders a row for the site title', () => {
            const component = render();
            expect(
                component
                    .find('[data-testid="pro-finder__title-row"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders a title container', () => {
            const component = render();
            expect(
                component
                    .find('[data-testid="pro-finder__title-col"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders the title text', () => {
            const component = render();
            expect(
                component
                    .find('[data-testid="pro-finder__title"]')
                    .exists()
            ).toBeTruthy();
            expect(
                component
                    .find('[data-testid="pro-finder__title"]')
                    .text()
            ).toEqual(
                'Find a Local Professional'
            );
        });
    });

    describe('Search Form', () => {
        it('Renders a row for the search form', () => {
            const component = render();
            expect(
                component
                    .find(SearchForm)
                    .exists()
            ).toBeTruthy();
        });

        it('Passes the proFinderService prop down to the SearchForm', () => {
            const mockAxios = jest.fn();
            const newProFinderService = new ProFinderService(mockAxios);
            const component = render({ 'proFinderService': newProFinderService });
            expect(
                component
                    .find(SearchForm)
                    .props().proFinderService
            ).toBe(
                newProFinderService
            );
        });

        it('Renders a column to layout the search form', () => {
        });

        it('Renders a column for the search form', () => {
            const component = render();
            expect(
                component
                    .find('[data-testid="pro-finder__search-form-col"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders the Search Form component', () => {
            const component = render();
            expect(
                component
                    .find('[data-testid="pro-finder__search-form"]')
                    .exists()
            ).toBeTruthy();
        })
    });

    describe('Search Results Table', () => {
        it('Renders a row to show the search results', () => {
            const component = render();
            expect(
                component
                    .find('[data-testid="pro-finder__search-results-row"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders a column for the search results table', () => {
            const component = render();
            expect(
                component
                    .find('[data-testid="pro-finder__search-results-table-col"]')
                    .exists()
            ).toBeTruthy();
        });
    });
});
