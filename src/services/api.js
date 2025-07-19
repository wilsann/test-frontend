import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getItems = async (params = {}) => {
  const { page = 1, limit = 10, search = '' } = params;
  return api.get('/items', {
    params: {
      page,
      limit,
      search
    }
  });
}
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (item) => api.post('/items', item);
export const updateItem = (id, item) => api.put(`/items/${id}`, item);
export const deleteItem = (id) => api.delete(`/items/${id}`);

export default api;