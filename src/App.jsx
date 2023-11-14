import StreetList from './components/StreetList';
import HouseList from './components/HouseList';
import ApartmentList from './components/ApartmentList';
import ApartmentDetail from './components/ApartmentDetail';
import { ApartmentSelectionProvider } from './context/ApartmentSelectionProvider';

const App = () => {

  return (
    <ApartmentSelectionProvider>
      <div>
        <h1>Диспетчерская управляющей компании</h1>
        <StreetList />
        <HouseList />
        <ApartmentList />
        <ApartmentDetail />
      </div>
    </ApartmentSelectionProvider>
  );
};

export default App;


