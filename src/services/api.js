import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data === null) {
      console.warn('API returned null');
      return [];
    }
    return response;
  },
  (error) => {
    console.error('API request failed:', error);
    throw error;
  }
);


export default apiClient;