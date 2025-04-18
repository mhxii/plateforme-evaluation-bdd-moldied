import API from './api';
export const fetchNotifications = userId => API.get(`/utilisateurs/${userId}/notifications`);
export const markNotificationRead = id => API.put(`/notifications/${id}/read`);