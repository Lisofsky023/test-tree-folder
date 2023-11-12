import { useState } from 'react';
import { addClient } from '../api/clientApi';
import PropTypes from 'prop-types';

const ClientForm = ({ onClientAdded, apartmentId }) => {
  const [clientData, setClientData] = useState({
    Name: '',
    Phone: '',
    Email: ''
  });

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientId = await addClient(clientData, apartmentId);
      if (clientId) {
        onClientAdded(); // Обновляем список клиентов
      }
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

ClientForm.propTypes = {
  onClientAdded: PropTypes.func.isRequired,
  apartmentId: PropTypes.number.isRequired
};

export default ClientForm;

