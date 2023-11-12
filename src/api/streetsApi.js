import axios from 'axios';
import { API_BASE_URL } from './index';

export const fetchStreets = () => {
  return axios.get(`${API_BASE_URL}Request/streets`)
    .then(response => {
      console.log('Streets data:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching streets:', error);
    });
};


