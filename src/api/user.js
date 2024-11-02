import instance from "./index";

export const getUserInfo = async () => {
  const response = await instance.get("/owners/profile");
  return response.data;
};

export const getUserPetsWithDetails = async () => {
  const response = await instance.get("/petdetails/");
  return response.data;
};
