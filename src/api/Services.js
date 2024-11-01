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

export const fetchGooglePlacesData = async (placeName, location) => {
  try {
    // First, search for the place to get the Place ID
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      placeName
    )}&inputtype=textquery&locationbias=point:${location.lat},${
      location.lng
    }&key=${GOOGLE_PLACES_API_KEY}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.candidates && searchData.candidates[0]) {
      const placeId = searchData.candidates[0].place_id;

      // Then get the place details including reviews
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_PLACES_API_KEY}`;

      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      return {
        rating: detailsData.result.rating || 0,
        totalReviews: detailsData.result.user_ratings_total || 0,
        reviews: detailsData.result.reviews || [],
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
    return null;
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
