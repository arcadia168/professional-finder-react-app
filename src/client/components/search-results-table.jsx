import React, { Component } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';

const renderLoadingSpinner = () => {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

const renderInitialBlankResults = () => {
    return (
        <Alert variant="info">Make a search above!</Alert>
    )
}

const renderError = errorMessage => {
    return (
        <Alert variant="danger">
            {errorMessage}
        </Alert>
    )
}

const renderSearchResults = searchResults => {
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
    loading
}) => {
    if (loading) {
        return renderLoadingSpinner();
    } else if (errorMessage) {
        return renderError(errorMessage);
    } else if (searchResults.length === 0) {
        return renderInitialBlankResults(); // future 0 result searches render the above error
    } else {
        return renderSearchResults(searchResults);
    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults.searchResults,
        errorMessage: state.searchResults.error,
        loading: state.searchResults.loading
    }
}

export default connect(
    mapStateToProps,
    null
)(SearchResultsTable)
