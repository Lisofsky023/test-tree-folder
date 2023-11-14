import StreetList from './components/StreetList';
import HouseList from './components/HouseList';
import ApartmentList from './components/ApartmentList';
import { ApartmentSelectionProvider } from './context/ApartmentSelectionProvider';

const App = () => {

  return (
    <ApartmentSelectionProvider>
      <div>
        <h1>Диспетчерская управляющей компании</h1>
        <StreetList />
        <HouseList />
        <ApartmentList />
      </div>
    </ApartmentSelectionProvider>
  );
};

export default App;


