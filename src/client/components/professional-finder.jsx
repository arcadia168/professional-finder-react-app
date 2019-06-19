import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'
import SearchForm from './search-form.jsx';

class ProfessionalFinder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: ['poo', 'pee', 'blood'],
        }

        this.updateResults = () => {
            // make post call to api
            // if success or error, set appropriate state
            const testResulsts = [Math.random(), 'red', 'green', 'yellow'];
            this.setState(state => ({
                results: testResulsts,
            }));
        }
    }

    render() {
        return (
            <Container data-testid="pro-finder__container" className="pro-finder__container">
                <Row data-testid="pro-finder__title-row" className="pro-finder__title-row">
                    <Col data-testid="pro-finder__title-column" className="pro-finder__title-column">
                        <h1 data-testid="pro-finder__title" className="pro-finder__title">
                            Find a Local Professional
                        </h1>
                    </Col>
                </Row>
                <Row data-testid="pro-finder__search-form-row" className="pro-finder__search-form-row">
                    <SearchForm changeResults={this.updateResults} />
                </Row>
                <Row>
                    {
                        this.state.results.map(result => {
                            console.log(`\n\n\n\n result is: ${result}`);
                            return <h4>{result}</h4>
                        })
                    }
                </Row>
            </Container>
        );
    };
}

ProfessionalFinder.propTypes = {
    proFinderService: PropTypes.object,
}

export default ProfessionalFinder;
