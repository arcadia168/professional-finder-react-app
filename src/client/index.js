import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './scss/application.scss';
import axios from 'axios';
import ProFinderService from '../client/service/pro-finder-service';

const axiosInstance = axios;
const proFinderService = new ProFinderService(axiosInstance);

proFinderService.getProfessionCategories().then(
  categories => {
    render(
      <App categories={categories} proFinderService={proFinderService}/>,
      document.getElementById('root')
    );
  }
)
