import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Pagination,
    Alert,
    Spinner,
} from 'react-bootstrap';
import ProFinderService from '../service/pro-finder-service';
import SearchForm from '../components/search-form.jsx'
import SearchResultsTable from './search-results-table.jsx';
import { connect } from 'react-redux';

// mapStateToProps = (state) => {
//     return {

//     }
// }

class ProfessionalFinder extends Component {
    componentDidMount() {
        this.maxResultsPerPage = 20;
        const { store } = this.context;
        const state = store.getState();
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );

        this.handlePageChanged = evt => {
            debugger;
            let pageClicked;

            if (evt.target.innerText.indexOf("«") > -1) {
                pageClicked = 0;
            } else if (evt.target.innerText.indexOf("»") > -1) {
                pageClicked = state.searchResults.numPages - 1;
            } else {
                pageClicked = Number.parseInt(evt.target.text) - 1; // 0 indexed
            }

            const newPageResultsOffset = pageClicked * (this.maxResultsPerPage - 1) // 0 indexed;

            // Replace with action dispatch...
            this.props.dispatch({
                type: 'SEARCH_LOCAL_PROS',
                payload: ProFinderService.searchForLocalProfessionals(
                    Number.parseInt(state.proCategory.categoryId),
                    state.proLocation.location,
                    newPageResultsOffset
                )
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        let pages = [];
        for (let i = 0; i < state.searchResults.numPages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={state.searchResults.activePage === (i + 1)}
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
                        <h3 data-testid="pro-finder__title" className="pro-finder__title">
                            Find a Local Professional
                        </h3>
                    </Col>
                </Row>
                <Row data-testid="pro-finder__search-form-row" className="pro-finder__search-form-row">
                    <Col data-testid="pro-finder__search-form-col" className="pro-finder__search-form-col">
                        <SearchForm
                            dispatch={this.props.dispatch}
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
                        {
                            state.searchResults.loading ?
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                : state.searchResults.error ?
                                    <Alert variant="danger">
                                        {state.searchResults.error}
                                    </Alert>
                                    : state.searchResults.searchResults.length === 0 ?
                                        <Alert variant="info">Make a search above!</Alert>
                                        :
                                        <SearchResultsTable
                                            data-testid="pro-finder__search-results-table"
                                            className="pro-finder__search-results-table"
                                            searchResults={state.searchResults.searchResults}
                                            error={state.searchResults.error}
                                            proFinderValues={this.proFinderValues}
                                        />
                        }

                    </Col>
                </Row>
                {
                    state.searchResults.loading === true ? null :
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
                                            <Pagination.First
                                                className="pro-finder__pagination-first-item"
                                                onClick={this.handlePageChanged}
                                                key={0}
                                            />
                                            {pages}
                                            <Pagination.Last
                                                className="pro-finder__pagination-last-item"
                                                onClick={this.handlePageChanged}
                                                key={this.props.localProValues.searchResults.numPages - 1}
                                            />
                                        </Pagination> : null
                                }
                            </Col>
                        </Row>
                }
            </Container>
        );
    };
}

export default ProfessionalFinder;
