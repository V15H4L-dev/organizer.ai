import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

// Create an Axios instance with a base configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API's base URL
  timeout: 60000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = Cookies.get("token"); // Replace "token" with the name of your cookie

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors, e.g., show an error message or log out the user
    if (error.response?.status === 401) {
      // Handle unauthorized errors (optional)
      console.error("Unauthorized! Redirecting to login...");
      // Redirect to login or clear stored token if needed
    }
    return Promise.reject(error);
  },
);

export default api;
