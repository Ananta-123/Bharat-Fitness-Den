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

export const updateBranch = async (
  branchId,
  updatedData
) => {
  const response =
    await axiosInstance.put(
      `/branches/${branchId}`,
      updatedData
    );

  return response.data;
};

export const deleteBranch =
  async (branchId) => {
    const response =
      await axiosInstance.delete(
        `/branches/${branchId}`
      );

    return response.data;
  };