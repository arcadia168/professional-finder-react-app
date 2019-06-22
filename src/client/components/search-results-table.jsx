import React, { Component } from 'react';
import { Table, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component';

export default class SearchResultsTable extends Component {
    constructor(props) {
        super(props);
    }

    renderError() {
        return (
            <Alert variant="danger">
                {this.props.error}
            </Alert>
        )
    }

    renderSearchResults() {
        return (
            <Table striped bordered hover data-testid="search-form-results__container">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Postcode</th>
                        <th>Review rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.searchResults.map(searchResult => {
                            return <tr key={searchResult.id}>
                                <td>{searchResult.id}</td>
                                <td>{searchResult.name.slice(0, -35)}</td>
                                <td>{searchResult.main_address.postcode}</td>
                                <td>
                                    <StarRatingComponent
                                        name={searchResult.name}
                                        starCount={5}
                                        value={searchResult.review_rating}
                                    />
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table >
        )
    }

    render() {
        if (this.props.error) {
            return this.renderError();
        } else {
            return this.renderSearchResults();
        }
    }
}

SearchResultsTable.propTypes = {
    searchResults: PropTypes.array,
}
