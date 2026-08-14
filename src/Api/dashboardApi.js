import axiosInstance from "./axios.js";

/**
 * ===============================
 * DASHBOARD SUMMARY
 * ===============================
 */
export const getDashboardAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/analytics/dashboard"
  );

  return data;
};

/**
 * ===============================
 * REVENUE BY BRANCH
 * ===============================
 */
export const getRevenueAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/analytics/revenue"
  );

  return data;
};

/**
 * ===============================
 * MEMBERS BY BRANCH
 * ===============================
 */
export const getMembersAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/analytics/members"
  );

  return data;
};

/**
 * ===============================
 * MEMBERSHIP ANALYTICS
 * ===============================
 */
export const getMembershipAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/analytics/memberships"
  );

  return data;
};

/**
 * ===============================
 * WORKOUT ANALYTICS
 * ===============================
 */
export const getWorkoutAnalytics = async () => {
  const { data } = await axiosInstance.get(
    "/analytics/workouts"
  );

  return data;
};

/**
 * ===============================
 * RECENT MEMBERS
 *
 * Keep this only if your backend
 * already has this route.
 * ===============================
 */
export const getRecentMembers = async (
  limit = 5
) => {
  const { data } = await axiosInstance.get(
    `/admin/users/recent?limit=${limit}`
  );

  return data;
};

/**
 * ===============================
 * ACTIVE INACTIVE COUNT
 * ===============================
 */

export const getUserStatusCount = async () => {
  const { data } = await axiosInstance.get(
    "/admin/users/count/status"
  );

  return data;
};