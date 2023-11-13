import { useState, useEffect } from 'react';
import apiService from "../api/apiService";
import PropTypes from 'prop-types';

const HouseList = ({ streetId, onHouseSelect }) => {
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setHouses([]);
    setError(null);
    if (streetId) {
      apiService.fetchHouses(streetId)
        .then(setHouses)
        .catch(e => setError(e.message));
    }
  }, [streetId]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!streetId) {
    return <p>Пожалуйста, выберите улицу, чтобы увидеть список домов.</p>;
  }

  return (
    <div>
      <h3>Список домов на улице:</h3>
      <ul>
        {houses.map(house => (
          <li key={house.id} onClick={() => onHouseSelect(house.id)}>
            {house.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

HouseList.propTypes = {
  streetId: PropTypes.number.isRequired,
  onHouseSelect: PropTypes.func.isRequired,
};

export default HouseList;
