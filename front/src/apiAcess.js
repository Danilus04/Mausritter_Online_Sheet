import axios from "axios";

const port = 8000;

const api = axios.create({
  baseURL: `http://localhost:${port}/app/`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
