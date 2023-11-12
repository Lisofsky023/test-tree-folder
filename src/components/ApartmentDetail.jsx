import PropTypes from 'prop-types';
import ClientForm from './ClientForm';
import { deleteClient } from '../api/clientApi';

const ApartmentDetail = ({ apartment, clients, refreshClients }) => {

  const handleDeleteClient = (bindId) => {
    deleteClient(bindId).then(() => {
      refreshClients();
    });
  };

  return (
    <div>
      <h3>Apartment Details</h3>
      <div>
        <p>Flat: {apartment.flat}</p>
        <p>Building: {apartment.building}</p>
      </div>
      {clients.length > 0 ? (
        <div>
          <h3>Clients:</h3>
          {clients.map(client => (
            <div key={client.id}>
              <p>Name: {client.name}, Phone: {client.phone}, Email: {client.email}</p>
              <button onClick={() => handleDeleteClient(client.bindId)}>Delete Client</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No clients in this apartment.</p>
      )}
      <ClientForm onClientAdded={refreshClients} apartmentId={apartment.addressId} />
    </div>
  );
};

ApartmentDetail.propTypes = {
  apartment: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  refreshClients: PropTypes.func.isRequired
};

export default ApartmentDetail;
