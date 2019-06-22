import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Pagination,
    Alert,
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
            categoryId: undefined,
            location: undefined
        };

        this.updateSearchResults = (
            categoryId,
            location,
            offset,
            invalidPostcode
        ) => {
            console.log(`params are: ${categoryId} ${location} ${offset}`)

            debugger;
            if (!categoryId) {
                debugger;
                return this.setState({
                    error: 'Please choose a valid job category'
                });
            } else if (!location || invalidPostcode) {
                debugger;
                return this.setState({
                    error: 'Please enter a valid UK postcode'
                });
            }

            return this.props.proFinderService.searchForLocalProfessionals(
                categoryId,
                offset,
                location
            ).then(searchResults => {
                console.log(`updating search resulsts with ${searchResults.length}`);
                let numPages = Math.ceil(searchResults.length / 20)

                //If no results here also set an error
                if (searchResults.length === 0) {
                    debugger;
                    this.setState({
                        error: 'No local professionals found for this search. Please try again.'
                    })
                } else {
                    debugger;
                    this.setState({
                        searchResults: searchResults,
                        numPages: numPages,
                        categoryId: categoryId,
                        location: location,
                        activePage: (offset / 20) + 1,
                        error: undefined,
                    });
                }
            }).catch(error => {
                console.log('error in search results')
                const userFriendlyError = `Oops! Something went wrong: ${error.message}`;
                this.setState({
                    error: userFriendlyError
                });
            });
        }

        this.handlePageChanged = evt => {
            debugger;
            const pageClicked = Number.parseInt(evt.target.text) - 1; // 0 indexed
            const newPageResultsOffset = pageClicked * 20;

            this.updateSearchResults(
                this.state.categoryId,
                this.state.location,
                newPageResultsOffset
            );
        }
    };

    render() {
        let pages = [];
        for (let i = 0; i < this.state.numPages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={this.state.activePage === i + 1}
                    onClick={this.handlePageChanged}
                >
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
                        {
                            this.state.error ?
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                                : this.state.searchResults.length === 0 ?
                                    <Alert variant="info">Make a search above!</Alert>
                                    :
                                    <SearchResultsTable
                                        data-testid="pro-finder__search-results-table"
                                        className="pro-finder__search-results-table"
                                        searchResults={this.state.searchResults}
                                        error={this.state.error}
                                    />
                        }

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
