import React from 'react';
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
});
