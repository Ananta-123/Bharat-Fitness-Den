import { motion } from "framer-motion";
import {
  UserPlus,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import {
  getRecentMembers,
} from "../../../Api/dashboardApi";

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "N/A";
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const getInitials = (name) => {
  if (!name) return "U";

  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const RecentMembers = () => {
  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchMembers =
      async () => {
        try {
          setLoading(true);

          const response =
            await getRecentMembers(5);

          console.log(
            "Recent Members:",
            response
          );

          setMembers(
            response?.data ||
              response?.users ||
              response?.members ||
              []
          );
        } catch (error) {
          console.error(
            "Recent Members Error:",
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
        <div className="mb-8">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />

          <div className="mt-2 h-4 w-52 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
        </div>

        <div className="space-y-5">
          {[1, 2, 3, 4, 5].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300 dark:bg-zinc-700" />

                <div className="flex-1">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />

                  <div className="mt-2 h-3 w-44 animate-pulse rounded bg-gray-300 dark:bg-zinc-700" />
                </div>
              </div>
            )
          )}
        </div>
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
            Recent Members
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Newly registered members
          </p>
        </div>

        <div className="rounded-xl bg-[#F96B00]/10 p-3">
          <UserPlus
            size={20}
            className="text-[#F96B00]"
          />
        </div>
      </div>

      {members.length === 0 ? (
        <div className="py-14 text-center">
          <UserPlus
            size={45}
            className="mx-auto text-gray-400"
          />

          <p className="mt-4 font-semibold text-gray-700 dark:text-white">
            No Recent Members
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            New members will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {members.map(
            (member, index) => (
              <motion.div
                key={
                  member?._id ||
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
                    index * 0.07,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  p-2
                  transition
                  hover:bg-gray-50
                  dark:hover:bg-[#151A2F]
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#8B0000]
                    to-[#F96B00]
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {getInitials(
                    member?.fullName
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="truncate font-semibold text-gray-900 dark:text-white">
                    {member?.fullName ||
                      "Unknown User"}
                  </h4>

                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {member?.email ||
                      member?.mobile ||
                      "No contact"}
                  </p>

                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Joined{" "}
                    {formatDate(
                      member?.createdAt
                    )}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </motion.div>
  );
};

export default RecentMembers;