import React, { useState, useEffect } from 'react';
import { getAllClients, addClient } from './ClientService'; // Correct path for ClientService.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function ClientComponent() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    nom: '',
    age: '',
  });

  useEffect(() => {
    getAllClients()
      .then((response) => setClients(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addClient(newClient)
      .then(() => {
        setClients([...clients, newClient]);
        setNewClient({ nom: '', age: '' });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Client Management</h2>

      {/* Form to add a new client */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            className="form-control"
            placeholder="Enter Nom"
            value={newClient.nom}
            onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
            style={{ borderColor: '#007bff' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="form-control"
            placeholder="Enter Age"
            value={newClient.age}
            onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
            style={{ borderColor: '#007bff' }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
        >
          Add Client
        </button>
      </form>

      {/* Table displaying all clients */}
      <h3 className="mt-5">Client List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <th scope="row">{index + 1}</th>
              <td>{client.nom}</td>
              <td>{client.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientComponent;
