import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/article'; // Adjust this as necessary

export const createArticle = (articleData) => axios.post(`${API_BASE_URL}/createarticle`, articleData);

export const getArticleById = (id) => axios.get(`${API_BASE_URL}/getarticle/${id}`);

export const updateArticle = (id, articleData) => axios.put(`${API_BASE_URL}/updatearticle/${id}`, articleData);

export const deleteArticle = (id) => axios.delete(`${API_BASE_URL}/deletearticle/${id}`);

export const getAllArticles = () => axios.get(`${API_BASE_URL}/getallarticles`);
