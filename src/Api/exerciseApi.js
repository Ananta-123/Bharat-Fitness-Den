import axiosInstance from "../Api/axios.js";

export const getAllExercises = async () => {
    const res = await axiosInstance.get("/exercises");
    return res.data;
};

export const createExercise = async (data) => {
    const res = await axiosInstance.post("/exercises", data);
    return res.data;
};

export const updateExercise = async (id, data) => {
    const res = await axiosInstance.put(`/exercises/${id}`, data);
    return res.data;
};

export const deleteExercise = async (id) => {
    const res = await axiosInstance.delete(`/exercises/${id}`);
    return res.data;
};