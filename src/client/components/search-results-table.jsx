import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types'

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
                        return <Row>
                            <Col>{searchResult.id}</Col>
                            <Col>{searchResult.name}</Col>
                            <Col>{searchResult.main_address.postcode}</Col>
                            <Col>{searchResult.review_rating}</Col>
                        </Row>
                    })
                }
            </Container>
        );
    }
}
