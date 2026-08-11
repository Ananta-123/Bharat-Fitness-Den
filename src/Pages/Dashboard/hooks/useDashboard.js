import { useCallback, useEffect, useState } from "react";
import { getDashboardAnalytics } from "../../../Api/dashboardApi.js";

const useDashboard = () => {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDashboard = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getDashboardAnalytics();

        console.log(
          "Dashboard API Response:",
          response
        );

        if (!response?.success) {
          throw new Error(
            response?.message ||
              "Failed to load dashboard"
          );
        }

        // Backend:
        // response.data = {
        //   totalUsers,
        //   totalBranches,
        //   activeMembers,
        //   totalRevenue
        // }

        setDashboard(
          response.data || {}
        );

      } catch (error) {
        console.error(
          "Dashboard Error:",
          error
        );

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load dashboard"
        );

      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default useDashboard;