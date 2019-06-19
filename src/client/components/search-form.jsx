import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'

class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-testid="search-form__container">

            </div>
        );
    };
}

SearchForm.propTypes = {
    proFinderService: PropTypes.object,
}

export default SearchForm;
