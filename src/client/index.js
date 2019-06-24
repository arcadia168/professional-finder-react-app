import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './scss/application.scss';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware'
import App from './components/app.jsx';
// import ProfessionalFinder from './components/professional-finder.jsx'
import ProFinderService from '../client/service/pro-finder-service';
import proCategory from './reducers/proCategory.js';
import proLocation from './reducers/proLocation.js';
import proCategories from './reducers/proCategories.js';
import searchResults from './reducers/searchResults.js';
import { Provider } from 'react-redux';
import SearchForm from './components/search-form.jsx';

const proFinderApp = combineReducers({
  proCategory,
  proLocation,
  proCategories,
  searchResults
});

const proFinderStore = createStore(proFinderApp, applyMiddleware(promise));
debugger;

render(
  <Provider store={proFinderStore}>
    <SearchForm />
  </Provider>,
  document.getElementById('root')
);

proFinderStore.dispatch({
  type: 'PRO_CATEGORIES',
  payload: ProFinderService.getProfessionCategories(),
});
