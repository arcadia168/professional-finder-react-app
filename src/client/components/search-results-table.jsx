import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component';

export default class SearchResultsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container data-testid="search-form-results__container">
                <Row>
                    <Col>Id</Col>
                    <Col>Name</Col>
                    <Col>Postcode</Col>
                    <Col>Review rating</Col>
                </Row>
                {
                    this.props.searchResults.map(searchResult => {
                        return <Row key={searchResult.id}>
                            <Col>{searchResult.id}</Col>
                            <Col>{searchResult.name.slice(0, -32)}</Col>
                            <Col>{searchResult.main_address.postcode}</Col>
                            <Col>
                                <StarRatingComponent
                                    name={searchResult.name}
                                    starCount={5}
                                    value={searchResult.review_rating}
                                />
                            </Col>
                        </Row>
                    })
                }
            </Container>
        );
    }
}

SearchResultsTable.propTypes = {
    searchResults: PropTypes.array,
}
