import axios from 'axios';

// Create custom Axios instance with base URL and timeout configurations.
// Uses proxy configured in vite.config.js for development, falls back to port 5000 directly.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const classifyImage = async (uploadData) => {
  const formData = new FormData();
  formData.append('image', uploadData.file);
  if (uploadData.gender) formData.append('gender', uploadData.gender);
  if (uploadData.itemType) formData.append('item_type', uploadData.itemType);
  
  const response = await api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getRecommendation = async (quizAnswers) => {
  const response = await api.post('/recommend-style', quizAnswers);
  return response.data;
};

export const fetchTrendingData = async () => {
  const response = await api.get('/trending');
  return response.data;
};

export const checkApiHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
