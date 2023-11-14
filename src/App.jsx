import StreetList from './components/StreetList';
import HouseList from './components/HouseList';
import ApartmentList from './components/ApartmentList';
import ApartmentDetail from './components/ApartmentDetail';
import useApartmentSelection from './hook/useApartmentSelection';

const App = () => {
  const {
    selectedStreetId,
    handleStreetSelect,
    selectedHouseId,
    handleHouseSelect,
    selectedApartment,
    handleApartmentSelect,
    selectedClients,
    refreshClients,
  } = useApartmentSelection();

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


