import React, { Component } from 'react';
import { Row, Col, Dropdown, Button, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postcode: '',
            categories: [],
        }

        this.validatePostcode = postcode => {
            postcode = postcode.replace(/\s/g, "");
            const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i
            return regex.test(postcode);
        }

        this.updateInputValue = evt => {
            this.setState({
                postcode: evt.target.value
            });
        }
    }

    render() {
        return (
            <div data-testid="search-form__container">
                <Dropdown
                    data-testid="search-form__category-dropdown"
                    className="search-form__category-dropdown"
                >
                </Dropdown>
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
                <Button data-testid="search-form__search-btn" className="search-form__search-btn">
                    Search
                </Button>
            </div >
        );
    };
}

SearchForm.propTypes = {
    updateSearchResults: PropTypes.func,
}

export default SearchForm;
