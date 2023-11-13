import { useState, useEffect } from 'react';
import apiService from '../api/apiService';
import PropTypes from 'prop-types';

const ApartmentList = ({ houseId, onApartmentSelect }) => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    apiService.fetchApartments(houseId)
      .then(apartmentData => {
        setApartments(apartmentData);
      })
      .catch(err => {
        console.error('Ошибка при загрузке данных:', err.message);
      });
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
