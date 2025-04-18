// src/services/soumissionService.js
import API from './api';

export const fetchSoumissions = () =>
  API.get('/soumissions');

export const fetchSoumission = id =>
  API.get(`/soumissions/${id}`);

export const createSoumission = formData =>
  API.post('/soumissions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const updateSoumission = (id, data) =>
  API.put(`/soumissions/${id}`, data);

export const deleteSoumission = id =>
  API.delete(`/soumissions/${id}`);

export const corrigerSoumission = id =>
  API.post(`/soumissions/${id}/corriger`);

export const fetchSubmissionStats = () =>
  API.get('/soumissions/stats').then(res => res.data);
