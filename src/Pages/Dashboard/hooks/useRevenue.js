// src/Pages/Dashboard/hooks/useRevenue.js

import { useEffect, useState } from "react";
import { getRevenueAnalytics } from "../../../api/revenueApi";

const useRevenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRevenue = async () => {
    try {
      setLoading(true);

      const res = await getRevenueAnalytics();

      console.log("Revenue API:", res);

      if (res.success) {
        setRevenueData(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch revenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return {
    revenueData,
    loading,
    error,
    refetch: fetchRevenue,
  };
};

export default useRevenue;