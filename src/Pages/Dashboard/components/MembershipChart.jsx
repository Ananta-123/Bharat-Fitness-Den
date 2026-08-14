import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#8B0000",
  "#F96B00",
  "#02045D",
  "#059669",
  "#7C3AED",
  "#0891B2",
];

const MembershipChart = ({
  data = [],
}) => {

  /*
   * Convert users into
   * active members by branch
   */
  const branchMap = {};

  data
    .filter(
      (user) =>
        user?.role === "user" &&
        user?.isActive === true &&
        user?.branchId
    )
    .forEach((user) => {

      const branchId =
        user.branchId?._id;

      const branchName =
        user.branchId?.branchName ||
        "Unknown Branch";

      if (!branchId) return;

      if (!branchMap[branchId]) {

        branchMap[branchId] = {
          _id: branchId,
          name: branchName,
          value: 0,
        };

      }

      branchMap[branchId].value += 1;

    });


  /*
   * Convert object into
   * Recharts array
   */
  const chartData =
    Object.values(branchMap).map(
      (item, index) => ({
        ...item,

        color:
          COLORS[
            index % COLORS.length
          ],
      })
    );


  /*
   * Total active members
   */
  const total =
    chartData.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );


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

      <div className="mb-6">

        <h2 className="
          text-xl
          font-bold
          text-gray-900
          dark:text-white
        ">
          Active Memberships
        </h2>

        <p className="
          mt-1
          text-sm
          text-gray-500
          dark:text-gray-400
        ">
          Active members by branch
        </p>

      </div>


      {/* Empty State */}

      {chartData.length === 0 ? (

        <div className="
          flex
          h-[300px]
          items-center
          justify-center
        ">

          <p className="
            text-sm
            text-gray-500
            dark:text-gray-400
          ">
            No active membership data available.
          </p>

        </div>

      ) : (

        <>

          {/* Pie Chart */}

          <div className="
            relative
            mx-auto
            h-[230px]
            w-full
          ">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  stroke="#ffffff"
                  strokeWidth={2}
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={
                          entry._id ||
                          index
                        }
                        fill={
                          entry.color
                        }
                      />

                    )
                  )}

                </Pie>


                <Tooltip
                  formatter={(value) => [
                    value,
                    "Active Members",
                  ]}
                  contentStyle={{
                    backgroundColor:
                      "#111827",
                    border:
                      "1px solid #374151",
                    borderRadius:
                      "12px",
                    color: "#fff",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>


            {/* Center Total */}

            <div className="
              pointer-events-none
              absolute
              inset-0
              flex
              items-center
              justify-center
            ">

              <div className="text-center">

                <p className="
                  text-3xl
                  font-bold
                  text-gray-900
                  dark:text-white
                ">
                  {total}
                </p>

                <p className="
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                ">
                  Active
                </p>

              </div>

            </div>

          </div>


          {/* Branch List */}

          <div className="
            mt-6
            space-y-3
          ">

            {chartData.map(
              (item) => (

                <div
                  key={item._id}
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <span
                      className="
                        h-3
                        w-3
                        rounded-full
                      "
                      style={{
                        background:
                          item.color,
                      }}
                    />

                    <span className="
                      text-sm
                      text-gray-700
                      dark:text-gray-300
                    ">
                      {item.name}
                    </span>

                  </div>


                  <span className="
                    font-semibold
                    text-gray-900
                    dark:text-white
                  ">
                    {item.value}
                  </span>

                </div>

              )
            )}

          </div>

        </>

      )}

    </motion.div>
  );
};

export default MembershipChart;