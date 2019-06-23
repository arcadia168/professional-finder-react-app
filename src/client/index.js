import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './scss/application.scss';

import Redux, { combineReducers, createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware'
import ProFinderService from '../client/service/pro-finder-service';
import proCategory from './reducers/proCategory.js';
import proLocation from './reducers/proLocation.js';
import proCategories from './reducers/proCategories.js';
import searchResults from './reducers/searchResults.js';

debugger;
const proFinderApp = combineReducers({
  proCategory,
  proLocation,
  proCategories,
  searchResults
});

const proFinderStore = createStore(proFinderApp, applyMiddleware(promise));

const renderProFinder = () => {
  render(
    <App
      localProValues={proFinderStore.getState()}
      store={proFinderStore}
    />,
    document.getElementById('root')
  );
}

proFinderStore.dispatch({
  type: 'PRO_CATEGORIES',
  payload: ProFinderService.getProfessionCategories()
});

proFinderStore.subscribe(renderProFinder);
renderProFinder();


