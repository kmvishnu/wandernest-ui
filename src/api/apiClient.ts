import axios from "axios";
import { API_URL } from "../../config";
import { logout } from "@/store/slices/authSlice";
import { store } from "@/store/store";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers['Skip-Auth']) {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      delete config.headers['Skip-Auth']; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout()); 
    }
    return Promise.reject(error);
  }
);

export default apiClient;