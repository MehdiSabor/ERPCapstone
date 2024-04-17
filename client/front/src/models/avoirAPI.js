import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/av'; // Adjust this as necessary

export const createAvoir = (avoirData) => axios.post(`${API_BASE_URL}/createavoir`, avoirData);

export const validateAvoir = (refAvoir) => axios.post(`${API_BASE_URL}/validate/${refAvoir}`);

export const getAvoirById = (id) => axios.get(`${API_BASE_URL}/avoir/${id}`);

export const updateAvoir = (id, avoirData) => axios.put(`${API_BASE_URL}/updateavoir/${id}`, avoirData);

export const deleteAvoir = (id) => axios.delete(`${API_BASE_URL}/deleteavoir/${id}`);

export const getAllAvoir = () => axios.get(`${API_BASE_URL}/getallavoir`);

export const getAvoirByClient = (clientId) => axios.get(`${API_BASE_URL}/getavoir/client/${clientId}`);

export const getAvoirByCommercial = (commercialId) => axios.get(`${API_BASE_URL}/getavoir/commercial/${commercialId}`);

export const addItemToAvoir = (refAvoir, itemData) => axios.post(`${API_BASE_URL}/additem/${refAvoir}`, itemData);

export const deleteItemFromAvoir = (refAvoir, codeArt) => axios.delete(`${API_BASE_URL}/deleteitem/${refAvoir}/${codeArt}`);

export const updateItemInAvoir = (refAvoir, codeArt, itemData) => axios.put(`${API_BASE_URL}/modifyitem/${refAvoir}/${codeArt}`, itemData);

export const getItemsInAvoir = (refAvoir) => axios.get(`${API_BASE_URL}/getallitems/${refAvoir}`);
