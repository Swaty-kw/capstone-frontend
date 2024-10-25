import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"


const storeToken = async (token) =>{
    const token = await setItemAsync("token", token);
    return token;
}

const getToken = async() =>{
    const token = await getItemAsync("token");
    return token;
}

const deleteToken = async ()=>{
    const token = await deleteItemAsync("token");
    return token;
}

export {storeToken, getToken, deleteToken};