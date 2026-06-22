import axiosInstance from "../Api/axios.js";

// Create Plan
export const createPlan = async (data) => {
  const response = await axiosInstance.post(
    "/subscriptions",
    data
  );

  return response.data;
};

// get all plans

export const getAllPlans = async () => {
  const response = await axiosInstance.get("/subscriptions");

  return response.data;
};

// update plan

export const updatePlan = async (
  id,
  data
) => {
  const response = await axiosInstance.put(
    `/subscriptions/${id}`,
    data
  );

  return response.data;
};

//delete plan
export const deletePlan = async (id) => {
  const response = await axiosInstance.delete(
    `/subscriptions/${id}`
  );

  return response.data;
};