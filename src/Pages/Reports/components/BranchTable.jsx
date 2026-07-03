import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Building2,
  Users,
  Database,
} from "lucide-react";

export default function BranchTable({ branches = [] }) {
  const { theme } = useTheme();

  const totalUsers = branches.reduce(
    (sum, item) => sum + item.totalUsers,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-2xl border overflow-hidden
      ${
        theme === "dark"
          ? "bg-[#10131F]/90 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}

      <div
        className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b
        ${
          theme === "dark"
            ? "border-gray-800"
            : "border-gray-200"
        }`}
      >
        <div>
          <h2
            className={`text-xl font-semibold flex items-center gap-2
            ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            <Database
              className="text-orange-500"
              size={22}
            />
            Branch Report
          </h2>

          <p
            className={`mt-1 text-sm
            ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Branch-wise member statistics
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div
            className={`px-4 py-2 rounded-xl text-sm font-semibold
            ${
              theme === "dark"
                ? "bg-[#161A2C] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {branches.length} Branches
          </div>

          <div
            className="px-4 py-2 rounded-xl text-sm font-semibold
            bg-orange-500 text-white"
          >
            {totalUsers} Users
          </div>

        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead
            className={
              theme === "dark"
                ? "bg-[#161A2C]"
                : "bg-gray-50"
            }
          >
            <tr>

              <th
                className={`px-6 py-4 text-left text-sm font-semibold
                ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                #
              </th>

              <th
                className={`px-6 py-4 text-left text-sm font-semibold
                ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Branch Name
              </th>

              <th
                className={`px-6 py-4 text-center text-sm font-semibold
                ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Total Users
              </th>

              <th
                className={`px-6 py-4 text-center text-sm font-semibold
                ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {branches.length > 0 ? (
              branches.map((branch, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(255,255,255,0.03)"
                        : "#F9FAFB",
                  }}
                  className={`border-b
                  ${
                    theme === "dark"
                      ? "border-gray-800"
                      : "border-gray-100"
                  }`}
                >
                  <td
                    className={`px-6 py-5
                    ${
                      theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-orange-500/15 flex items-center justify-center">
                        <Building2
                          className="text-orange-500"
                          size={20}
                        />
                      </div>

                      <div>

                        <h3
                          className={`font-semibold
                          ${
                            theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {branch.branchName}
                        </h3>

                        <p
                          className={`text-sm
                          ${
                            theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Fitness Branch
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <div className="inline-flex items-center gap-2">

                      <Users
                        size={17}
                        className="text-blue-500"
                      />

                      <span
                        className={`font-semibold
                        ${
                          theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {branch.totalUsers}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        branch.totalUsers > 0
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                    >
                      {branch.totalUsers > 0
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-16 text-center"
                >
                  <div className="flex flex-col items-center">

                    <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                      <Database
                        className="text-orange-500"
                        size={28}
                      />
                    </div>

                    <h3
                      className={`text-lg font-semibold
                      ${
                        theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      No Branch Reports
                    </h3>

                    <p
                      className={`mt-2 text-sm
                      ${
                        theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Branch statistics will appear here once data is available.
                    </p>

                  </div>
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      {branches.length > 0 && (
        <div
          className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-6 py-4 border-t
          ${
            theme === "dark"
              ? "border-gray-800 bg-[#161A2C]"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <p
            className={`text-sm
            ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Showing{" "}
            <span className="font-semibold">
              {branches.length}
            </span>{" "}
            branches
          </p>

          <p
            className={`text-sm
            ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Total Registered Users :{" "}
            <span className="font-bold text-orange-500">
              {totalUsers}
            </span>
          </p>
        </div>
      )}
    </motion.div>
  );
}