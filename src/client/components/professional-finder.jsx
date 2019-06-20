import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Pagination,
} from 'react-bootstrap';
import PropTypes from 'prop-types'
import SearchForm from '../components/search-form.jsx'
import SearchResultsTable from './search-results-table.jsx';

class ProfessionalFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: []
        };

        // this.updateSearchResults = () => {
        //     this.setState(state => ({
        //         // Make a call off of the proFinderService
        //         // If successful add results to state.
        //         // If unsuccessful add an error to state.
        //     }));
        // };
    }

    render() {
        return (
            <Container data-testid="pro-finder__container" className="pro-finder__container">
                <Row data-testid="pro-finder__title-row" className="pro-finder__title-row">
                    <Col data-testid="pro-finder__title-col" className="pro-finder__title-col">
                        <h1 data-testid="pro-finder__title" className="pro-finder__title">
                            Find a Local Professional
                        </h1>
                    </Col>
                </Row>
                <Row data-testid="pro-finder__search-form-row" className="pro-finder__search-form-row">
                    <Col data-testid="pro-finder__search-form-col" className="pro-finder__search-form-col">
                        <SearchForm
                            data-testid="pro-finder__search-form"
                            className="pro-finder__search-form"
                        />
                    </Col>
                </Row>
                <Row data-testid="pro-finder__search-results-row">
                    <Col
                        data-testid="pro-finder__search-results-table-col"
                        className="pro-finder__search-results-table-col"
                    >
                        <SearchResultsTable
                            data-testid="pro-finder__search-results-table"
                            className="pro-finder__search-results-table"
                        />
                    </Col>
                </Row>
                <Row data-testid="pro-finder__pagination-control-row" className="pro-finder__pagination-control-row">
                    <Col
                        data-testid="pro-finder__pagination-control-col"
                        className="pro-finder__pagingation-control-col"
                    >
                        <Pagination
                            data-testid="pro-finder__pagination-control"
                            className="pro-finder__pagination-control"
                        >
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        );
    };
}

ProfessionalFinder.propTypes = {
    proFinderService: PropTypes.object,
}

export default ProfessionalFinder;
