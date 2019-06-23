import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './scss/application.scss';
import axios from 'axios';
import ProFinderService from '../client/service/pro-finder-service';
import Redux, { combineReducers, createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware'

const axiosInstance = axios;
const proFinderService = new ProFinderService(axiosInstance);

// Simple reducers...

const proCategories = (
  state = {},
  action
) => {
  debugger;
  switch (action.type) {
    case 'PRO_CATEGORIES_PENDING':
      debugger;
      return {
        isFulfilled: false,
      }
    case 'PRO_CATEGORIES_FULFILLED':
      debugger;
      return {
        isFulfilled: true,
        categories: action.payload
      }
    case 'PRO_CATEGORIES_REJECTED':
      debugger;
      return {
        isRejected: true,
        error: action.payload
      }
    default:
      debugger;
      return state;
  };
}

const proLocation = (state = { location: undefined }, action) => {
  debugger;
  switch (action.type) {
    case 'UPDATE_PRO_LOCATION':
      debugger;
      return {
        location: action.location,
      }
    default:
      return state;
  }
}

const proCategory = (state = { category_id: undefined, category_name: undefined }, action) => {
  debugger;
  switch (action.type) {
    case 'CHOOSE_PRO_CATEGORY':
      debugger;
      return {
        categoryId: action.categoryId,
        categoryName: action.categoryName,
      }
    default:
      return state;
  }
}

const searchResults = (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_LOCAL_PROS':

      // action dispatch should contain category_id, location and offset.

      // Validate postcode
      // split below into error reducer?
      let locationValidation;
      const postcode = action.location;
      postcode = postcode.replace(/\s/g, "");
      const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1}/i
      locationValidation = regex.test(postcode);

      if (!locationValidation) {
        return {
          error: 'Please enter a valid UK postcode',
          loading: false,
        }
      }

      // Validate category_id
      if (!action.category_id) {
        return {
          error: 'Please choose a valid category',
          loading: false,
        }
      }
      // above split into error reducer? //

      return this.props.proFinderService.searchForLocalProfessionals(
        action.category_id,
        action.offset,
        action.location
      ).then(response => {

        const searchResults = response.results;
        const numPages = Math.ceil(response.totalCount / this.maxResultsPerPage);

        if (searchResults.length === 0) {
          return {
            error: 'No local professionals found for this search. Please try again.',
            loading: false,
          }
        } else {
          return {
            searchResults: searchResults,
            numPages: numPages,
            categoryId: categoryId,
            location: location,
            activePage: Math.ceil((offset / this.maxResultsPerPage) + 1),
            error: undefined,
            loading: false,
          };
        }
      }).catch(error => {
        const userFriendlyError = `Oops! Something went wrong: ${error.message}`;
        return {
          error: userFriendlyError,
          loading: false,
        };
      });
    default:
      return state;
  }
};

const proFinderApp = combineReducers({
  proCategories,
  proLocation,
  proCategory,
  searchResults
});


const proFinderStore = createStore(proFinderApp,  applyMiddleware(promise));

debugger;
proFinderStore.dispatch({
  type: 'PRO_CATEGORIES',
  payload: proFinderService.getProfessionCategories()
});

// const renderProFinder = (categories, proFinderService) => {
//   render(
//     <App
//       categories={categories}
//       localProValues={proFinderStore.getState()}
//       store={proFinderStore}
//     />,
//     document.getElementById('root')
//   );
// }

// Initial render
// proFinderService.getProfessionCategories().then(
//   categories => {
//     debugger;
//     // Subscribe for further state updates
//     proFinderStore.subscribe(renderProFinder);
//     renderProFinder(categories, proFinderService);
//   }
// )


