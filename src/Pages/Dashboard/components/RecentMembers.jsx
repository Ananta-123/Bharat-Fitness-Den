import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

import { getRecentMembers } from "../../../Api/dashboardApi";

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400";

    case "Pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";

    case "Inactive":
      return "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400";

    default:
      return "bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300";
  }
};

const formatJoinedDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const getMembershipName = (subscription) => {
  if (!subscription) {
    return "No Plan";
  }

  return (
    subscription.name ||
    subscription.planName ||
    subscription.title ||
    "Subscription"
  );
};

const getMemberStatus = (isActive) => {
  return isActive
    ? "Active"
    : "Inactive";
};

const RecentMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const response =
          await getRecentMembers(5);

        console.log(
          "Recent Members API:",
          response
        );

        setMembers(
          response?.data || []
        );

      } catch (error) {
        console.error(
          "Failed to fetch recent members:",
          error
        );

        setMembers([]);

      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div
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
            <div className="mb-2 h-6 w-40 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />

            <div className="h-4 w-56 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
          </div>

          <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-300 dark:bg-zinc-700" />
        </div>

        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="mb-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300 dark:bg-zinc-700" />

              <div>
                <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />

                <div className="h-3 w-24 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
              </div>
            </div>

            <div className="h-6 w-20 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
          </div>
        ))}
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
      {/* HEADER */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Members
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Newly joined gym members
          </p>
        </div>

        <div className="rounded-xl bg-[#F96B00]/10 p-3">
          <UserPlus
            size={20}
            className="text-[#F96B00]"
          />
        </div>
      </div>

      {/* EMPTY STATE */}

      {members.length === 0 ? (
        <div className="py-16 text-center">
          <UserPlus
            size={55}
            className="mx-auto mb-4 text-gray-400"
          />

          <p className="text-lg font-semibold text-gray-700 dark:text-white">
            No Members Found
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            New members will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {members.map(
            (member, index) => {
              const status =
                getMemberStatus(
                  member.isActive
                );

              const membership =
                getMembershipName(
                  member.subscriptionPlanId
                );

              return (
                <motion.div
                  key={
                    member._id ||
                    index
                  }
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                  }}
                  whileHover={{
                    x: 6,
                  }}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-transparent
                    p-3
                    transition-all
                    hover:border-[#F96B00]/30
                    hover:bg-gray-50
                    dark:hover:bg-[#151A2F]
                  "
                >
                  {/* LEFT */}

                  <div className="flex items-center gap-4">
                    {/* Avatar */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-[#8B0000]
                        to-[#F96B00]
                        font-semibold
                        text-white
                      "
                    >
                      {(member.fullName ||
                        "User")
                        .split(" ")
                        .map(
                          (name) =>
                            name[0]
                        )
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    {/* MEMBER INFO */}

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {member.fullName ||
                          "Unknown User"}
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {member.email ||
                          member.mobile ||
                          "No contact"}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        {/* Membership */}

                        <span>
                          {membership}
                        </span>

                        <span>
                          •
                        </span>

                        {/* Joined */}

                        <span>
                          {formatJoinedDate(
                            member.createdAt
                          )}
                        </span>

                        {member.branchId
                          ?.branchName && (
                          <>
                            <span>
                              •
                            </span>

                            <span>
                              {
                                member
                                  .branchId
                                  .branchName
                              }
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* STATUS */}

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      ${getStatusColor(
                        status
                      )}
                    `}
                  >
                    {status}
                  </span>
                </motion.div>
              );
            }
          )}
        </div>
      )}
    </motion.div>
  );
};

export default RecentMembers;