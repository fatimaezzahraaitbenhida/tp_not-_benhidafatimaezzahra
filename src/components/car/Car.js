import React, { useState, useEffect } from 'react';
import { getAllCars, addCar } from './CarService';
import { getAllClients } from '../client/ClientService';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarComponent() {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    matricule: '',
    clientId: '',
  });

  useEffect(() => {
    getAllCars()
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => console.error('Error fetching cars:', error));

    getAllClients()
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const carToAdd = {
      brand: newCar.brand,
      model: newCar.model,
      matricule: newCar.matricule,
      client_id: newCar.clientId,
    };

    addCar(carToAdd)
      .then(() => {
        setCars([...cars, carToAdd]);
        setNewCar({ brand: '', model: '', matricule: '', clientId: '' });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Car Management</h2>

      {/* Form to add a new car */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            className="form-control"
            placeholder="Enter Brand"
            value={newCar.brand}
            onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
            style={{ borderColor: '#007bff' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            Model
          </label>
          <input
            type="text"
            id="model"
            className="form-control"
            placeholder="Enter Model"
            value={newCar.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            style={{ borderColor: '#007bff' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="matricule" className="form-label">
            Matricule
          </label>
          <input
            type="text"
            id="matricule"
            className="form-control"
            placeholder="Enter Matricule"
            value={newCar.matricule}
            onChange={(e) => setNewCar({ ...newCar, matricule: e.target.value })}
            style={{ borderColor: '#007bff' }}
          />
        </div>

        {/* Dropdown to select car owner */}
        <div className="mb-3">
          <label htmlFor="clientId" className="form-label">
            Client (Owner)
          </label>
          <select
            id="clientId"
            className="form-select"
            value={newCar.clientId}
            onChange={(e) => setNewCar({ ...newCar, clientId: e.target.value })}
            style={{ borderColor: '#007bff' }}
          >
            <option value="">Select Owner</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
        >
          Add Car
        </button>
      </form>

      {/* Table displaying all cars */}
      <h3 className="mt-5">Car List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Matricule</th>
            <th scope="col">Owner</th>
            <th scope="col">Owner Age</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <th scope="row">{index + 1}</th>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.matricule}</td>
              <td>{car.client ? car.client.nom : 'No Owner'}</td>
              <td>{car.client ? car.client.age : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarComponent;
