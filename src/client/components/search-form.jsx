import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-testid="search-form__container">
                <Button onClick={this.props.changeResults}>
                    Update results
                </Button>
            </div>
        );
    };
}

SearchForm.propTypes = {
    proFinderService: PropTypes.object,
    changeResults: PropTypes.func,
}

export default SearchForm;
