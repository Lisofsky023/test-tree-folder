import { useState } from 'react';
import apiService from '../api/apiService';
import { useApartmentSelectionContext } from '../context/useApartmentSelection';

const ClientForm = () => {
  const [clientData, setClientData] = useState({
    Name: '',
    Phone: '',
    Email: ''
  });

  const { refreshClients, selectedApartment } = useApartmentSelectionContext();

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApartment) {
      console.error("No selected apartment to add client to");
      return;
    }

    try {
      await apiService.addClient(clientData, selectedApartment.addressId);
      refreshClients();
    } catch (error) {
      console.error("Ошибка при добавлении клиента:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Name"
        value={clientData.Name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="Phone"
        value={clientData.Phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="email"
        name="Email"
        value={clientData.Email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;