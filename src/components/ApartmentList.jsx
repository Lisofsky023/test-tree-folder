import React from 'react';
import { useState, useEffect } from 'react';
import apiService from '../api/apiService';
import ApartmentDetail from './ApartmentDetail';

import { useApartmentSelectionContext } from '../context/useApartmentSelection';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const { selectedHouseId, handleApartmentSelect, selectedApartment } = useApartmentSelectionContext();

useEffect(() => {
  if (selectedHouseId) {
    apiService.fetchApartments(selectedHouseId)
      .then(setApartments)
      .catch(err => console.error('Ошибка при загрузке данных:', err.message));
  }
}, [selectedHouseId]);

return (
  <div>
    <h2>Apartments</h2>
    <ul>
      {apartments.map(apartment => (
        <React.Fragment key={apartment.addressId || apartment.flat}>
          <li onClick={() => handleApartmentSelect(apartment)}>
            Квартира {apartment.flat}
          </li>
          {selectedApartment && selectedApartment.addressId === apartment.addressId && (
            <ApartmentDetail />
          )}
        </React.Fragment>
      ))}
    </ul>
  </div>
);
};

export default ApartmentList;
