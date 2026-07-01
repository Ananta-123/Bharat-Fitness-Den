import axiosInstance from "../Api/axios.js";

//get all goal groups
export const getAllGoals = async () => {
    const res = await axiosInstance.get("/goals");
    return res.data;
};

//create goal groups
export const createGoal = async (data) => {
    const res = await axiosInstance.post("/goals", data);
    return res.data;
};

//update goal groups
export const updateGoal = async (id, data) => {
    const res = await axiosInstance.put(`/goals/${id}`, data);
    return res.data;
};

//delete goal groups
export const deleteGoal = async (id) => {
    const res = await axiosInstance.delete(`/goals/${id}`);
    return res.data;
};