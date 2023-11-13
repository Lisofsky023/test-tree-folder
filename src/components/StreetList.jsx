import { useState, useEffect } from 'react';
import apiService from '../api/apiService';
import PropTypes from 'prop-types';

const StreetList = ({ onStreetSelect }) => {
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
        <li key={street.id} onClick={() => onStreetSelect(street.id)}>
          {street.nameWithPrefix}
        </li>
      ))}
    </ul>
  );  
};

StreetList.propTypes = {
  onStreetSelect: PropTypes.func.isRequired,
};

export default StreetList;
