import DashboardHeader from "./components/DashboardHeader";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import MembershipChart from "./components/MembershipChart";
import AttendanceChart from "./components/AttendanceChart";
import RecentMembers from "./components/RecentMembers";
import DashboardSkeleton from "./components/DashboardSkeleton";
import EmptyState from "./components/EmptyState";

import useDashboard from "./hooks/useDashboard";

import {
  Building2,
  Users,
  UserCheck,
  IndianRupee,
  AlertCircle,
} from "lucide-react";

const DashboardPage = () => {
  const {
    dashboard,
    loading,
    error,
    refetch,
  } = useDashboard();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Unable to Load Dashboard"
        description={error}
        buttonText="Retry"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-8">

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Branches"
          value={dashboard?.totalBranches ?? 0}
          subtitle="Registered Branches"
          icon={Building2}
          trend="+2"
          trendType="increase"
          iconBg="from-[#02045D] to-[#3B82F6]"
        />

        <StatCard
          title="Total Members"
          value={dashboard?.totalUsers ?? 0}
          subtitle="Registered Members"
          icon={Users}
          trend="+18%"
          trendType="increase"
          iconBg="from-[#8B0000] to-[#F96B00]"
        />

        <StatCard
          title="Active Members"
          value={dashboard?.activeMembers ?? 0}
          subtitle="Current Active"
          icon={UserCheck}
          trend="+6%"
          trendType="increase"
          iconBg="from-[#059669] to-[#10B981]"
        />

        <StatCard
          title="Revenue"
          value={`₹${Number(
            dashboard?.totalRevenue ?? 0
          ).toLocaleString("en-IN")}`}
          subtitle="Total Revenue"
          icon={IndianRupee}
          trend="+12%"
          trendType="increase"
          iconBg="from-[#7C3AED] to-[#A855F7]"
        />
      </div>

      {/* Revenue + Membership */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <MembershipChart />
      </div>

      {/* Attendance + Recent Members */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AttendanceChart />
        </div>

        <RecentMembers />
      </div>
    </div>
  );
};

export default DashboardPage;