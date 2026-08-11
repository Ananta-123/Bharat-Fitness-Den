
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
} from "lucide-react";

const BranchStats = ({
  branches = [],
  revenueReport = [],
}) => {
  // ==========================================
  // TOTAL MEMBERS
  // ==========================================

  const totalMembers = branches.reduce(
    (total, branch) =>
      total + Number(branch.totalUsers || 0),
    0
  );

  // ==========================================
  // TOTAL TRAINERS
  // ==========================================

  const totalTrainers = branches.reduce(
    (total, branch) =>
      total + Number(branch.totalTrainers || 0),
    0
  );

  // ==========================================
  // COMBINED REVENUE
  // ==========================================

  const combinedRevenue = revenueReport.reduce(
    (total, item) => {
      return (
        total +
        Number(
          item.revenue ||
            item.totalRevenue ||
            item.amount ||
            0
        )
      );
    },
    0
  );

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // ==========================================
  // STATS
  // ==========================================

  const stats = [
    {
      title: "Total Members",
      value: totalMembers.toLocaleString("en-IN"),
      icon: Users,
      color: "text-lime-400",
    },

    {
      title: "Combined Revenue",
      value: formatCurrency(
        combinedRevenue
      ),
      icon: DollarSign,
      color: "text-orange-400",
    },

    {
      title: "Total Trainers",
      value: totalTrainers.toLocaleString(
        "en-IN"
      ),
      icon: Activity,
      color: "text-yellow-400",
    },

    {
      title: "Avg Capacity",
      value: "N/A",
      icon: TrendingUp,
      color: "text-red-400",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
        mb-8
      "
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              p-6
              rounded-3xl
              border
              border-gray-200
              dark:border-orange-500/20
              bg-white
              dark:bg-[#050816]
              shadow-sm
              dark:shadow-none
              transition-all
            "
          >
            <Icon
              className={`${item.color} mb-5`}
              size={22}
            />

            <h2
              className={`
                text-4xl font-bold
                ${item.color}
              `}
            >
              {item.value}
            </h2>

            <p
              className="
                mt-2
                text-gray-500
                dark:text-gray-400
              "
            >
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BranchStats;

