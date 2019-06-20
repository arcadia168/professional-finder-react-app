import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types'
import ProfessionalFinder from './professional-finder.jsx';

const App = () => {
  return (
    <Router>
      <Route
      exact path="/" component={ProfessionalFinder} />
    </Router>
    // render={() => {
    //   return <ProfessionalFinder proFinderService={this.props.proFinderService} />
    // }}
  )
}

App.propTypes = {
  proFinderService: PropTypes.object,
}

export default App;
