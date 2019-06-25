import React from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Pagination,
} from 'react-bootstrap';
import SearchResultsTable from './search-results-table.jsx';
import SearchForm from '../components/search-form.jsx'
import updatePage from '../actionCreators/updatePage';

const ProfessionalFinder = ({
    numPages,
    activePage,
    location,
    categoryId,
    searchLoading,
    updatePage
}) => {
    let pages = [];
    for (let i = 0; i < numPages; i++) {
        pages.push(
            <Pagination.Item
                key={i}
                active={activePage === (i + 1)}
                onClick={evt => {
                    updatePage(
                        evt,
                        categoryId,
                        location,
                        numPages,
                    );
                }}
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
            {
                searchLoading === true ? null :
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
                                            onClick={evt => {
                                                updatePage(
                                                    evt,
                                                    categoryId,
                                                    location,
                                                    numPages,
                                                );
                                            }}
                                            key={0}
                                        />
                                        {pages}
                                        <Pagination.Last
                                            className="pro-finder__pagination-last-item"
                                            onClick={evt => {
                                                updatePage(
                                                    evt,
                                                    categoryId,
                                                    location,
                                                    numPages,
                                                );
                                            }}
                                            key={numPages - 1}
                                        />
                                    </Pagination> : null
                            }
                        </Col>
                    </Row>
            }
        </Container>
    );
};

const mapStateToProps = state => ({
    searchResults: state.searchResults.searchResults,
    searchLoading: state.searchResults.loading,
    searchError: state.searchResults.error,
    activePage: state.searchResults.activePage,
    numPages: state.searchResults.numPages,
    categoryId: state.proCategory.categoryId,
    location: state.proLocation.location,
})

const mapDispatchToProps = dispatch => ({
    updatePage: (evt, categoryId, location, numPages) => {
        let pageClicked;
        const maxResultsPerPage = 20;

        if (evt.target.innerText.indexOf("«") > -1) {
            pageClicked = 0;
        } else if (evt.target.innerText.indexOf("»") > -1) {
            pageClicked = numPages - 1;
        } else {
            pageClicked = Number.parseInt(evt.target.text) - 1; // 0 indexed
        }

        const newPageResultsOffset = pageClicked * maxResultsPerPage // 0 indexed;

        const searchParams = {
            categoryId,
            location,
            searchResultsOffset: newPageResultsOffset,
        }

        dispatch(updatePage(searchParams))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfessionalFinder);
