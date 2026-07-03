import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import ReportHeader from "./components/ReportHeader";
import ReportStats from "./components/ReportStats";
import RevenueChart from "./components/RevenueChart";
import MembershipCard from "./components/MembershipCard";
import BranchChart from "./components/BranchChart";
import UserGrowthCard from "./components/UserGrowthCard";
import BranchTable from "./components/BranchTable";
import LoadingSkeleton from "./components/LoadingSkeleton";

import {
  getRevenueReport,
  getMembershipReport,
  getUserReport,
  getBranchReport,
} from "../../Api/reportApi";

export default function ReportsPage() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);

  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    activeMembers: 0,
    expiredMembers: 0,
    branches: [],
  });

  const fetchReports = async () => {
    try {
      setLoading(true);

      const [
        revenueRes,
        membershipRes,
        userRes,
        branchRes,
      ] = await Promise.all([
        getRevenueReport(),
        getMembershipReport(),
        getUserReport(),
        getBranchReport(),
      ]);

      setReportData({
        totalRevenue: revenueRes.totalRevenue || 0,
        totalUsers: userRes.totalUsers || 0,
        activeMembers: membershipRes.active || 0,
        expiredMembers: membershipRes.expired || 0,
        branches: branchRes.report || [],
      });
    } catch (err) {
      console.error("Failed to load reports", err);
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
      className={`min-h-screen transition-colors duration-300
      ${
        theme === "dark"
          ? "bg-transparent text-white"
          : "bg-transparent text-gray-900"
      }`}
    >
      <div className="space-y-6">

        {/* Header */}
        <ReportHeader />

        {/* Top Stats */}
        <ReportStats
          revenue={reportData.totalRevenue}
          totalUsers={reportData.totalUsers}
          activeMembers={reportData.activeMembers}
          expiredMembers={reportData.expiredMembers}
          totalBranches={reportData.branches.length}
        />

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .4 }}
            whileHover={{ y: -3 }}
            className="xl:col-span-2"
          >
            <RevenueChart
              totalRevenue={reportData.totalRevenue}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .45 }}
            whileHover={{ y: -3 }}
          >
            <MembershipCard
              active={reportData.activeMembers}
              expired={reportData.expiredMembers}
            />
          </motion.div>

        </div>

        {/* Second Row */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .45 }}
            whileHover={{ y: -3 }}
          >
            <BranchChart
              branches={reportData.branches}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            whileHover={{ y: -3 }}
          >
            <UserGrowthCard
              totalUsers={reportData.totalUsers}
            />
          </motion.div>

        </div>

        {/* Table */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .55 }}
        >
          <BranchTable
            branches={reportData.branches}
          />
        </motion.div>

      </div>
    </div>
  );
}