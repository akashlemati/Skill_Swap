import axios from "axios";

// Configure Axios instance for future Java Spring Boot backend (running on port 8080)
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token when backend is connected
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("skillswap_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized session expiration
      console.warn(
        "Unauthorized access. Redirecting or refreshing token may be required.",
      );
    }
    return Promise.reject(error);
  },
);

export default api;
