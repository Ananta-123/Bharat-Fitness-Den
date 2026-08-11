import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const dummyMembershipData = [
  {
    name: "Elite",
    value: 38,
    color: "#C11200",
  },
  {
    name: "Pro",
    value: 29,
    color: "#F96B00",
  },
  {
    name: "Basic",
    value: 22,
    color: "#FBBF24",
  },
  {
    name: "Trial",
    value: 11,
    color: "#1D4ED8",
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];

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
      <p className="font-semibold text-white">
        {item.name}
      </p>

      <p className="mt-1 text-sm text-[#F96B00]">
        {item.value}%
      </p>
    </div>
  );
};

const MembershipChart = ({
  data = dummyMembershipData,
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
        <div className="mb-8 h-6 w-40 rounded bg-gray-300 dark:bg-zinc-700" />

        <div className="mx-auto h-52 w-52 rounded-full bg-gray-300 dark:bg-zinc-700" />

        <div className="mt-8 space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-4 rounded bg-gray-300 dark:bg-zinc-700"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
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

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Membership Mix
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Current subscription distribution
        </p>
      </div>

      {/* Chart */}

      <div className="mx-auto h-[230px] w-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}

      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <motion.div
            whileHover={{
              x: 5,
            }}
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: item.color,
                }}
              />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {item.value}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MembershipChart;