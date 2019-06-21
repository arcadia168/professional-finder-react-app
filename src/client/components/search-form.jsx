import React, { Component } from 'react';
import { Row, Col, Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'

class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-testid="search-form__container">
                <Dropdown
                    data-testid="search-form__category-dropdown"
                    className="search-form__category-dropdown"
                >
                </Dropdown>
                <InputGroup
                    data-testid="search-form__search-field"
                >
                    <FormControl
                        data-testid="search-form__search-field-input"
                        placeholder="Enter UK Postcode here..."
                        aria-label="Enter UK Postcode here..."
                    >
                    </FormControl>
                </InputGroup>
                <Button data-testid="search-form__search-btn" className="search-form__search-btn">
                    Search
                </Button>
            </div >
        );
    };
}

SearchForm.propTypes = {
    updateSearchResults: PropTypes.func,
}

export default SearchForm;
