import React, { Component } from 'react';
import { Row, Col, Dropdown, DropdownButton, Button, InputGroup, FormControl } from 'react-bootstrap';
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
            this.setState({
                postcode: evt.target.value
            });
        }

        this.handleCategoryChosen = (evtKey, evt) => {
            console.log(`Setting categoryId on state: ${evtKey}`);
            console.log(`category chosen is: ${evt.currentTarget.text}`)
            debugger;
            this.setState({
                categoryName: evt.currentTarget.text,
                categoryId: evtKey
            })
        }

        this.handleSearchBtn = () => {
            console.log('search btn clicked');

            const postcode = this.state.postcode;

            // get category id from name...
            debugger;
            const categoryId = this.state.categoryId;

            console.log(`postcode is: ${postcode}`);
            console.log(`categoryId is: ${categoryId}`);
            console.log('validating postcode');
            if (!this.validatePostcode(postcode) || !categoryId) {
                console.log('enter valid postcode and category');
                this.setState({
                    error: 'Please enter a valid UK postcode and choose a category'
                });
            } else {
                // Make the call to the API
                this.props.updateSearchResults(
                    Number.parseInt(categoryId),
                    postcode,
                    0
                );
            };
        }
    }

    render() {
        return (
            <div data-testid="search-form__container">
                <DropdownButton
                    title={this.state.categoryName || 'Choose a category'}
                    onSelect={this.handleCategoryChosen}
                    data-testid="search-form__category-dropdown"
                    className="search-form__category-dropdown"
                >
                    {
                        this.props.categories.map(category => {
                            return <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
                        })
                    }
                </DropdownButton>
                <InputGroup
                    data-testid="search-form__search-field"
                >
                    <FormControl
                        data-testid="search-form__search-field-input"
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
                    Search
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
