import PropTypes from 'prop-types';
import ClientForm from './ClientForm';
import { deleteClient } from '../api/clientApi';
import { useState, useEffect } from 'react';

const getTenantsForApartment = (apartmentId) => {
  const allTenants = JSON.parse(localStorage.getItem('tenants') || '[]');
  return allTenants.filter(tenant => tenant.BindId === apartmentId);
};


const ApartmentDetail = ({ apartment, refreshClients }) => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    setTenants(getTenantsForApartment(apartment.addressId));
  }, [apartment.addressId]);

  const handleDeleteClient = (bindId) => {
    deleteClient(bindId).then(() => {
      refreshClients();
    });
  };
  console.log("Apartment data:", apartment);

  return (
    <div>
      <h3>Apartment Details</h3>
      <div>
        <p>Flat: {apartment.flat}</p>
        <p>Building: {apartment.building}</p>
      </div>
      {tenants.length > 0 ? (
        <div>
          <h3>Tenants:</h3>
          {tenants.map(tenant => (
            <div key={tenant.id}>
              <p>Name: {tenant.Name}, Phone: {tenant.Phone}, Email: {tenant.Email}</p>
              <button onClick={() => handleDeleteClient(tenant.id)}>Delete Tenant</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No tenants in this apartment.</p>
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
