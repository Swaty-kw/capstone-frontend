import instance from ".";
import { storeToken } from "./storage";

const register = async (userData) => {
  try {
    const { data } = await instance.post("owners/signup", userData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (credentials) => {
  try {
    const { data } = await instance.post("/owners/signin", credentials);
    storeToken(data.token);
    return data;
  } catch (error) {
    console.error("Error signing in:", error.response?.data || error.message);
    throw error;
  }
};

export { register, login };
