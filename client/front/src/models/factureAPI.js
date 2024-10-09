import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/fa'; // Adjust this as necessary

export const getFactureById = (id) => axios.get(`${API_BASE_URL}/getfacture/${id}`);
export const getAllFactures = () => axios.get(`${API_BASE_URL}/getallfactures`);
export const validateFacture = (refFAC) => axios.post(`${API_BASE_URL}/validatefacture/${refFAC}`);
export const getAllDetailFacturesByFacture = (refFAC) => axios.get(`${API_BASE_URL}/getallitems/${refFAC}`);
export const cancelFacture = (refFAC) => axios.post(`${API_BASE_URL}/cancelFacture/${refFAC}`);