import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({
  data = [],
}) => {
  const chartData = data.map(
    (item) => ({
      branch:
        item?.branch?.branchName ||
        item?.branch?.name ||
        "Unknown",

      revenue:
        Number(item?.totalRevenue) || 0,

      payments:
        Number(item?.totalPayments) || 0,
    })
  );

  const totalRevenue =
    chartData.reduce(
      (sum, item) =>
        sum + item.revenue,
      0
    );

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Revenue By Branch
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Successful payment revenue
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
          ₹{totalRevenue.toLocaleString("en-IN")}
        </span>
      </div>

      {chartData.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No revenue data available.
          </p>
        </div>
      ) : (
        <>
          <div className="h-[320px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={chartData}
                barCategoryGap={25}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.2}
                />

                <XAxis
                  dataKey="branch"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94A3B8"
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#94A3B8"
                  tickFormatter={(value) =>
                    `₹${value / 1000}k`
                  }
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(249,107,0,.08)",
                  }}
                  formatter={(
                    value,
                    name
                  ) => {
                    if (
                      name ===
                      "revenue"
                    ) {
                      return [
                        `₹${Number(
                          value
                        ).toLocaleString(
                          "en-IN"
                        )}`,
                        "Revenue",
                      ];
                    }

                    return [
                      value,
                      "Payments",
                    ];
                  }}
                  contentStyle={{
                    backgroundColor:
                      "#111827",
                    border:
                      "1px solid #374151",
                    borderRadius:
                      "12px",
                  }}
                />

                <Bar
                  dataKey="revenue"
                  fill="#F96B00"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-5 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total successful revenue
              </span>

              <span className="font-bold text-gray-900 dark:text-white">
                ₹
                {totalRevenue.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default RevenueChart;