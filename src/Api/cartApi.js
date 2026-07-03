import axiosInstance from "../Api/axios.js";

export const getAllCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data;
};