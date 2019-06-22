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
            searchResults: [],
            numPages: 0,
            error: undefined,
            activePage: 1,
        };

        this.updateSearchResults = (
            categoryId,
            location,
            offset,
        ) => {
            console.log(`params are: ${categoryId} ${location} ${offset}`)
            return this.props.proFinderService.searchForLocalProfessionals(
                categoryId,
                offset,
                location
            ).then(searchResults => {
                console.log(`updating search resulsts with ${searchResults.length}`);
                let numPages = Math.ceil(searchResults.length / 20)
                this.setState({
                    searchResults: searchResults,
                    numPages: numPages,
                });
            }).catch(error => {
                console.log('error in search results')
                const userFriendlyError = `Oops! Something went wrong: ${error.message}`;
                this.setState({
                    error: userFriendlyError
                });
            });
        }
    };

    render() {
        let pages = [];
        debugger;
        for (let i = 0; i < this.state.numPages; i++) {
            pages.push(
                <Pagination.Item key={i} active={this.state.activePage}>
                    {i + 1}
                </Pagination.Item>
            )
        }
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
                            categories={this.props.categories}
                            proFinderService={this.props.proFinderService}
                            updateSearchResults={this.updateSearchResults}
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
                            searchResults={this.state.searchResults}
                        />
                    </Col>
                </Row>
                <Row data-testid="pro-finder__pagination-control-row" className="pro-finder__pagination-control-row">
                    <Col
                        data-testid="pro-finder__pagination-control-col"
                        className="pro-finder__pagingation-control-col"
                    >
                        {
                            pages.length > 1 ?
                                <Pagination
                                    data-testid="pro-finder__pagination-control"
                                    className="pro-finder__pagination-control"
                                >
                                    {pages}
                                </Pagination> : null
                        }
                    </Col>
                </Row>
            </Container>
        );
    };
}

ProfessionalFinder.propTypes = {
    proFinderService: PropTypes.object,
    categories: PropTypes.array
}

export default ProfessionalFinder;
