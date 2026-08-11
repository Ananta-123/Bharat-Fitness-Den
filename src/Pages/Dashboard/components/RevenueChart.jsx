import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const dummyRevenue = [
  { month: "Jan", revenue: 145000 },
  { month: "Feb", revenue: 158000 },
  { month: "Mar", revenue: 172000 },
  { month: "Apr", revenue: 165000 },
  { month: "May", revenue: 191000 },
  { month: "Jun", revenue: 220000 },
  { month: "Jul", revenue: 208000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-700
        bg-[#111827]
        p-4
        shadow-xl
      "
    >
      <p className="mb-2 text-sm font-semibold text-white">
        {label}
      </p>

      <p className="text-sm font-semibold text-[#F96B00]">
        Revenue : ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const RevenueChart = ({
  data = dummyRevenue,
  loading = false,
}) => {
  if (loading) {
    return (
      <div
        className="
          h-[420px]
          animate-pulse
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          dark:border-zinc-800
          dark:bg-[#0F1324]
        "
      >
        <div className="mb-6 h-6 w-48 rounded bg-gray-300 dark:bg-zinc-700" />

        <div className="h-[300px] rounded bg-gray-300 dark:bg-zinc-700" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        y: -4,
      }}
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
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monthly revenue performance
          </p>
        </div>

        <span
          className="
            rounded-lg
            bg-orange-100
            px-3
            py-1
            text-xs
            font-semibold
            text-orange-600
            dark:bg-orange-500/10
            dark:text-orange-400
          "
        >
          Jan - Jul 2026
        </span>
      </div>

      {/* Chart */}

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#C11200"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#C11200"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2d3748"
              opacity={0.25}
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#94a3b8"
              tickFormatter={(value) => `₹${value / 1000}k`}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#F96B00",
                strokeWidth: 1,
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#F96B00"
              strokeWidth={3}
              fill="url(#colorRevenue)"
              activeDot={{
                r: 6,
                fill: "#F96B00",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueChart;