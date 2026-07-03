import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { IndianRupee, TrendingUp } from "lucide-react";

export default function RevenueChart({
  totalRevenue = 0,
  monthlyRevenue = [],
}) {
  const { theme } = useTheme();

  // Placeholder data until backend provides monthly revenue
  const placeholderData = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
    { month: "Jul", revenue: 0 },
  ];

  const chartData =
    monthlyRevenue.length > 0 ? monthlyRevenue : placeholderData;

  const isEmpty = monthlyRevenue.length === 0;

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
            Revenue Overview
          </h2>

          <p
            className={`mt-1 text-sm ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Monthly revenue analytics
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center">
          <IndianRupee className="text-orange-500" size={24} />
        </div>
      </div>

      {/* Revenue */}

      <div className="flex items-center gap-3 mb-6">
        <h1
          className={`text-4xl font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          ₹{Number(totalRevenue).toLocaleString("en-IN")}
        </h1>

        <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
          <TrendingUp size={16} />
          Revenue
        </div>
      </div>

      {/* Chart */}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#F96B00"
                  stopOpacity={0.55}
                />
                <stop
                  offset="100%"
                  stopColor="#F96B00"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

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

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#F96B00"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 6,
                fill: "#F96B00",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
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
            Revenue trend data is not available yet.
          </p>

          <p className="text-sm mt-1">
            This chart will automatically display monthly revenue when the
            backend provides it.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}