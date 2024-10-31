import axios from "./index";
import instance from "./index";

const getServices = async () => {
  try {
    const response = await instance.get("/api/services");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createService = async (service) => {
  try {
    const response = await instance.post("/api/services", service);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllServices = async () => {
  try {
    const response = await instance.get("/services");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getServiceById = async (id) => {
  try {
    const response = await instance.get(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateService = async (id, service) => {
  try {
    const response = await instance.put(`/api/services/${id}`, service);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (id) => {
  try {
    const response = await instance.delete(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getServices,
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
