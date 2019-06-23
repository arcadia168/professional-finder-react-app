import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './scss/application.scss';
import axios from 'axios';
import ProFinderService from '../client/service/pro-finder-service';
import Redux, { combineReducers, createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware'

// Simple reducers...

const proCategories = (
  state = {
    loadingCategories: false,
    categories: [],
  },
  action
) => {
  switch (action.type) {
    case 'PRO_CATEGORIES_PENDING':
      return {
        loadingCategories: true,
      }
    case 'PRO_CATEGORIES_FULFILLED':
      debugger;
      return {
        loadingCategories: false,
        categories: action.payload
      }
    case 'PRO_CATEGORIES_REJECTED':
      debugger;
      return {
        loadingCategories: false,
        isRejected: true,
        error: action.payload
      }
    default:
      return state;
  };
}

const proCategory = (
  state = {
    categoryName: undefined,
    categoryId: undefined
  },
  action
) => {
  switch (action.type) {
    case 'UPDATE_PRO_CATEGORY':
      return {
        categoryId: action.categoryId,
        categoryName: action.categoryName,
      }
    default:
      return state;
  };
}

const proLocation = (state = { location: undefined }, action) => {
  switch (action.type) {
    case 'UPDATE_PRO_LOCATION':
      return {
        location: action.location,
      }
    default:
      return state;
  };
}

const searchResults = (
  state = {
    searchResults: [],
    numPages: 1,
    activePage: 1,
    loading: false,
    error: undefined,
  },
  action
) => {
  switch (action.type) {
    case 'SET_ERROR':
      debugger;
      return {
        error: action.error
      }
    case 'SEARCH_LOCAL_PROS_PENDING':
      debugger;
      return {
        searchResults: [],
        loading: true,
        error: undefined,
      }
    case 'SEARCH_LOCAL_PROS_FULFILLED':
      debugger;

      // Parsing results and setting state
      const searchResults = action.payload.results;
      const numPages = Math.ceil(action.payload.totalCount / this.maxResultsPerPage);

      if (searchResults.length === 0) {
        return {
          searchResults: [],
          numPages: 1,
          activePage: 1,
          error: 'No local professionals found for this search. Please try again.',
          loading: false,
        }
      } else {
        return {
          searchResults: searchResults,
          numPages: numPages,
          activePage: Math.ceil((action.payload.offset / this.maxResultsPerPage) + 1),
          error: undefined,
          loading: false,
        };
      }
    case 'SEARCH_LOCAL_PROS_REJECTED':
      debugger;
      return {
        searchResults: [],
        numPages: 1,
        activePage: 1,
        searchResults: [],
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
};

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

// Initial render
// Subscribe for further state updates
proFinderStore.subscribe(renderProFinder);
renderProFinder();


