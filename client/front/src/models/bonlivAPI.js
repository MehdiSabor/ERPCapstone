import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500/bl'; // Adjust this as necessary

export const createBonliv = (bonlivData) => axios.post(`${API_BASE_URL}/createbl`, bonlivData);

export const validateBonliv = (refBonliv) => axios.post(`${API_BASE_URL}/validatebl/${refBonliv}`);

export const getBonlivById = (id) => axios.get(`${API_BASE_URL}/getbl/${id}`);

export const updateBonliv = (id, bonlivData) => axios.put(`${API_BASE_URL}/updatebl/${id}`, bonlivData);

export const deleteBonliv = (id) => axios.delete(`${API_BASE_URL}/deletebl/${id}`);

export const getAllBonliv = () => axios.get(`${API_BASE_URL}/getallbl`);

export const getBonlivByClient = (clientId) => axios.get(`${API_BASE_URL}/getbonliv/client/${clientId}`);

export const getBonlivByCommercial = (commercialId) => axios.get(`${API_BASE_URL}/getbonliv/commercial/${commercialId}`);

export const addItemToBonliv = (refBonliv, itemData) => axios.post(`${API_BASE_URL}/additem/${refBonliv}`, itemData);

export const deleteItemFromBonliv = (refBonliv, codeArt) => axios.delete(`${API_BASE_URL}/deleteitem/${refBonliv}/${codeArt}`);

export const updateItemInBonliv = (refBonliv, codeArt, itemData) => axios.put(`${API_BASE_URL}/updateitem/${refBonliv}/${codeArt}`, itemData);

export const getItemsInBonliv = (refBonliv) => axios.get(`${API_BASE_URL}/getallitems/${refBonliv}`);

export const bulkUpdateItemsInBonliv = (updates) => {
    return axios.post(`${API_BASE_URL}/bulkupdateitems`, updates);
  };