//axiosConfig
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // URL base de tu servidor Express
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
