import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postcode: '',
            categories: [],
            categoryId: '',
            categoryName: 'Choose a category',
        }

        this.validatePostcode = postcode => {
            postcode = postcode.replace(/\s/g, "");
            const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1}/i
            return regex.test(postcode);
        }

        this.updateInputValue = evt => {
            debugger;
            this.props.store.dispatch({
                type: 'UPDATE_PRO_LOCATION',
                location: evt.target.value
            });
        }

        this.handleCategoryChosen = (evtKey, evt) => {
            this.setState({
                categoryName: evt.currentTarget.text,
                categoryId: evtKey
            })
        }

        // this.handleSearchBtn = () => {
        //     const postcode = this.state.postcode;
        //     const categoryId = this.state.categoryId;

        //     debugger;
        //     this.props.store.dispatch({

        //     })

            // if (!this.validatePostcode(postcode) || !categoryId) {
            //     this.props.updateSearchResults(
            //         categoryId,
            //         postcode,
            //         0,
            //         true
            //     );
            // } else {
            //     this.props.updateSearchResults(
            //         Number.parseInt(categoryId),
            //         postcode,
            //         0
            //     );
            // };
        // }
    }

    render() {
        return (
            <div data-testid="search-form__container" className="search-form__container">
                <DropdownButton
                    title={this.props.proFinderValues && this.props.proFinderValues.categoryName || 'Choose a category'}
                    onSelect={(evtKey, evt) => {
                        debugger;
                        this.props.store.dispatch({
                            type: 'CHOOSE_PRO_CATEGORY',
                            categoryName: evt.currentTarget.text,
                            categoryId: evtKey
                        })
                    }
                    }
                    data-testid="search-form__category-dropdown"
                    className="search-form__category-dropdown"
                >
                    {
                        this.props.proFinderValues && this.props.proFinderValues.categories.map(category => {
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
