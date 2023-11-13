// apiService.js
import axios from 'axios';
import { API_BASE_URL } from './config';

const makeRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await axios[method](`${API_BASE_URL}${url}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

const apiService = {
  fetchStreets() {
    return makeRequest('get', 'Request/streets');
  },
  fetchHouses(streetId) {
    return makeRequest('get', `Request/houses/${streetId}`);
  },
  fetchApartments(houseId) {
    return makeRequest('get', `HousingStock?houseId=${houseId}`);
  },
  fetchClients(addressId) {
    return makeRequest('get', `HousingStock/clients?addressId=${addressId}`);
  },
  addClient(clientData, apartmentId) {
    return makeRequest('post', 'HousingStock/client', clientData)
      .then(response => {
        const clientId = response.id;
        return this.bindClientToApartment(clientId, apartmentId);
      });
  },  
  bindClientToApartment(clientId, apartmentId) {
    const data = {
      ClientId: clientId,
      AddressId: apartmentId
    };
    return makeRequest('put', 'HousingStock/bind_client', data);
  },  
  deleteClient(bindId) {
    return makeRequest('delete', `HousingStock/bind_client/${bindId}`);
  }
};

export default apiService;
