import React from 'react';
import ProfessionalFinder from '../../../src/client/components/ProfessionalFinder';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';

// const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
// const mockCards = fs.readFileSync(pathName, 'utf8');

describe('Professional Finder', () => {
    const render = customProps => {
        const props = {
            // Default props
            ...customProps,
        }
        return mount(<ProfessionalFinder {...props}/>);
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

    it('Renders a row for the site title', () => {
        const renderedApp = render();
        expect(
            renderedApp
                .find('[data-testid="pro-finder__title-row"]')
                .exists()
        ).toBeTruthy();
    });
});
