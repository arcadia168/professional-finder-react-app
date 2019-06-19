import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foo: 'foo'
        }
        this.passParamsToPropFunc = () => {
            this.setState(
                { foo: 'bar'},
                () => {
                    const someInternalParams = [this.state.foo, 'lalalal', 'wpppaj'];
                    this.props.changeResults(someInternalParams);
                }
            );
        }
    }


    render() {
        return (
            <div data-testid="search-form__container">
                <Button onClick={this.passParamsToPropFunc}>
                    {this.props.btnText}
                </Button>
            </div>
        );
    };
}

SearchForm.propTypes = {
    proFinderService: PropTypes.object,
    changeResults: PropTypes.func,
}

export default SearchForm;
