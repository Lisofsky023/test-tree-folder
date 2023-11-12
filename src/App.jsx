import { useState, useEffect } from 'react';
import StreetList from './components/StreetList';
import HouseList from './components/HouseList';
import ApartmentList from './components/ApartmentList';
import ApartmentDetail from './components/ApartmentDetail';
import { fetchClients } from './api/clientApi';

const App = () => {
  const [selectedStreetId, setSelectedStreetId] = useState(null);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [allClients, setAllClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);

  useEffect(() => {
    fetchClients().then(data => setAllClients(data));
  }, []);

  const handleApartmentSelect = (apartment) => {
    setSelectedApartment(apartment);
    const filteredClients = allClients.filter(client => client.BindId === apartment.AddressId);
    setSelectedClients(filteredClients);
  };

  const refreshClients = () => {
    fetchClients().then(data => {
      setAllClients(data);
      if (selectedApartment) {
        const updatedSelectedClients = data.filter(client => client.BindId === selectedApartment.AddressId);
        setSelectedClients(updatedSelectedClients);
      }
    });
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


