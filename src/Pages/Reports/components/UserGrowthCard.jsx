import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Users, TrendingUp } from "lucide-react";

export default function UserGrowthCard({
  totalUsers = 0,
  monthlyUsers = [],
}) {
  const { theme } = useTheme();

  const placeholderData = [
    { month: "Jan", users: 0 },
    { month: "Feb", users: 0 },
    { month: "Mar", users: 0 },
    { month: "Apr", users: 0 },
    { month: "May", users: 0 },
    { month: "Jun", users: 0 },
    { month: "Jul", users: 0 },
  ];

  const chartData =
    monthlyUsers.length > 0 ? monthlyUsers : placeholderData;

  const isEmpty = monthlyUsers.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className={`rounded-2xl border p-6 transition-all duration-300
      ${
        theme === "dark"
          ? "bg-[#10131F]/90 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className={`text-xl font-semibold ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            User Growth
          </h2>

          <p
            className={`mt-1 text-sm ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Registered users over time
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
          <Users className="text-blue-500" size={24} />
        </div>
      </div>

      {/* Total Users */}

      <div className="flex items-center gap-3 mb-6">
        <h1
          className={`text-4xl font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          {totalUsers}
        </h1>

        <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
          <TrendingUp size={16} />
          Users
        </div>
      </div>

      {/* Chart */}

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#23263A" : "#E5E7EB"}
            />

            <XAxis
              dataKey="month"
              stroke={theme === "dark" ? "#94A3B8" : "#6B7280"}
            />

            <YAxis
              stroke={theme === "dark" ? "#94A3B8" : "#6B7280"}
            />

            <Tooltip
              contentStyle={{
                background:
                  theme === "dark" ? "#10131F" : "#ffffff",
                border:
                  theme === "dark"
                    ? "1px solid #23263A"
                    : "1px solid #E5E7EB",
                borderRadius: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#2563EB",
              }}
              activeDot={{
                r: 6,
                fill: "#2563EB",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div
        className={`mt-6 rounded-xl p-4 flex items-center justify-between
        ${
          theme === "dark"
            ? "bg-[#161A2C]"
            : "bg-gray-50"
        }`}
      >
        <div>
          <p
            className={`text-sm ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Total Registered Users
          </p>

          <h3
            className={`text-2xl font-bold mt-1 ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {totalUsers}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Users className="text-blue-500" size={24} />
        </div>
      </div>

      {/* Empty State */}

      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-5 rounded-xl border border-dashed p-4 text-center
          ${
            theme === "dark"
              ? "border-gray-700 text-gray-400"
              : "border-gray-300 text-gray-500"
          }`}
        >
          <p className="font-medium">
            User growth history is not available yet.
          </p>

          <p className="text-sm mt-1">
            This chart will automatically display monthly registrations once the
            backend provides user growth data.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}