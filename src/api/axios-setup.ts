import axios from 'axios';

import { LocalStorageItem } from '../common/constants';
import { refreshAccessToken } from './auth';

const BASE_URL = import.meta.env.VITE_APP_BASE_API_URL;
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const handleFailedRefresh = () => {
  localStorage.removeItem(LocalStorageItem.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageItem.REFRESH_TOKEN);
  window.dispatchEvent(new Event('storage'));
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (req) => {
    req.headers.Authorization = `Bearer ${window.localStorage.getItem(LocalStorageItem.ACCESS_TOKEN)}`;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      handleFailedRefresh();
      return Promise.reject('Access denied');
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance.request(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshAccessToken(BASE_URL);
        if (data) {
          const { accessToken, refreshToken } = data;
          window.localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, accessToken);
          window.localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, refreshToken);

          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance.request(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        handleFailedRefresh();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error?.response?.data || error);
  }
);

export default axiosInstance;
