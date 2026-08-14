import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import ReportHeader from "./components/ReportHeader";
import ReportStats from "./components/ReportStats";
import RevenueChart from "./components/RevenueChart";
import MembershipCard from "./components/MembershipCard";
import WorkoutChart from "./components/WorkoutChart";
import DietProgress from "./components/DietProgress";
import BranchChart from "./components/BranchChart";
import BranchTable from "./components/BranchTable";
import LoadingSkeleton from "./components/LoadingSkeleton";

import {
  getRevenueSummary,
  getMembershipSummary,
  getUsersSummary,
  getBranchReport,

  getRevenueAnalytics,
  getMembershipAnalytics,
  getWorkoutAnalytics,
  getDietAnalytics,
} from "../../Api/reportApi.js";

import {getUserStatusCount} from "../../Api/dashboardApi.js"

export default function ReportsPage() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [summaryData, setSummaryData] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    activeMembers: 0,
    inactiveMembers: 0,
    branches: [],
  });

  const [analyticsData, setAnalyticsData] = useState({
    revenue: [],
    memberships: [],
    workouts: [],
    diets: [],
  });

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        revenueSummaryRes,
        membershipSummaryRes,
        usersSummaryRes,
        branchRes,
        userStatusRes,

        revenueAnalyticsRes,
        membershipAnalyticsRes,
        workoutAnalyticsRes,
        dietAnalyticsRes,
      ] = await Promise.all([
        getRevenueSummary(),
        getMembershipSummary(),
        getUsersSummary(),
        getBranchReport(),
        getUserStatusCount(),

        getRevenueAnalytics(),
        getMembershipAnalytics(),
        getWorkoutAnalytics(),
        getDietAnalytics(),
      ]);

      setSummaryData({
  totalRevenue:
    revenueSummaryRes?.totalRevenue || 0,

  totalUsers:
    usersSummaryRes?.totalUsers || 0,

  activeMembers:
    userStatusRes?.data?.activeUsers || 0,

  inactiveMembers:
    userStatusRes?.data?.inactiveUsers || 0,

  branches:
    branchRes?.report || [],
});

      setAnalyticsData({
        revenue:
          revenueAnalyticsRes?.report || [],

        memberships:
          membershipAnalyticsRes?.report || [],

        workouts:
          workoutAnalyticsRes?.report || [],

        diets:
          dietAnalyticsRes?.report || [],
      });
    } catch (err) {
      console.error("Failed to load reports:", err);

      setError(
        err?.response?.data?.message ||
        "Failed to load reports. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div
      className={`
        min-h-screen
        transition-colors
        duration-300
        ${theme === "dark"
          ? "text-white"
          : "text-gray-900"
        }
      `}
    >
      <div className="space-y-6">

        {/* ERROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              rounded-xl
              border
              border-red-500/30
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-400
            "
          >
            {error}
          </motion.div>
        )}

        {/* HEADER */}
        <ReportHeader />

        {/* SUMMARY CARDS */}
        <ReportStats
  revenue={summaryData.totalRevenue}
  totalUsers={summaryData.totalUsers}
  activeMembers={summaryData.activeMembers}
  inactiveMembers={summaryData.inactiveMembers}
  totalBranches={summaryData.branches.length}
/>

        {/* REVENUE + MEMBERSHIP */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="xl:col-span-2"
          >
            <RevenueChart
              totalRevenue={summaryData.totalRevenue}
              monthlyRevenue={analyticsData.revenue}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <MembershipCard
  active={summaryData.activeMembers}
  inactive={summaryData.inactiveMembers}
  analytics={analyticsData.memberships}
/>
          </motion.div>

        </div>

        {/* WORKOUT + DIET */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <WorkoutChart
              data={analyticsData.workouts}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DietProgress
              data={analyticsData.diets}
            />
          </motion.div>

        </div>

        {/* BRANCH */}
        <div className="grid grid-cols-1 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <BranchChart
              branches={summaryData.branches}
            />
          </motion.div>

        </div>

        {/* BRANCH TABLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
        >
          <BranchTable
            branches={summaryData.branches}
          />
        </motion.div>

      </div>
    </div>
  );
}