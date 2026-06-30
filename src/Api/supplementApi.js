import axiosInstance from "../Api/axios.js";

export const getAllProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(
    `/products/${id}`,
    data
  );

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(
    `/products/${id}`
  );

  return res.data;
};