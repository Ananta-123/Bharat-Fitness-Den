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

import { UserRound } from "lucide-react";


const TrainerChart = ({
  data = [],
}) => {

  /*
   * =====================================================
   * GROUP TRAINERS BY BRANCH
   * =====================================================
   */

  const branchMap = {};

  data
    .filter(
      (trainer) =>
        trainer?.branchId
    )
    .forEach((trainer) => {

      const branchId =
        trainer.branchId?._id;

      const branchName =
        trainer.branchId?.branchName ||
        "Unknown Branch";

      if (!branchId) {
        return;
      }

      if (!branchMap[branchId]) {

        branchMap[branchId] = {
          branchId,
          branch: branchName,
          trainers: 0,
        };

      }

      /*
       * Count only active trainers
       */

      if (trainer?.status === true) {

        branchMap[branchId].trainers += 1;

      }

    });


  /*
   * Convert object into array
   */

  const chartData =
    Object.values(branchMap);


  /*
   * Total active trainers
   */

  const totalTrainers =
    chartData.reduce(
      (sum, item) =>
        sum + item.trainers,
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

      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          mb-8
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#02045D]/10
            "
          >

            <UserRound
              size={21}
              className="text-[#02045D]"
            />

          </div>


          <div>

            <h2
              className="
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Trainers By Branch
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Active trainers across branches
            </p>

          </div>

        </div>


        {/* Total */}

        <span
          className="
            rounded-lg
            bg-blue-100
            px-3
            py-1
            text-xs
            font-semibold
            text-blue-700
            dark:bg-blue-500/10
            dark:text-blue-400
          "
        >
          {totalTrainers} Trainers
        </span>

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {chartData.length === 0 ? (

        <div
          className="
            flex
            h-[300px]
            items-center
            justify-center
          "
        >

          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            No trainer data available.
          </p>

        </div>

      ) : (

        <>

          {/* =========================
              BAR CHART
          ========================= */}

          <div
            className="
              h-[300px]
              w-full
            "
          >

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
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  stroke="#94A3B8"
                />


                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      "#111827",

                    border:
                      "1px solid #374151",

                    borderRadius:
                      "12px",

                    color: "#ffffff",
                  }}

                  formatter={(
                    value
                  ) => [
                    value,
                    "Active Trainers",
                  ]}
                />


                <Bar
                  dataKey="trainers"
                  fill="#02045D"
                  radius={[
                    10,
                    10,
                    0,
                    0,
                  ]}
                  maxBarSize={50}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>


          {/* =========================
              SUMMARY
          ========================= */}

          <div
            className="
              mt-6
              border-t
              border-gray-200
              pt-5
              dark:border-zinc-700
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-gray-500
                dark:text-gray-400
              "
            >
              Total Active Trainers
            </p>


            <p
              className="
                mt-1
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {totalTrainers.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

        </>

      )}

    </motion.div>

  );

};


export default TrainerChart;