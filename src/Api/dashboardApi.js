import axiosInstance from "../Api/axios.js";


export const getDashboardAnalytics = async () => {
  const { data } = await axiosInstance.get("/admin/dashboard");
  return data;
};

export const getRevenueAnalytics = async () => {
  const { data } = await axiosInstance.get("/analytics/revenue");
  return data;
};

export const getMembershipAnalytics = async () => {
  const { data } = await axiosInstance.get("/analytics/memberships");
  return data;
};

export const getRecentMembers = async (limit = 10) => {
  const response = await axiosInstance.get(
    `/admin/users/recent?limit=${limit}`
  );

  return response.data;
};

// export const getDashboard = async () => {
//   const { data } = await axiosInstance.get(
//     "/admin/dashboard"
//   );

//   return data;
// };