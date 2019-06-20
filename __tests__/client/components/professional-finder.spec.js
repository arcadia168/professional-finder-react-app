import React from 'react';
import ProfessionalFinder from '../../../src/client/components/professional-finder';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';
import SearchForm from '../../../src/client/components/search-form';
import SearchResultsTable from '../../../src/client/components/search-results-table';
import { Pagination } from 'react-bootstrap';

// const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
// const mockCards = fs.readFileSync(pathName, 'utf8');

describe('Professional Finder', () => {
    const render = customProps => {
        const props = {
            // Default props
            ...customProps,
        }
        return mount(<ProfessionalFinder {...props} />);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <ProfessionalFinder />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders the container for the layout', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="pro-finder__container"]')
                .exists()
        ).toBeTruthy();
    });

    describe('Page Title', () => {
        it('Renders a row for the site title', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__title-row"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders a title container', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__title-col"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders the title text', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__title"]')
                    .exists()
            ).toBeTruthy();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__title"]')
                    .text()
            ).toEqual(
                'Find a Local Professional'
            );
        });
    });

    describe('Search Form', () => {
        it('Renders a row for the search form', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find(SearchForm)
                    .exists()
            ).toBeTruthy();
        });

        it('Renders a column to layout the search form', () => {
        });

        it('Renders a column for the search form', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__search-form-col"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders the Search Form component', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__search-form"]')
                    .exists()
            ).toBeTruthy();
        })
    });

    describe('Search Results Table', () => {
        it('Renders a row to show the search results', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__search-results-row"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders a column for the search results table', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__search-results-table-col"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders the Search Results Table component', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find(SearchResultsTable)
                    .exists()
            ).toBeTruthy();
        })
    });

    describe('Pagination Control', () => {
        it('Renders a row to house the pagination controls', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__pagination-control-row"]')
                    .exists()
            ).toBeTruthy();
        });

        it('Renders a pagination container column', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="pro-finder__pagination-control-col"]')
                    .exists()
            ).toBeTruthy();
        })

        it('Renders a pagination control', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find(Pagination)
                    .exists()
            ).toBeTruthy();
        });
    });
});
