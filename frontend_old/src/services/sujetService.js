import API from './api';
export const fetchSujets = () => API.get('/sujets');
export const fetchSujet = id => API.get(`/sujets/${id}`);
export const createSujet = data => API.post('/sujets', data);
export const updateSujet = (id, data) => API.put(`/sujets/${id}`, data);
export const deleteSujet = id => API.delete(`/sujets/${id}`);