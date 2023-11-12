import { useState, useEffect } from 'react';
import { fetchApartments } from '../api/clientApi';
import PropTypes from 'prop-types';

const ApartmentList = ({ houseId, onApartmentSelect }) => {
  const [apartments, setApartments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
  
    fetchApartments(houseId)
      .then(apartmentData => {
        setApartments(apartmentData);
      })
      .catch(err => {
        setError(err.message);
        console.error('Ошибка при загрузке данных:', err);
      })
      .finally(() => setLoading(false));
  }, [houseId]);

  return (
    <div>
      <h2>Apartments</h2>
        <ul>
          {apartments.map(apartment => (
            <li key={apartment.addressId || apartment.flat} onClick={() => onApartmentSelect(apartment)}>
              Квартира {apartment.flat}
            </li>
          ))}
      </ul>
    </div>
  );
};

ApartmentList.propTypes = {
  houseId: PropTypes.number.isRequired,
  onApartmentSelect: PropTypes.func.isRequired,
};

export default ApartmentList;
