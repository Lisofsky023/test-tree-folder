import { useState, useEffect } from 'react';
import { fetchApartments, fetchClients } from '../api/clientApi';
import PropTypes from 'prop-types';

const ApartmentList = ({ houseId, onApartmentSelect }) => {
  const [apartments, setApartments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
  
    Promise.all([fetchApartments(houseId), fetchClients()])
      .then(([apartmentData, allClients]) => {
        console.log('Apartments data:', apartmentData);
        console.log('Clients data:', allClients);
        setApartments(apartmentData);
        const filteredClients = allClients.filter(client => {
          return apartmentData.some(apartment => {
            return apartment.addressId === client.bindId;
          });
        });
        setClients(filteredClients);
      })
      .catch(err => {
        setError(err);
        console.error('Ошибка при загрузке данных:', err);
      })
      .finally(() => setLoading(false));
  }, [houseId]);


  const handleApartmentClick = (apartment) => {
    onApartmentSelect(apartment);
  };

  return (
    <div>
      <h2>Apartments</h2>
      <ul>
        {apartments.map(apartment => (
          <li key={apartment.addressId || apartment.flat} onClick={() => handleApartmentClick(apartment)}>
            Квартира {apartment.flat}
            <ul>
              {clients.filter(client => client.BindId === apartment.AddressId)
                      .map(client => <li key={client.Id}>Жилец: {client.Name}</li>)}
            </ul>
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
