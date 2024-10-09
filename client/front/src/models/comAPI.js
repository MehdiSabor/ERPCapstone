import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/com'; // Adjust this as necessary

export const createCom = (comData) => axios.post(`${API_BASE_URL}/createcom`, comData);

export const getComById = (id) => axios.get(`${API_BASE_URL}/getcom/${id}`);

export const updateCom = (id, comData) => axios.put(`${API_BASE_URL}/updatecom/${id}`, comData);

export const deleteCom = (id) => axios.delete(`${API_BASE_URL}/deletecom/${id}`);

export const getAllComs = () => axios.get(`${API_BASE_URL}/getallcoms`);
