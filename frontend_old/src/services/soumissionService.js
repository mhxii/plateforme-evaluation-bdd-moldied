import API from './api';
export const fetchSoumissions = () => API.get('/soumissions');
export const fetchSoumission = id => API.get(`/soumissions/${id}`);
export const createSoumission = data => API.post('/soumissions', data);
export const updateSoumission = (id, data) => API.put(`/soumissions/${id}`, data);
export const deleteSoumission = id => API.delete(`/soumissions/${id}`);
export const corrigerSoumission = id => API.post(`/soumissions/${id}/corriger`);