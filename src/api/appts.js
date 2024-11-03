import instance from ".";

const createAppointment = async (apptInfo) => {
  console.log("first apptInfo", apptInfo);
  try {
    const { data } = await instance.post("appointment/", apptInfo);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export { createAppointment };
