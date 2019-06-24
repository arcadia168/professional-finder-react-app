import React, { Component } from 'react';
import { Table, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';

const renderError = errorMessage => {
    debugger;
    return (
        <Alert variant="danger">
            {errorMessage}
        </Alert>
    )
}

const renderSearchResults = searchResults => {
    debugger;
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
                    searchResults.map(searchResult => {
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

const SearchResultsTable = ({
    searchResults,
    errorMessage,
}) => {
    debugger;
    if (errorMessage) {
        return renderError(errorMessage);
    } else {
        return renderSearchResults(searchResults);
    }
}

const mapStateToProps = state => {
    debugger;
    return {
        searchResults: state.searchResults.searchResults,
        errorMessage: state.searchResults.error
    }
}

export default connect(
    mapStateToProps,
    null
)(SearchResultsTable)
