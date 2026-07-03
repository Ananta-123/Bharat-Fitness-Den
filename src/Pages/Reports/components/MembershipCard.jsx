import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { UserCheck, UserX, Users } from "lucide-react";

export default function MembershipCard({
  active = 0,
  expired = 0,
}) {
  const { theme } = useTheme();

  const total = active + expired;

  const activePercent =
    total === 0 ? 0 : Math.round((active / total) * 100);

  const expiredPercent =
    total === 0 ? 0 : Math.round((expired / total) * 100);

  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  const activeOffset =
    circumference - (activePercent / 100) * circumference;

  const expiredOffset =
    circumference - (expiredPercent / 100) * circumference;

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

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className={`text-xl font-semibold ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Membership Status
          </h2>

          <p
            className={`text-sm mt-1 ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Active vs expired memberships
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center">
          <Users
            size={24}
            className="text-green-500"
          />
        </div>
      </div>

      {/* Progress */}

      <div className="grid grid-cols-2 gap-6">

        {/* Active */}

        <div className="flex flex-col items-center">

          <div className="relative w-28 h-28">

            <svg
              className="w-28 h-28 rotate-[-90deg]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={
                  theme === "dark"
                    ? "#1F2937"
                    : "#E5E7EB"
                }
                strokeWidth="8"
              />

              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#22C55E"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={activeOffset}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3
                className={`text-2xl font-bold ${
                  theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {active}
              </h3>

              <span className="text-xs text-gray-500">
                {activePercent}%
              </span>
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2">
            <UserCheck
              size={18}
              className="text-green-500"
            />

            <span
              className={`font-medium ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              Active
            </span>
          </div>

        </div>

        {/* Expired */}

        <div className="flex flex-col items-center">

          <div className="relative w-28 h-28">

            <svg
              className="w-28 h-28 rotate-[-90deg]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={
                  theme === "dark"
                    ? "#1F2937"
                    : "#E5E7EB"
                }
                strokeWidth="8"
              />

              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#EF4444"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={expiredOffset}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3
                className={`text-2xl font-bold ${
                  theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {expired}
              </h3>

              <span className="text-xs text-gray-500">
                {expiredPercent}%
              </span>
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2">
            <UserX
              size={18}
              className="text-red-500"
            />

            <span
              className={`font-medium ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              Expired
            </span>
          </div>

        </div>

      </div>

      {/* Summary */}

      <div
        className={`mt-8 rounded-xl p-4 grid grid-cols-3 gap-3
        ${
          theme === "dark"
            ? "bg-[#161A2C]"
            : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Total
          </p>

          <h3
            className={`text-xl font-bold mt-1 ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {total}
          </h3>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Active
          </p>

          <h3 className="text-xl font-bold text-green-500 mt-1">
            {active}
          </h3>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Expired
          </p>

          <h3 className="text-xl font-bold text-red-500 mt-1">
            {expired}
          </h3>
        </div>
      </div>

      {/* Empty State */}

      {total === 0 && (
        <div
          className={`mt-6 rounded-xl border border-dashed p-4 text-center
          ${
            theme === "dark"
              ? "border-gray-700 text-gray-400"
              : "border-gray-300 text-gray-500"
          }`}
        >
          <p className="font-medium">
            No membership data available.
          </p>

          <p className="text-sm mt-1">
            Membership statistics will appear here once members are enrolled.
          </p>
        </div>
      )}
    </motion.div>
  );
}