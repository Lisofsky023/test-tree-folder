import { useState, useEffect } from 'react';

import apiService from '../api/apiService';
import { useApartmentSelectionContext } from '../hook/useApartmentSelection';

const StreetList = () => {
  const { handleStreetSelect } = useApartmentSelectionContext();
  const [streets, setStreets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStreets = async () => {
      try {
        const data = await apiService.fetchStreets();
        setStreets(data);
      } catch (error) {
        setError(error.message);
        setStreets([]);
      }
    };
  
    getStreets();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <ul>
      {streets.map((street) => (
        <li key={street.id} onClick={() => handleStreetSelect(street.id)}>
          {street.nameWithPrefix}
        </li>
      ))}
    </ul>
  );  
};

export default StreetList;
