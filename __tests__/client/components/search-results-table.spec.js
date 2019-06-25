import React from 'react';
import SearchResultsTable from '../../../src/client/components/search-results-table';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import path from 'path';
import fs from 'fs';

const mockLocalProfessionalsPathName = path.resolve(__dirname, `../../__mocks__/local-professionals-mock.json`);
const mockLocalProfessionals = JSON.parse(fs.readFileSync(mockLocalProfessionalsPathName, 'utf8'));

// const pathName = path.resolve(__dirname, `../../__mocks__/validCardResults.json`);
// const mockCards = fs.readFileSync(pathName, 'utf8');

describe('Search Results', () => {
    const render = customProps => {
        const props = {
            // Default props
            searchResults: mockLocalProfessionals.response.pros,
            ...customProps,
        }
        return mount(<SearchResultsTable {...props} />);
    }
});
