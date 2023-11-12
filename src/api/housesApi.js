import axios from 'axios';
import { API_BASE_URL } from './index';

export const fetchHouses = streetId => {
  return axios.get(`${API_BASE_URL}Request/houses/${streetId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching houses:', error);
    });
};

