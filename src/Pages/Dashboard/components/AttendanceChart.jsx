import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const dummyAttendance = [
  { day: "Mon", attendance: 82 },
  { day: "Tue", attendance: 96 },
  { day: "Wed", attendance: 71 },
  { day: "Thu", attendance: 108 },
  { day: "Fri", attendance: 124 },
  { day: "Sat", attendance: 156 },
  { day: "Sun", attendance: 132 },
];

const COLORS = [
  "#C11200",
  "#D62A00",
  "#E54800",
  "#F96B00",
  "#FB8C00",
  "#FDBA74",
  "#02045D",
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
        px-4
        py-3
        shadow-xl
      "
    >
      <p className="text-sm font-semibold text-white">{label}</p>

      <p className="mt-1 text-sm font-medium text-[#F96B00]">
        Attendance : {payload[0].value} Members
      </p>
    </div>
  );
};

const AttendanceChart = ({
  data = dummyAttendance,
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
        <div className="mb-6 h-6 w-40 rounded bg-gray-300 dark:bg-zinc-700" />

        <div className="h-[300px] rounded bg-gray-300 dark:bg-zinc-700" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
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
            Weekly Attendance
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Member check-ins this week
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
          Last 7 Days
        </span>
      </div>

      {/* Chart */}

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap={24}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.2}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              stroke="#94A3B8"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#94A3B8"
            />

            <Tooltip
              cursor={{ fill: "rgba(249,107,0,.08)" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="attendance"
              radius={[10, 10, 0, 0]}
              maxBarSize={42}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-5 dark:border-zinc-700">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Total
          </p>

          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {data.reduce((sum, item) => sum + item.attendance, 0)}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Average
          </p>

          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {Math.round(
              data.reduce((sum, item) => sum + item.attendance, 0) /
                data.length
            )}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Highest
          </p>

          <p className="mt-1 text-lg font-bold text-[#F96B00]">
            {Math.max(...data.map((item) => item.attendance))}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceChart;