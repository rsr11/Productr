import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_BASE_URL_PRODUCTION);


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_PRODUCTION
});

export default api;