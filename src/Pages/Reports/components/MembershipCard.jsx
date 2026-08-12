import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import {
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

export default function MembershipCard({
  active = 0,
  expired = 0,
  analytics = [],
}) {
  const { theme } = useTheme();

  const total = analytics.length
    ? analytics.reduce(
        (sum, item) =>
          sum + Number(item.count || 0),
        0
      )
    : active + expired;

  const activePercent =
    total > 0
      ? Math.round((active / total) * 100)
      : 0;

  const expiredPercent =
    total > 0
      ? Math.round((expired / total) * 100)
      : 0;

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500";

      case "expired":
        return "bg-red-500";

      case "cancelled":
        return "bg-yellow-500";

      case "pending":
        return "bg-blue-500";

      default:
        return "bg-purple-500";
    }
  };

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
        mb-7
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
            Membership Status
          </h2>

          <p
            className={`
              text-sm
              mt-1
              ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            Current subscription distribution
          </p>
        </div>

        <div className="
          w-12
          h-12
          rounded-xl
          bg-green-500/15
          flex
          items-center
          justify-center
        ">
          <Users
            size={24}
            className="text-green-500"
          />
        </div>
      </div>

      {/* Main Stats */}
      <div className="
        grid
        grid-cols-2
        gap-5
      ">
        {/* Active */}
        <div
          className={`
            rounded-xl
            p-5
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
            justify-between
          ">
            <UserCheck
              className="text-green-500"
              size={22}
            />

            <span className="
              text-xs
              font-semibold
              text-green-500
            ">
              {activePercent}%
            </span>
          </div>

          <h3
            className={`
              text-3xl
              font-bold
              mt-5
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            {active}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Active
          </p>
        </div>

        {/* Expired */}
        <div
          className={`
            rounded-xl
            p-5
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
            justify-between
          ">
            <UserX
              className="text-red-500"
              size={22}
            />

            <span className="
              text-xs
              font-semibold
              text-red-500
            ">
              {expiredPercent}%
            </span>
          </div>

          <h3
            className={`
              text-3xl
              font-bold
              mt-5
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            {expired}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Expired
          </p>
        </div>
      </div>

      {/* All statuses */}
      <div className="mt-6">
        <div className="
          flex
          items-center
          justify-between
          mb-3
        ">
          <p className="
            text-sm
            font-semibold
            text-gray-500
          ">
            All Subscription Statuses
          </p>

          <span className="
            text-sm
            font-bold
            text-orange-500
          ">
            {total}
          </span>
        </div>

        <div className="space-y-3">
          {analytics.length > 0 ? (
            analytics.map((item) => {
              const count = Number(
                item.count || 0
              );

              const percentage =
                total > 0
                  ? Math.round(
                      (count / total) * 100
                    )
                  : 0;

              return (
                <div
                  key={item._id}
                  className="space-y-1"
                >
                  <div className="
                    flex
                    items-center
                    justify-between
                    text-sm
                  ">
                    <div className="
                      flex
                      items-center
                      gap-2
                    ">
                      <span
                        className={`
                          w-2.5
                          h-2.5
                          rounded-full
                          ${getStatusClass(item._id)}
                        `}
                      />

                      <span
                        className={
                          theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                      >
                        {item._id || "Unknown"}
                      </span>
                    </div>

                    <span className="
                      font-semibold
                      text-gray-500
                    ">
                      {count}
                    </span>
                  </div>

                  <div className="
                    h-2
                    rounded-full
                    bg-gray-200
                    dark:bg-gray-800
                    overflow-hidden
                  ">
                    <div
                      className={`
                        h-full
                        rounded-full
                        ${getStatusClass(item._id)}
                      `}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="
              text-sm
              text-gray-500
              text-center
              py-4
            ">
              No membership analytics available.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}