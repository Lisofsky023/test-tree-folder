import { useState, useEffect } from 'react';
import apiService from "../api/apiService";
import { useApartmentSelectionContext } from '../hook/useApartmentSelection';

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);
  const { selectedStreetId, handleHouseSelect } = useApartmentSelectionContext();

  useEffect(() => {
    setHouses([]);
    setError(null);
    if (selectedStreetId) {
      apiService.fetchHouses(selectedStreetId)
        .then(setHouses)
        .catch(e => setError(e.message));
    }
  }, [selectedStreetId]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!selectedStreetId) {
    return <p>Пожалуйста, выберите улицу, чтобы увидеть список домов.</p>;
  }

  return (
    <div>
      <h3>Список домов на улице:</h3>
      <ul>
        {houses.map(house => (
          <li key={house.id} onClick={() => handleHouseSelect(house.id)}>
            {house.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseList;
