import {
  User,
  Mail,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

const ProfilePage = () => {
  // DEMO ADMIN DATA
  const admin = {
    name: "Ananta Prasad",
    role: "Super Admin",
    email: "admin@bharatfitnessden.com",
    totalBranches: 4,
    totalUsers: 2847,

    branches: [
      {
        name: "Bhubaneswar Branch",
        users: 842,
      },
      {
        name: "Cuttack Branch",
        users: 621,
      },
      {
        name: "Puri Branch",
        users: 488,
      },
      {
        name: "Sambalpur Branch",
        users: 896,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1
          className="
            text-3xl
            font-bold

            text-gray-900
            dark:text-white
          "
        >
          Admin Profile
        </h1>

        <p
          className="
            mt-2

            text-gray-600
            dark:text-gray-400
          "
        >
          Manage administrator information and
          branch overview
        </p>
      </div>

      {/* PROFILE CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-3xl

          border
          border-gray-200
          dark:border-white/10

          bg-white
          dark:bg-[#0B1020]

          p-6 md:p-8

          shadow-lg
          shadow-black/5
          dark:shadow-black/30
        "
      >
        <div
          className="
            flex
            flex-col lg:flex-row
            gap-8
            items-start
          "
        >
          {/* PROFILE IMAGE */}
          <div
            className="
              h-28 w-28

              rounded-full

              bg-gradient-to-r
              from-[#8B0000]
              to-[#F96B00]

              flex items-center justify-center

              text-white
              text-4xl
              font-bold

              shadow-lg
            "
          >
            A
          </div>

          {/* INFO */}
          <div className="flex-1">
            <div
              className="
                flex
                flex-col md:flex-row
                md:items-center
                md:justify-between
                gap-4
              "
            >
              <div>
                <h2
                  className="
                    text-3xl
                    font-bold

                    text-gray-900
                    dark:text-white
                  "
                >
                  {admin.name}
                </h2>

                <p
                  className="
                    mt-2

                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  Bharat Fitness Den Administrator
                </p>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-2xl

                  bg-[#F96B00]/10

                  px-4 py-2

                  text-[#F96B00]
                  font-semibold
                "
              >
                <ShieldCheck size={18} />

                {admin.role}
              </div>
            </div>

            {/* INFO GRID */}
            <div
              className="
                mt-8

                grid
                grid-cols-1
                md:grid-cols-3

                gap-4
              "
            >
              {/* EMAIL */}
              <div
                className="
                  rounded-2xl

                  border
                  border-gray-200
                  dark:border-white/10

                  bg-gray-50
                  dark:bg-white/[0.03]

                  p-5
                "
              >
                <div className="flex items-center gap-3">
                  <Mail
                    className="
                      text-[#F96B00]
                    "
                    size={20}
                  />

                  <p
                    className="
                      text-sm
                      font-medium

                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Admin Email
                  </p>
                </div>

                <h3
                  className="
                    mt-4

                    text-lg
                    font-semibold

                    text-gray-900
                    dark:text-white
                  "
                >
                  {admin.email}
                </h3>
              </div>

              {/* BRANCHES */}
              <div
                className="
                  rounded-2xl

                  border
                  border-gray-200
                  dark:border-white/10

                  bg-gray-50
                  dark:bg-white/[0.03]

                  p-5
                "
              >
                <div className="flex items-center gap-3">
                  <Building2
                    className="
                      text-[#F96B00]
                    "
                    size={20}
                  />

                  <p
                    className="
                      text-sm
                      font-medium

                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Total Branches
                  </p>
                </div>

                <h3
                  className="
                    mt-4

                    text-3xl
                    font-bold

                    text-gray-900
                    dark:text-white
                  "
                >
                  {admin.totalBranches}
                </h3>
              </div>

              {/* USERS */}
              <div
                className="
                  rounded-2xl

                  border
                  border-gray-200
                  dark:border-white/10

                  bg-gray-50
                  dark:bg-white/[0.03]

                  p-5
                "
              >
                <div className="flex items-center gap-3">
                  <Users
                    className="
                      text-[#F96B00]
                    "
                    size={20}
                  />

                  <p
                    className="
                      text-sm
                      font-medium

                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Total Members
                  </p>
                </div>

                <h3
                  className="
                    mt-4

                    text-3xl
                    font-bold

                    text-gray-900
                    dark:text-white
                  "
                >
                  {admin.totalUsers}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BRANCH SECTION */}
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
          delay: 0.1,
        }}
        className="
          rounded-3xl

          border
          border-gray-200
          dark:border-white/10

          bg-white
          dark:bg-[#0B1020]

          p-6

          shadow-lg
          shadow-black/5
          dark:shadow-black/30
        "
      >
        <div
          className="
            flex items-center justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold

                text-gray-900
                dark:text-white
              "
            >
              Branch Overview
            </h2>

            <p
              className="
                mt-1

                text-gray-600
                dark:text-gray-400
              "
            >
              User distribution across all gym
              branches
            </p>
          </div>
        </div>

        {/* BRANCH LIST */}
        <div className="mt-8 space-y-4">
          {admin.branches.map(
            (branch, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -2,
                }}
                className="
                  flex
                  flex-col md:flex-row
                  md:items-center
                  md:justify-between

                  gap-4

                  rounded-2xl

                  border
                  border-gray-200
                  dark:border-white/10

                  bg-gray-50
                  dark:bg-white/[0.03]

                  p-5

                  transition-all duration-300
                "
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                      h-12 w-12

                      rounded-2xl

                      bg-gradient-to-r
                      from-[#8B0000]
                      to-[#F96B00]

                      flex items-center justify-center
                    "
                  >
                    <Building2
                      size={22}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold

                        text-gray-900
                        dark:text-white
                      "
                    >
                      {branch.name}
                    </h3>

                    <p
                      className="
                        text-sm

                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Active Gym Branch
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-2xl

                    bg-[#F96B00]/10

                    px-4 py-2

                    text-[#F96B00]
                    font-semibold
                  "
                >
                  <Users size={18} />

                  {branch.users} Members
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;