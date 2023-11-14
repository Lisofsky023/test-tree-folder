import { useState } from 'react';
import apiService from '../api/apiService';

const useApartmentSelection = () => {
  const [selectedStreetId, setSelectedStreetId] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);

  const handleStreetSelect = (id) => {
    setSelectedStreetId(id);
    setSelectedHouseId(null);
    setSelectedApartment(null);
    setSelectedClients([]);
  };

  const handleHouseSelect = (id) => {
    setSelectedHouseId(id);
    setSelectedApartment(null);
    setSelectedClients([]);
  };

  const handleApartmentSelect = async (apartment) => {
    setSelectedApartment(apartment);
    try {
      const filteredClients = await apiService.fetchClients(apartment.addressId);
      if (Array.isArray(filteredClients)) {
        setSelectedClients(filteredClients);
      } else {
        console.error("API returned an unexpected type for clients:", typeof filteredClients);
        setSelectedClients([]);
      }
    } catch (error) {
      console.error("Ошибка при обновлении списка клиентов:", error);
    }
  };
  
  const refreshClients = async () => {
    if (selectedApartment) {
      try {
        const filteredClients = await apiService.fetchClients(selectedApartment.addressId);
        setSelectedClients(filteredClients);
      } catch (error) {
        console.error("Ошибка при обновлении списка клиентов:", error);
      }
    }
  };

  return {
    selectedStreetId,
    setSelectedStreetId,
    selectedHouseId,
    setSelectedHouseId,
    selectedApartment,
    setSelectedApartment,
    selectedClients,
    setSelectedClients,
    handleStreetSelect,
    handleHouseSelect,
    handleApartmentSelect,
    refreshClients,
  };
};

export default useApartmentSelection;
