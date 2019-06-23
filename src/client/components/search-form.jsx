import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types'
import ProFinderService from '../service/pro-finder-service';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.updateInputValue = evt => {
            debugger;
            this.props.store.dispatch({
                type: 'UPDATE_PRO_LOCATION',
                location: evt.target.value
            });
        }

        this.handleCategoryChosen = (evtKey, evt) => {
            debugger;
            this.props.store.dispatch({
                type: 'UPDATE_PRO_CATEGORY',
                categoryName: evt.currentTarget.text,
                categoryId: evtKey
            })
        }

        this.handleSearchBtn = () => {
            debugger;

            let locationValidation;
            const postcode = this.props.localProValues.proLocation.location;

            if (postcode) {
                const squishedPostcode = postcode.replace(/\s/g, "");
                const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1}/i
                locationValidation = regex.test(squishedPostcode);
            }

            if (!locationValidation) {
                this.props.store.dispatch({
                    type: 'SET_ERROR',
                    error: 'Please enter a valid UK postcode...',
                    loading: false,
                })
            }

            if (!this.props.localProValues.proCategory.categoryId) {
                this.props.store.dispatch({
                    type: 'SET_ERROR',
                    error: 'Please choose a valid category',
                    loading: false,
                });
            }
            this.props.store.dispatch({
                type: 'SEARCH_LOCAL_PROS',
                payload: ProFinderService.searchForLocalProfessionals(
                    this.props.localProValues.proCategory.categoryId,
                    this.props.localProValues.proLocation.location,
                    0
                )
            })
        }
    }

    render() {
        debugger;
        return (
            <div data-testid="search-form__container" className="search-form__container">
                <DropdownButton
                    title={this.props.localProValues.proCategory.categoryName || 'Choose a category'}
                    onSelect={this.handleCategoryChosen}
                    data-testid="search-form__category-dropdown"
                    className="search-form__category-dropdown"
                >
                    {
                        this.props.localProValues.proCategories.loadingCategories ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading Categories</span>
                            </Spinner>
                            :
                            this.props.localProValues.proCategories.categories.map(category => {
                                return <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
                            })
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

SearchForm.propTypes = {
    updateSearchResults: PropTypes.func,
    categories: PropTypes.array,
}

export default SearchForm;
