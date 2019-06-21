import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'

export default class SearchResultsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-testid="search-form-results__container">
                {
                    this.props.searchResults.map(searchResult => {
                        return <h1>result</h1>
                    })
                }
            </div>
        );
    }
}
