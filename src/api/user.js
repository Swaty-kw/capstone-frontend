import instance from "./index";

export const getUserInfo = async () => {
  const response = await instance.get("/owners/profile");
  return response.data;
};

export const updateUserInfo = async (userData) => {
  const response = await instance.put("/owners/profile", userData);
  return response.data;
};

export const getUserPetsWithDetails = async () => {
  const response = await instance.get("/petdetails/");
  return response.data;
};

export const updateUserProfileImage = async (formData) => {
  try {
    const response = await instance.put("/owners/profile/", formData);
    return response.data;
  } catch (error) {
    console.error('Error in updateUserProfileImage:', error);
    throw error;
  }
};
