import instance from "./index";

const getUserPets = async () => {
  try {
    const { data } = await instance.get("owners/profile");
    // const {data} = await instance.get("petdetails/");
    console.log("apiFunctionData", data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getPetAppointments = async () => {
  try {
    const { data } = await instance.get("/petdetails");
    console.log("ayyy", data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addPet = async (petInfo) => {
  try {
    const formData = new FormData();
    for (let key in petInfo) {
      if (key != "image") formData.append(key, petInfo[key]);
    }
    formData.append("image", {
      name: "image.jpg",
      type: "image/jpeg",
      uri: petInfo.image,
    });

    console.log("HERE");

    const { data } = await instance.post("/petdetails/", formData);
    console.log("Added pet:", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getUserPets, addPet, getPetAppointments };
