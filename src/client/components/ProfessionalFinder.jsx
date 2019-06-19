import React, { Component } from 'react';
import { Container, Row, Column } from 'react-bootstrap';
import PropTypes from 'prop-types'

class ProfessionalFinder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container data-testid="pro-finder__container">

            </Container>
        );
    };
}

ProfessionalFinder.PropTypes = {
    proFinderService: PropTypes.object,
}

export default ProfessionalFinder;
