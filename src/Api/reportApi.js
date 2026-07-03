import axiosInstance from "../Api/axios.js";

export const getRevenueReport = async () => {
    const res = await axiosInstance.get("/reports/revenue");
    return res.data;
};

export const getMembershipReport = async () => {
    const res = await axiosInstance.get("/reports/memberships");
    return res.data;
};

export const getUserReport = async () => {
    const res = await axiosInstance.get("/reports/users");
    return res.data;
};

export const getBranchReport = async () => {
    const res = await axiosInstance.get("/reports/branches");
    return res.data;
};