import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import ProFinderService from '../service/pro-finder-service';
import { connect } from 'react-redux';

class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateInputValue = evt => {
            this.props.updateLocation(evt.target.value);
        }

        this.handleCategoryChosen = (evtKey, evt) => {
            const categoryParams = {
                categoryName: evt.currentTarget.text,
                categoryId: evtKey
            };
            this.props.updateCategory(categoryParams);
        }

        this.handleSearchBtn = () => {
            let locationValidation;
            const postcode = this.props.location;

            if (postcode) {
                const squishedPostcode = postcode.replace(/\s/g, "");
                const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1}/i
                locationValidation = regex.test(squishedPostcode);
            }

            if (!this.props.chosenCategory.categoryId) {
                this.props.setError('Please choose a category of job.');
            } else if (!locationValidation) {
                this.props.setError('Please enter a valid UK postcode...');
            } else {
                const searchParams = {
                    location: this.props.location,
                    categoryId: this.props.chosenCategory.categoryId
                };
                this.props.searchLocalPros(searchParams)
            }
        }
    }

    render() {
        return (
            <div data-testid="search-form__container" className="search-form__container">
                <DropdownButton
                    title={this.props.chosenCategoryName || 'Choose a category'}
                    onSelect={this.handleCategoryChosen}
                    data-testid="search-form__category-dropdown"
                    className="search-form__category-dropdown"
                >
                    {
                        this.props.categoriesLoading ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading Categories</span>
                            </Spinner>
                            :
                            this.props.categories ? this.props.categories.map(category => {
                                return <Dropdown.Item
                                    key={category.id}
                                    eventKey={category.id}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            }) : null
                    }
                </DropdownButton>
                <InputGroup
                    data-testid="search-form__search-field"
                    className="search-form__search-field"
                >
                    <FormControl
                        data-testid="search-form__search-field-input"
                        className="search-form__search-field-input"
                        placeholder="Enter UK Postcode here..."
                        aria-label="Enter UK Postcode here..."
                        ref="searchField"
                        onChange={this.updateInputValue}
                    >
                    </FormControl>
                </InputGroup>
                <Button
                    data-testid="search-form__search-btn"
                    className="search-form__search-btn"
                    onClick={this.handleSearchBtn}
                >
                    Submit
                </Button>
            </div >
        );
    };
}

const mapStateToProps = state => {
    debugger;
    return {
        chosenCategoryName: state.proCategory.categoryName,
        chosenCategoryId: state.proCategory.categoryId,
        categories: state.proCategories.categories,
        categoriesLoading: state.proCategories.categoriesLoading,
        location: state.proLocation,
    }
};

const mapDispatchToProps = dispatch => ({
    setError: errorMessage => {
        debugger;
        dispatch({
            type: 'SET_ERROR',
            error: errorMessage,
            loading: false,
        })
    },
    updateLocation: postcode => {
        debugger;
        dispatch({
            type: 'UPDATE_LOCATION',
            location: postcode,
        })
    },
    updateCategory: category => {
        debugger;
        dispatch({
            type: 'UPDATE_CATEGORY',
            categoryName: category.categoryName,
            categoryId: category.categoryId
        })
    },
    searchLocalPros: searchParams => {
        debugger;
        dispatch({
            type: 'SEARCH_LOCAL_PROS',
            payload: ProFinderService.searchForLocalProfessionals(
                Number.parseInt(searchParams.categoryId),
                searchParams.location,
                0
            )
        })
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchForm)

