import axios from "axios";

// Auto detect environment
export const ENV = 'production';

const baseUrls = {
  local: "http://localhost:4000", // Proxy handles it
  production: "https://forbin.duckdns.org/", // Use real server API
};

export const baseUrl = baseUrls[ENV];

// Create axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default api;
