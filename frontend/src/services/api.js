import axios from 'axios';
import { getToken } from './'
 
const api = axios.create({
  baseURL: "http://localhost:5000/",
});
 
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
export default api;
 
export const get = (url, data = {}, config = {}) => api.get(url, {...config, params:data });
export const post = (url, data = {}, config = {}) => api.post(url, data, config);
export const patch = (url, data = {}, config = {}) => api.patch(url, data, config);
export const remove = (url, config = {}) => api.delete(url, config);