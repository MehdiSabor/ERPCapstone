import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/four'; // Adjust this as necessary

export const createFour = (fourData) => axios.post(`${API_BASE_URL}/createfour`, fourData);

export const getFourById = (id) => axios.get(`${API_BASE_URL}/getfour/${id}`);

export const updateFour = (id, fourData) => axios.put(`${API_BASE_URL}/updatefour/${id}`, fourData);

export const deleteFour = (id) => axios.delete(`${API_BASE_URL}/deletefour/${id}`);

export const getAllFours = () => axios.get(`${API_BASE_URL}/getallfour`);
