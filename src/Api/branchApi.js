import axiosInstance from "../Api/axios.js";

export const getAllBranches = async () => {
  const response = await axiosInstance.get("/branches");
  return response.data;
};

export const createBranch = async (data) => {
  const response = await axiosInstance.post(
    "/branches",
    data
  );

  return response.data;
};