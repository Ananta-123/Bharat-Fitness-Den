import axiosInstance from "../Api/axios.js";

// GET ALL CATEGORIES
export const getAllCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

// CREATE CATEGORY
export const createCategory = async (data) => {
  const response = await axiosInstance.post(
    "/categories",
    data
  );
  return response.data;
};

// UPDATE CATEGORY
export const updateCategory = async (
  id,
  data
) => {
  const response = await axiosInstance.put(
    `/categories/${id}`,
    data
  );

  return response.data;
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(
    `/categories/${id}`
  );

  return response.data;
};