import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
    baseURL: "http://127.0.0.1:5000/api/"
})

instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default instance