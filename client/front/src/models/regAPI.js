import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/reglement'; // Adjust the base URL based on your actual backend URL

export const createReglement = (reglementData) => axios.post(`${API_BASE_URL}/create`, reglementData);
export const getReglementById = (id) => axios.get(`${API_BASE_URL}/get/${id}`);
export const updateReglement = (id, reglementData) => axios.put(`${API_BASE_URL}/update/${id}`, reglementData);
export const deleteReglement = (id) => axios.delete(`${API_BASE_URL}/delete/${id}`);
export const getAllReglements = () => axios.get(`${API_BASE_URL}/all`);
export const createReglementDetailsBatch = (regDetailsArray) => axios.post(`${API_BASE_URL}/createBatchDetails`, regDetailsArray);
export const getAllUnifiedFactureAvoir = (code_clt) => axios.get(`${API_BASE_URL}/getAllUnified/${code_clt}`);
export const addDetailReglement = (regDetailData) => axios.post(`${API_BASE_URL}/addDetail`, regDetailData);


export const deleteReglementDetail = (refRegV, refAvFac) => {
    return axios.delete(`${API_BASE_URL}/deletedetail/${refRegV}/${refAvFac}`);
  };