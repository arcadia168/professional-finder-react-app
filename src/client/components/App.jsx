import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types'
import ProfessionalFinder from './professional-finder.jsx';

export default () => {
    return (
      <Router>
        <Route
          exact
          path="/"
          component={ProfessionalFinder}
        />
      </Router>
    )
}
