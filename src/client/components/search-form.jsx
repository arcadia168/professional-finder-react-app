import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownButton, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import searcLocalPro from '../actionCreators/searchLocalPro';
import updateCategory from '../actionCreators/updateCategory';
import updateLocation from '../actionCreators/updateLocation';

const SearchForm = ({
    chosenCategoryName,
    chosenCategoryId,
    categoriesLoading,
    categories,
    location,
    setError,
    updateCategory,
    updateLocation,
    searchLocalPros,
}) => {
    return (
        <div data-testid="search-form__container" className="search-form__container">
            <DropdownButton
                title={chosenCategoryName || 'Choose a category'}
                onSelect={(evtKey, evt) => {
                    const categoryParams = {
                        categoryName: evt.currentTarget.text,
                        categoryId: evtKey
                    };
                    updateCategory(categoryParams);
                }}
                data-testid="search-form__category-dropdown"
                className="search-form__category-dropdown"
            >
                {
                    categoriesLoading ?
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading Categories</span>
                        </Spinner>
                        :
                        categories ? categories.map(category => {
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
                    onChange={evt => {
                        updateLocation(evt.target.value);
                    }}
                >
                </FormControl>
            </InputGroup>
            <Button
                data-testid="search-form__search-btn"
                className="search-form__search-btn"
                onClick={() => {
                    let locationValidation;
                    const postcode = location;

                    if (postcode) {
                        const squishedPostcode = postcode.replace(/\s/g, "");
                        const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1}/i
                        locationValidation = regex.test(squishedPostcode);
                    }

                    if (!chosenCategoryId) {
                        setError('Please choose a category of job.');
                    } else if (!locationValidation) {
                        setError('Please enter a valid UK postcode...');
                    } else {
                        const searchParams = {
                            location: location,
                            categoryId: chosenCategoryId
                        };
                        searchLocalPros(searchParams)
                    }
                }}
            >
                Submit
                </Button>
        </div >
    );
};

const mapStateToProps = state => {
    return {
        chosenCategoryName: state.proCategory.categoryName,
        chosenCategoryId: state.proCategory.categoryId,
        categories: state.proCategories.categories,
        categoriesLoading: state.proCategories.categoriesLoading,
        location: state.proLocation.location,
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
        dispatch(updateLocation(postcode))
    },
    updateCategory: category => {
        dispatch(updateCategory(category))
    },
    searchLocalPros: searchParams => {
        dispatch(searcLocalPro(searchParams))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchForm)

