import React from 'react';
import { Dropdown, Button } from 'react-bootstrap'
import SearchForm from '../../../src/client/components/search-form';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';

// const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
// const mockCards = fs.readFileSync(pathName, 'utf8');

describe('Search Form', () => {
    const render = customProps => {
        const props = {
            // Default props
            ...customProps,
        }
        return mount(<SearchForm {...props} />);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <SearchForm />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Renders the container for the layout', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="search-form__container"]')
                .exists()
        ).toBeTruthy();
    });

    it('Sets a prop to update the search results', () => {
        const mockUpdateResults = jest.fn();
        const renderedApp = render({ 'updateSearchResults': mockUpdateResults});
        expect(
            renderedApp
                .props().updateSearchResults
        ).toBe(mockUpdateResults);
    })

    it('Should render a dropdown container', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="search-form__category-dropdown-container"]')
                .exists()
        ).toBeTruthy()
    });

    it('Should render a dropdown', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find(Dropdown)
                .exists()
        ).toBeTruthy();
    });

    it('Should render a search button', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find(Button)
                .exists()
        ).toBeTruthy();
    });
});
