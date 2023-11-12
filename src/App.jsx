import { useState } from 'react';
import StreetList from './components/StreetList';
import HouseList from './components/HouseList';
import ApartmentList from './components/ApartmentList';
import ApartmentDetail from './components/ApartmentDetail';
import { fetchClients } from './api/clientApi';

const App = () => {
  const [selectedStreetId, setSelectedStreetId] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);

  const handleApartmentSelect = async (apartment) => {
    setSelectedApartment(apartment);
    try {
      const updatedClients = await fetchClients();
      const filteredClients = updatedClients.filter(client => client.BindId === apartment.AddressId);
      setSelectedClients(filteredClients);
    } catch (error) {
      console.error("Ошибка при обновлении списка клиентов:", error);
    }
  };

  const refreshClients = async () => {
    try {
      const updatedClients = await fetchClients();
      if (selectedApartment) {
        const updatedSelectedClients = updatedClients.filter(client => client.BindId === selectedApartment.AddressId);
        setSelectedClients(updatedSelectedClients);
      }
    } catch (error) {
      console.error("Ошибка при обновлении списка клиентов:", error);
    }
  };
  
  


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

  return (
    <div>
      <h1>Диспетчерская управляющей компании</h1>
      <StreetList onStreetSelect={handleStreetSelect} />
      {selectedStreetId && <HouseList streetId={selectedStreetId} onHouseSelect={handleHouseSelect} />}
      {selectedHouseId && <ApartmentList houseId={selectedHouseId} onApartmentSelect={handleApartmentSelect} />}
      {selectedApartment && <ApartmentDetail apartment={selectedApartment} clients={selectedClients} refreshClients={refreshClients} />}
    </div>
  );
};

export default App;


