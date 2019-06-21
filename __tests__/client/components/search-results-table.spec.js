import React from 'react';
import SearchResultsTable from '../../../src/client/components/search-results-table';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';

const mockCategoriesPathName = path.resolve(__dirname, `../../__mocks__/profession-categories-mock.json`);
const mockProfessionCategories = JSON.parse(fs.readFileSync(mockCategoriesPathName, 'utf8'));
const visibleProfessionCategoriesMock = mockProfessionCategories.filter(currentProfessionCategory => !currentProfessionCategory.hidden);

// const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
// const mockCards = fs.readFileSync(pathName, 'utf8');

describe('Search Form', () => {
    const render = customProps => {
        const props = {
            // Default props
            searchResults: visibleProfessionCategoriesMock,
            ...customProps,
        }
        return mount(<SearchResultsTable {...props} />);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <SearchResultsTable
                searchResults={visibleProfessionCategoriesMock}
            />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders the container for the layout', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="search-form-results__container"]')
                .exists()
        ).toBeTruthy();
    });
});
