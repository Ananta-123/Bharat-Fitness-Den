import { motion } from "framer-motion";
import { useTheme } from "next-themes";

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

import { Building2 } from "lucide-react";

export default function BranchChart({
  branches = [],
}) {
  const { theme } = useTheme();

  const isEmpty = branches.length === 0;

  const chartData = isEmpty
    ? [
        {
          branchName: "No Data",
          totalUsers: 0,
        },
      ]
    : branches;

  const colors = [
    "#8B0000",
    "#F96B00",
    "#2563EB",
    "#22C55E",
    "#8B5CF6",
    "#14B8A6",
    "#F59E0B",
  ];

  const totalUsers = branches.reduce(
    (sum, item) =>
      sum + Number(item.totalUsers || 0),
    0
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`
        rounded-2xl
        border
        p-6

        ${
          theme === "dark"
            ? "bg-[#10131F]/90 border-gray-800"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* Header */}
      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">
        <div>
          <h2
            className={`
              text-xl
              font-semibold
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            Branch Distribution
          </h2>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Members across branches
          </p>
        </div>

        <div className="
          w-12
          h-12
          rounded-xl
          bg-purple-500/15
          flex
          items-center
          justify-center
        ">
          <Building2
            className="text-purple-500"
            size={24}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                theme === "dark"
                  ? "#23263A"
                  : "#E5E7EB"
              }
            />

            <XAxis
              type="number"
              stroke={
                theme === "dark"
                  ? "#94A3B8"
                  : "#6B7280"
              }
            />

            <YAxis
              type="category"
              dataKey="branchName"
              width={120}
              stroke={
                theme === "dark"
                  ? "#94A3B8"
                  : "#6B7280"
              }
            />

            <Tooltip
              formatter={(value) => [
                value,
                "Users",
              ]}
              contentStyle={{
                background:
                  theme === "dark"
                    ? "#10131F"
                    : "#ffffff",

                border:
                  theme === "dark"
                    ? "1px solid #23263A"
                    : "1px solid #E5E7EB",

                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="totalUsers"
              radius={[
                0,
                8,
                8,
                0,
              ]}
              barSize={24}
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      colors[
                        index %
                          colors.length
                      ]
                    }
                  />
                )
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div
        className={`
          mt-6
          grid
          grid-cols-2
          gap-4
          rounded-xl
          p-4

          ${
            theme === "dark"
              ? "bg-[#161A2C]"
              : "bg-gray-50"
          }
        `}
      >
        <div>
          <p className="text-sm text-gray-500">
            Total Branches
          </p>

          <h3
            className={`
              text-2xl
              font-bold
              mt-1
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            {branches.length}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total Members
          </p>

          <h3
            className="
              text-2xl
              font-bold
              mt-1
              text-orange-500
            "
          >
            {totalUsers.toLocaleString(
              "en-IN"
            )}
          </h3>
        </div>
      </div>

      {isEmpty && (
        <div
          className={`
            mt-5
            rounded-xl
            border
            border-dashed
            p-4
            text-center
            ${
              theme === "dark"
                ? "border-gray-700 text-gray-400"
                : "border-gray-300 text-gray-500"
            }
          `}
        >
          No branch report available.
        </div>
      )}
    </motion.div>
  );
}