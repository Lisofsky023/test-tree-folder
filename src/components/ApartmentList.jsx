import { useState, useEffect } from 'react';
import apiService from '../api/apiService';

import { useApartmentSelectionContext } from '../hook/useApartmentSelection';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const { selectedHouseId, handleApartmentSelect } = useApartmentSelectionContext();

  useEffect(() => {
    if (selectedHouseId) {
      apiService.fetchApartments(selectedHouseId)
        .then(apartmentData => {
          setApartments(apartmentData);
        })
        .catch(err => {
          console.error('Ошибка при загрузке данных:', err.message);
        });
    }
  }, [selectedHouseId]);

  return (
    <div>
      <h2>Apartments</h2>
        <ul>
          {apartments.map(apartment => (
            <li key={apartment.addressId || apartment.flat} onClick={() => handleApartmentSelect(apartment)}>
              Квартира {apartment.flat}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ApartmentList;
