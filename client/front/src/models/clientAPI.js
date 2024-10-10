import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/client'; // Adjust this as necessary

export const createClient = (clientData) => axios.post(`${API_BASE_URL}/createclient`, clientData);

export const getClientById = (id) => axios.get(`${API_BASE_URL}/getclient/${id}`);

export const updateClient = (id, clientData) => axios.put(`${API_BASE_URL}/updateclients/${id}`, clientData);

export const deleteClient = (id) => axios.delete(`${API_BASE_URL}/deleteclient/${id}`);

export const getAllClients = () => axios.get(`${API_BASE_URL}/getallclients`);

export const bulkUploadClients = (formData) => axios.post(`${API_BASE_URL}/bulk-upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
