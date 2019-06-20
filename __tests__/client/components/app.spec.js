import React from 'react';
import App from '../../../src/client/components/app';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ProfessionalFinder from '../../../src/client/components/professional-finder'
import proFinderService from '../../../src/client/components/professional-finder';
import ProFinderService from '../../../src/client/service/pro-finder-service';

describe('App', () => {
    const render = customProps => {
        const props = {
            // Default props
            ...customProps,
        }
        return mount(<App {...props}/>);
    }

    it('renders the app as expected', () => {
        const component = renderer.create(
            <App />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('successfully renders the app', () => {
        const renderedApp = render();
        expect(
            renderedApp.find(ProfessionalFinder).exists(),
        ).toBeTruthy();
    });

    it('assigns the proFinderService prop to the component when passed', () => {
        const mockAxios = jest.fn();
        const newProFinderService = new ProFinderService(mockAxios);
        const renderedApp = render({proFinderService: newProFinderService});
        expect(
            renderedApp.props().proFinderService,
        ).toBe(newProFinderService);
    });

    it('Assigns an object to the prop axiosInstance when passed', () => {
        const axiosInstanceMock = jest.fn();
        const renderedApp = render({ axiosInstance: axiosInstanceMock});
        expect(renderedApp.props().axiosInstance).toEqual(axiosInstanceMock);
    });
});

