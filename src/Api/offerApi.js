import axiosInstance from "../Api/axios.js";

export const getAllOffers = async () => {
    const res = await axiosInstance.get("/offers");
    return res.data;
};

export const createOffer = async (data) => {
    const res = await axiosInstance.post("/offers", data);
    return res.data;
};

export const updateOffer = async (id,data) => {
    const res = await axiosInstance.put(`/offers/${id}`,data);
    return res.data;
};

export const deleteOffer = async (id) => {
    const res = await axiosInstance.delete(`/offers/${id}`);
    return res.data;
};