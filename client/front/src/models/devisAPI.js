import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/devis'; // Adjust this as necessary

export const createDevis = (devisData) => axios.post(`${API_BASE_URL}/createdevis`, devisData);

export const validateDevis = (refDevis) => axios.post(`${API_BASE_URL}/validate/${refDevis}`);

export const getDevisById = (id) => axios.get(`${API_BASE_URL}/devis/${id}`);

export const updateDevis = (id, devisData) => axios.put(`${API_BASE_URL}/updatedevis/${id}`, devisData);

export const deleteDevis = (id) => axios.delete(`${API_BASE_URL}/deletedevis/${id}`);

export const getAllDevis = () => axios.get(`${API_BASE_URL}/getalldevis`);

export const getDevisByClient = (clientId) => axios.get(`${API_BASE_URL}/getdevis/client/${clientId}`);

export const getDevisByCommercial = (commercialId) => axios.get(`${API_BASE_URL}/getdevis/commercial/${commercialId}`);

export const addItemToDevis = (refDevis, itemData) => axios.post(`${API_BASE_URL}/additem/${refDevis}`, itemData);

export const deleteItemFromDevis = (refDevis, codeArt) => axios.delete(`${API_BASE_URL}/deleteitem/${refDevis}/${codeArt}`);

export const updateItemInDevis = (refDevis, codeArt, itemData) => axios.put(`${API_BASE_URL}/modifyitem/${refDevis}/${codeArt}`, itemData);

export const getItemsInDevis = (refDevis) => axios.get(`${API_BASE_URL}/getallitems/${refDevis}`);
