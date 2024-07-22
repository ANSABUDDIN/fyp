import axios from "axios";
import { baseApiUrl } from "@/config/app.config";
import { getAuthToken } from "@/lib/utils";
import toast from "react-hot-toast";

// Create an Axios instance with base URL and default headers
const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include authentication token in headers
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common response behaviors and errors
api.interceptors.response.use(
  (response) => {
    // You can perform any common response handling here
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("Error:", error);
    const errorMessage =
      error?.response?.data?.message || "Something went wrong";
    showToast(errorMessage);
    return Promise.reject(error);
  }
);

// Function to display toast messages
function showToast(message: string) {
  toast.error(message);
}

export default api;
