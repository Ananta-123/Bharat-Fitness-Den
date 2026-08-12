import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  Dumbbell,
  Flame,
} from "lucide-react";

export default function WorkoutChart({
  data = [],
}) {
  const { theme } = useTheme();

  const chartData = data.map((item) => {
    const date = new Date(`${item._id}-01`);

    return {
      month: date.toLocaleString("en-IN", {
        month: "short",
      }),

      workouts: Number(
        item.workouts || 0
      ),

      calories: Number(
        item.calories || 0
      ),
    };
  });

  const isEmpty = chartData.length === 0;

  const totalWorkouts = chartData.reduce(
    (sum, item) =>
      sum + item.workouts,
    0
  );

  const totalCalories = chartData.reduce(
    (sum, item) =>
      sum + item.calories,
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
            Workout Performance
          </h2>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Completed workouts and calories burned
          </p>
        </div>

        <div className="
          w-12
          h-12
          rounded-xl
          bg-orange-500/15
          flex
          items-center
          justify-center
        ">
          <Dumbbell
            size={24}
            className="text-orange-500"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="
        grid
        grid-cols-2
        gap-4
        mb-6
      ">
        <div
          className={`
            rounded-xl
            p-4
            ${
              theme === "dark"
                ? "bg-[#161A2C]"
                : "bg-gray-50"
            }
          `}
        >
          <div className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
          ">
            <Dumbbell size={16} />
            Completed Workouts
          </div>

          <h3
            className={`
              mt-2
              text-2xl
              font-bold
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            {totalWorkouts.toLocaleString(
              "en-IN"
            )}
          </h3>
        </div>

        <div
          className={`
            rounded-xl
            p-4
            ${
              theme === "dark"
                ? "bg-[#161A2C]"
                : "bg-gray-50"
            }
          `}
        >
          <div className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
          ">
            <Flame
              size={16}
              className="text-orange-500"
            />
            Calories Burned
          </div>

          <h3
            className={`
              mt-2
              text-2xl
              font-bold
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            {totalCalories.toLocaleString(
              "en-IN"
            )}
          </h3>
        </div>
      </div>

      {/* Chart */}
      {!isEmpty ? (
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <ComposedChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
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
                dataKey="month"
                stroke={
                  theme === "dark"
                    ? "#94A3B8"
                    : "#6B7280"
                }
              />

              <YAxis
                yAxisId="workouts"
                stroke={
                  theme === "dark"
                    ? "#94A3B8"
                    : "#6B7280"
                }
              />

              <YAxis
                yAxisId="calories"
                orientation="right"
                stroke="#F96B00"
              />

              <Tooltip
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

              <Legend />

              <Bar
                yAxisId="workouts"
                dataKey="workouts"
                name="Workouts"
                fill="#8B0000"
                radius={[6, 6, 0, 0]}
              />

              <Line
                yAxisId="calories"
                type="monotone"
                dataKey="calories"
                name="Calories"
                stroke="#F96B00"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#F96B00",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className={`
            h-80
            rounded-xl
            border-2
            border-dashed
            flex
            items-center
            justify-center
            text-center
            ${
              theme === "dark"
                ? "border-gray-700 text-gray-400"
                : "border-gray-300 text-gray-500"
            }
          `}
        >
          <div>
            <p className="font-medium">
              No workout analytics available
            </p>

            <p className="
              text-sm
              mt-1
            ">
              Completed workout sessions will appear here.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}