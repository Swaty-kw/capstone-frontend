import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const storeToken = async (token) => {
  console.log("storeToken", token);
  return await setItemAsync("token", token);
};

const getToken = async () => {
  const token = await getItemAsync("token");
  console.log("getToken", token);
  return token;
};

const logout = () => {
  localStorage.removeItem("token");
};

const deleteToken = async () => {
  await deleteItemAsync("token");
};

export { storeToken, getToken, deleteToken, logout };
