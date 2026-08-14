import DashboardHeader from "./components/DashboardHeader";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import MembershipChart from "./components/MembershipChart";
import TrainerChart from "./components/TrainerChart";
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
  // Dumbbell,
} from "lucide-react";

const DashboardPage = () => {
  const {
    dashboard,
    userStatus,
    revenue,
    members,
    users,
    trainers,
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

      {/* =========================
          HEADER
      ========================= */}
      <DashboardHeader />

      {/* =========================
          STATISTICS
      ========================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Branches"
          value={
            dashboard?.totalBranches ?? 0
          }
          subtitle="Registered branches"
          icon={Building2}
          iconBg="from-[#02045D] to-[#3B82F6]"
        />

        <StatCard
          title="Total Members"
          value={
            dashboard?.totalUsers ?? 0
          }
          subtitle="Registered members"
          icon={Users}
          iconBg="from-[#8B0000] to-[#F96B00]"
        />

        <StatCard
          title="Active Members"
          value={
            userStatus?.activeUsers ?? 0
          }
          subtitle="Currently active"
          icon={UserCheck}
          iconBg="from-[#059669] to-[#10B981]"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${Number(
            dashboard?.totalRevenue ?? 0
          ).toLocaleString("en-IN")}`}
          subtitle="Successful payments"
          icon={IndianRupee}
          iconBg="from-[#7C3AED] to-[#A855F7]"
        />

      </div>

      {/* =========================
          REVENUE + MEMBERSHIP
      ========================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RevenueChart
            data={revenue}
          />
        </div>

        <MembershipChart
          data={users}
        />

      </div>

      {/* =========================
          MEMBERS + WORKOUTS
      ========================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <TrainerChart
            data={trainers}
          />
        </div>

        <RecentMembers />

      </div>

      {/* =========================
          BRANCH MEMBERS
      ========================= */}
      <div>
        <BranchMembers
          data={members}
        />
      </div>

    </div>
  );
};

/**
 * =====================================
 * BRANCH MEMBERS TABLE
 * =====================================
 */
const BranchMembers = ({ data = [] }) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        dark:border-zinc-800
        dark:bg-[#0F1324]
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Members By Branch
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Member distribution across branches
        </p>
      </div>

      {data.length === 0 ? (
        <div className="py-12 text-center">
          <Users
            size={40}
            className="mx-auto text-gray-400"
          />

          <p className="mt-4 font-semibold text-gray-700 dark:text-white">
            No branch member data
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-700">
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Branch
                </th>

                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Members
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={
                    item?._id || index
                  }
                  className="border-b border-gray-100 dark:border-zinc-800"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-[#8B0000]
                          to-[#F96B00]
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {index + 1}
                      </div>

                      <span className="font-medium text-gray-900 dark:text-white">
                        {item?.branch?.branchName ||
                          item?.branch?.name ||
                          "Unknown Branch"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <span className="font-bold text-[#F96B00]">
                      {item?.totalUsers ?? 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;