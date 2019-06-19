import React, { Component } from 'react';
import { Container, Row, Column } from 'react-bootstrap';
import PropTypes from 'prop-types'

class ProfessionalFinder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container data-testid="pro-finder__container" className="pro-finder__container">
                <Row data-testid="pro-finder__title-row" className="pro-finder__title-row">

                </Row>
            </Container>
        );
    };
}

ProfessionalFinder.propTypes = {
    proFinderService: PropTypes.object,
}

export default ProfessionalFinder;
