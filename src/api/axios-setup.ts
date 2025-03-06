import axios from 'axios';
import { LocalStorageItem } from '../common/constants';

const BASE_URL = import.meta.env.VITE_APP_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (req) => {
    req.headers.Authorization = `Bearer ${window.localStorage.getItem(
      LocalStorageItem.ACCESS_TOKEN
    )}`;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // const { access } = await refreshAccessToken();
    const access = 'qwe'
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
    return axiosInstance(originalRequest);
  }
  return Promise.reject(error?.response?.data || error);
});

export default axiosInstance;
