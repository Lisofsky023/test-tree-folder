import ClientForm from './ClientForm';
import apiService from '../api/apiService';
import { useApartmentSelectionContext } from '../hook/useApartmentSelection';

const ApartmentDetail = () => {
  const { selectedApartment, selectedClients, refreshClients } = useApartmentSelectionContext();

  if (!selectedApartment) {
    return <p>No apartment selected.</p>;
  }
  
  if (!Array.isArray(selectedClients)) {
    console.error("Invalid 'clients' data. Expected an array, received:", typeof selectedClients);
    return <p>Ошибка загрузки данных о клиентах.</p>;
  }

  const handleDeleteClient = (bindId) => {
    apiService.deleteClient(bindId).then(() => {
      refreshClients();
    });
  };

  return (
    <div>
      <h3>Apartment Details</h3>
      <div>
        <p>Flat: {selectedApartment.flat}</p>
        <p>Building: {selectedApartment.building}</p>
      </div>
      {selectedClients.length > 0 ? (
        <div>
          <h3>Clients:</h3>
          {selectedClients.map(client => (
            <div key={client.id}>
              <p>Name: {client.name}, Phone: {client.phone}, Email: {client.email}</p>
              <button onClick={() => handleDeleteClient(client.bindId)}>Delete Client</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No clients in this apartment.</p>
      )}
      <ClientForm onClientAdded={refreshClients} apartmentId={selectedApartment.addressId} />
    </div>
  );
};

export default ApartmentDetail;
