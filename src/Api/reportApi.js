import axiosInstance from "./axios.js";

// ======================================================
// SUMMARY REPORTS
// Backend prefix: /api/reports
// ======================================================

export const getRevenueSummary = async () => {
  const { data } = await axiosInstance.get("/reports/revenue");
  return data;
};

export const getMembershipSummary = async () => {
  const { data } = await axiosInstance.get("/reports/memberships");
  return data;
};

export const getUsersSummary = async () => {
  const { data } = await axiosInstance.get("/reports/users");
  return data;
};

export const getBranchReport = async () => {
  const { data } = await axiosInstance.get("/reports/branches");
  return data;
};


// ======================================================
// ADVANCED / ANALYTICS REPORTS
// Backend prefix: /api/advanced-reports
// ======================================================

export const getRevenueAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/advanced-reports/revenue"
  );

  return data;
};

export const getMembershipAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/advanced-reports/memberships"
  );

  return data;
};

export const getWorkoutAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/advanced-reports/workouts"
  );

  return data;
};

export const getDietAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/advanced-reports/diets"
  );

  return data;
};