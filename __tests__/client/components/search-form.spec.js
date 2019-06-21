import React from 'react';
import { Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap'
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

    it('Sets up the default state', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .state()
        ).toEqual({
            postcode: '',
            categories: [],
        });
    });

    it('Sets a prop to update the search results', () => {
        const mockUpdateResults = jest.fn();
        const renderedApp = render({ 'updateSearchResults': mockUpdateResults });
        expect(
            renderedApp
                .props().updateSearchResults
        ).toBe(mockUpdateResults);
    })

    it('Should render a dropdown', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="search-form__category-dropdown"]')
                .exists()
        ).toBeTruthy();
    });

    it('Should render a search button', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="search-form__search-btn"]')
                .exists()
        ).toBeTruthy();
    });

    it('Should have a button label', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="search-form__search-btn"]').at(0)
                .text()
        ).toEqual(
            'Search'
        );
    });

    describe('Search Postcode Field', () => {
        it('Should have a container for the search field', () => {
            const renderedApp = render();
            expect(
                renderedApp
                    .find('[data-testid="search-form__search-field"]').at(0)
                    .exists()
            ).toBeTruthy();
        });

        describe('Search input field', () => {
            it('Should have an input field for the postcode', () => {
                const renderedApp = render();
                expect(
                    renderedApp
                        .find('[data-testid="search-form__search-field-input"]').at(0)
                        .exists()
                ).toBeTruthy();
            });

            it('Should have a default placeholder', () => {
                const renderedApp = render();
                expect(
                    renderedApp
                        .find('[data-testid="search-form__search-field-input"]').at(0)
                        .prop('placeholder')
                ).toBe('Enter UK Postcode here...');
            });

            it('Should have a an aria label', () => {
                const renderedApp = render();
                expect(
                    renderedApp
                        .find('[data-testid="search-form__search-field-input"]').at(0)
                        .prop('aria-label')
                ).toBe('Enter UK Postcode here...');
            });
        });
    });

    it('Should take a valid postcode as valid', () => {
        const renderedApp = render();
        const validPostcode = renderedApp.instance().validatePostcode('OL16 3QS');
        expect(
            validPostcode
        ).toBe(true);
    });

    it('Should take an invalid postcode as invalid', () => {
        const renderedApp = render();
        const validPostcode = renderedApp.instance().validatePostcode('sdfsdfsdf');
        expect(
            validPostcode
        ).toBe(false);
    })

    it('Should set valid postcode on state when typed into field', () => {
        const renderedApp = render();
        renderedApp.find(FormControl)
            .simulate(
                'change',
                { target:
                    {
                        value: 'OL16 4HF'
                    }
                }
            )
        expect(
            renderedApp.state('postcode')
        ).toBe('OL16 4HF');
    });

    // describe('When search button is pressed', () => {
    //     describe('When the postcode entered is invalid', () => {

    //     });

    //     describe('When the postcode entered is valid', () => {

    //     });
    // });
});
