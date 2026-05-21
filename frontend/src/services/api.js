import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('bloodlink_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerDonor = (data) => API.post('/auth/register-donor', data);
export const loginDonor = (data) => API.post('/auth/login-donor', data);
export const registerRecipient = (data) => API.post('/auth/register-recipient', data);
export const loginRecipient = (data) => API.post('/auth/login-recipient', data);

export const getDonors = () => API.get('/donors');
export const getDonorById = (id) => API.get(`/donors/${id}`);
export const updateDonor = (id, data) => API.put(`/donors/${id}`, data);
export const searchDonors = (params) => API.get('/donors/search', { params });

export const createRequest = (data) => API.post('/requests', data);
export const getRequests = () => API.get('/requests');
export const getRequestById = (id) => API.get(`/requests/${id}`);
