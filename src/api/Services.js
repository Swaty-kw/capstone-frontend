import axios from "./index";
import instance from "./index";

const getServices = async () => {
  const response = await instance.get("/api/services");
  return response.data;
};

const createService = async (service) => {
  const response = await instance.post("/api/services", service);
  return response.data;
};

const getAllServices = async () => {
  const response = await instance.get("/api/services");
  return response.data;
};

const getServiceById = async (id) => {
  const response = await instance.get(`/api/services/${id}`);
  return response.data;
};

const updateService = async (id, service) => {
  const response = await instance.put(`/api/services/${id}`, service);
  return response.data;
};

const deleteService = async (id) => {
  const response = await instance.delete(`/api/services/${id}`);
  return response.data;
};

export {
  getServices,
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
