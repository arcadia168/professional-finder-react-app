import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'
import SearchForm from '../components/search-form.jsx'
import SearchResultsTable from './search-results-table.jsx';

class ProfessionalFinder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container data-testid="pro-finder__container" className="pro-finder__container">
                <Row data-testid="pro-finder__title-row" className="pro-finder__title-row">
                    <Col data-testid="pro-finder__title-column" className="pro-finder__title-column">
                        <h1 data-testid="pro-finder__title" className="pro-finder__title">
                            Find a Local Professional
                        </h1>
                    </Col>
                </Row>
                <Row data-testid="pro-finder__search-form-row" className="pro-finder__search-form-row">
                    <SearchForm
                        data-testid="pro-finder__search-form"
                        className="pro-finder__search-form"
                    />
                </Row>
                <Row data-testid="pro-finder__search-results-row">
                    <SearchResultsTable
                        data-testid="pro-finder__search-results-table"
                        className="pro-finder__search-results-table"
                    />
                </Row>
                <Row data-testid="pro-finder__pagination-control-row" className="pro-finder__pagination-control-row">

                </Row>
            </Container>
        );
    };
}

ProfessionalFinder.propTypes = {
    proFinderService: PropTypes.object,
}

export default ProfessionalFinder;
