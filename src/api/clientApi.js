import axios from 'axios';
import { API_BASE_URL } from './index';

export const fetchApartments = async houseId => {
  try {
    const response = await axios.get(`${API_BASE_URL}HousingStock?houseId=${houseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching apartments:', error);
  }
};

export const fetchClients = () => {
  return axios.get(`${API_BASE_URL}HousingStock/clients`, {
    headers: {
      'Accept': 'text/plain'
    }
  })
  .then(response => {
      console.log('Clients data:', response.data);
      if (response.status === 204) {
        return [];
      }
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching clients:', error);
    });
};

export const addClient = async (clientData, apartmentId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}HousingStock/client`, clientData);
    const clientId = response.data.id;
    await bindClientToApartment(clientId, apartmentId);
    console.log('Client is successfully bound to the apartment');
    console.log('clientId', response);
    return clientId;
  } catch (error) {
    console.error('Error in adding client or binding to apartment:', error);
    throw error;
  }
};

export const bindClientToApartment = async (clientId, apartmentId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}HousingStock/bind_client`, {
      ClientId: clientId,
      AddressId: apartmentId
    });
    console.log('Client is bound to apartment:', response.data);
    console.log('apartmentIdвввввв', apartmentId);
  } catch (error) {
    console.error('Error binding client to apartment:', error);
  }
};

export const deleteClient = async (bindId) => {
  const response = await axios.delete(`${API_BASE_URL}HousingStock/bind_client/${bindId}`);
  console.log('Client deleted:', response.data);
};


