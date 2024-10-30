import axios from "axios";
import { getToken } from "./storage";

const BASE_URL = "http://192.168.2.162:5000";
const instance = axios.create({
  baseURL: "http://192.168.2.98:5000/api/",
  // baseURL: "http://localhost:5000/api/",
  baseURL: `${BASE_URL}/api`,
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { BASE_URL };
export default instance;
