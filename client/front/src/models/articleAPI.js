import axios from 'axios';
import store from '../store';  // Ensure the store is properly imported

const API_BASE_URL = 'http://localhost:5500/article';

// Set up request interceptor to attach token
axios.interceptors.request.use(config => {
    const state = store.getState();  // Get current state from Redux store
    const token = state.token;       // Access the token from the state
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;  
    }
    return config;
}, error => {
    return Promise.reject(error);
});




// Set up response interceptor to handle authentication errors
axios.interceptors.response.use(response => response, error => {
    
    // Check for authentication error
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Handle logout
        console.log('Authentication failed, logging out...');
        store.dispatch({ type: 'LOGOUT' }); 
    }
    return Promise.reject(error);
});

export const createArticle = (articleData) => axios.post(`${API_BASE_URL}/createarticle`, articleData);
export const getArticleById = (id) => axios.get(`${API_BASE_URL}/getarticle/${id}`);
export const updateArticle = (id, articleData) => axios.put(`${API_BASE_URL}/updatearticle/${id}`, articleData);
export const deleteArticle = (id) => axios.delete(`${API_BASE_URL}/deletearticle/${id}`);
export const getAllArticles = () => axios.get(`${API_BASE_URL}/getallarticles`);
export const bulkUploadArticles = (formData) => axios.post(`${API_BASE_URL}/bulk-upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
