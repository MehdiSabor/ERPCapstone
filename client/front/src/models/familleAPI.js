import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/fam'; // Adjust the base URL as needed

export const createFamille = (data) => axios.post(`${API_BASE_URL}/create`, data);
export const getFamilleById = (id) => axios.get(`${API_BASE_URL}/get/${id}`);
export const getAllFamilles = () => axios.get(`${API_BASE_URL}/getall`);
export const updateFamille = (id, data) => axios.put(`${API_BASE_URL}/modify/${id}`, data);
export const deleteFamille = (id) => axios.delete(`${API_BASE_URL}/delete/${id}`);
