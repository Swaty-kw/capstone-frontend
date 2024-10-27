import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const storeToken = async (token) => {
  return await setItemAsync("token", token);
};

const getToken = async () => {
  const token = await getItemAsync("token");
  return token;
};

const logout = () => {
  localStorage.removeItem("token");
};

const deleteToken = async () => {
  const token = await deleteItemAsync("token");
  return token;
};

export { storeToken, getToken, deleteToken, logout };
