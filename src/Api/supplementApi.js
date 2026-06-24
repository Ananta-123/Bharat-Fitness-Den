import axiosInstance from "../Api/axios.js";

export const getAllProducts = async () => {
  const res = await axiosInstance.get("/supplements");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axiosInstance.post("/supplements", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(
    `/supplements/${id}`,
    data
  );

  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(
    `/supplements/${id}`
  );

  return res.data;
};