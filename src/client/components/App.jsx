import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types'
import ProfessionalFinder from './professional-finder.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={() => {
            return <ProfessionalFinder
              localProValues={this.props.localProValues}
              store={this.props.store}
            />
          }}
        />
      </Router>
    )
  }
}

App.propTypes = {
  localProValues: PropTypes.object,
  store: PropTypes.object
}

export default App;
