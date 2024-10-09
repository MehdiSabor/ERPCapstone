// src/api/userService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/account'; // Adjust the base URL as needed

export const createUser = (data) => axios.post(`${API_BASE_URL}/register`, data);
export const getUserById = (id) => axios.get(`${API_BASE_URL}/get/${id}`);
export const getAllUsers = () => axios.get(`${API_BASE_URL}/getall`);
export const updateUser = (id, data) => axios.put(`${API_BASE_URL}/modify/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/delete/${id}`);
