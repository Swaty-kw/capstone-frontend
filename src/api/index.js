import axios from "axios";
import { getToken } from "./storage";

const BASE_URL = "http://172.20.10.3:5000";
const instance = axios.create({
  baseURL: "http://172.20.10.3:5000/api/",
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
