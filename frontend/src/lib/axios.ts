import axios from "axios";

// Create an Axios instance with the backend API base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
