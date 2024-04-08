import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/bl'; // Adjust this as necessary

export const createBonliv = (bonlivData) => axios.post(`${API_BASE_URL}/createbonliv`, bonlivData);

export const validateBonliv = (refBonliv) => axios.post(`${API_BASE_URL}/validate/${refBonliv}`);

export const getBonlivById = (id) => axios.get(`${API_BASE_URL}/bonliv/${id}`);

export const updateBonliv = (id, bonlivData) => axios.put(`${API_BASE_URL}/updatebonliv/${id}`, bonlivData);

export const deleteBonliv = (id) => axios.delete(`${API_BASE_URL}/deletebonliv/${id}`);

export const getAllBonliv = () => axios.get(`${API_BASE_URL}/getallbonliv`);

export const getBonlivByClient = (clientId) => axios.get(`${API_BASE_URL}/getbonliv/client/${clientId}`);

export const getBonlivByCommercial = (commercialId) => axios.get(`${API_BASE_URL}/getbonliv/commercial/${commercialId}`);

export const addItemToBonliv = (refBonliv, itemData) => axios.post(`${API_BASE_URL}/additem/${refBonliv}`, itemData);

export const deleteItemFromBonliv = (refBonliv, codeArt) => axios.delete(`${API_BASE_URL}/deleteitem/${refBonliv}/${codeArt}`);

export const updateItemInBonliv = (refBonliv, codeArt, itemData) => axios.put(`${API_BASE_URL}/modifyitem/${refBonliv}/${codeArt}`, itemData);

export const getItemsInBonliv = (refBonliv) => axios.get(`${API_BASE_URL}/getallitems/${refBonliv}`);
