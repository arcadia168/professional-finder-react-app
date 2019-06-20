import React, { Component } from 'react';
import { Row, Col, Dropdown, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-testid="search-form__container">
                <div
                    data-testid="search-form__category-dropdown-container"
                    className="search-form__category-dropdown-container"
                >
                    <Dropdown
                        data-testid="search-form__category-dropdown"
                        className="search-form__category-dropdown"
                    >
                    <Button data-testid="search-form__search-btn" className="search-form__search-btn">

                    </Button>
                    </Dropdown>

                </div>
            </div>
        );
    };
}

SearchForm.propTypes = {
    updateSearchResults: PropTypes.func,
}

export default SearchForm;
