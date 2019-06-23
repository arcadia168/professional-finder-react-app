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
              categories={this.props.categories}
              proFinderService={this.props.proFinderService}
              store={this.props.store}
            />
          }}
        />
      </Router>
    )
  }
}

App.propTypes = {
  proFinderService: PropTypes.object,
  categories: PropTypes.array,
}

export default App;
