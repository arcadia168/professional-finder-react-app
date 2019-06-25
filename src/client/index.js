import React from 'react';
import { render } from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './scss/application.scss';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware'
import ProfessionalFinder from './components/professional-finder.jsx'
import proCategory from './reducers/proCategory.js';
import proLocation from './reducers/proLocation.js';
import proCategories from './reducers/proCategories.js';
import searchResults from './reducers/searchResults.js';
// import App from './components/app.jsx';
import ProFinderService from '../client/service/pro-finder-service';
// import SearchForm from '../client/components/search-form.jsx';

const proFinderApp = combineReducers({
  proCategory,
  proLocation,
  proCategories,
  searchResults
});

const proFinderStore = createStore(proFinderApp, applyMiddleware(promise));

proFinderStore.dispatch({
  type: 'PRO_CATEGORIES',
  payload: ProFinderService.getProfessionCategories()
});

render(
  <Provider store={proFinderStore}>
    <ProfessionalFinder />
  </Provider>,
    document.getElementById('root')
);

