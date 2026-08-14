import {
  useEffect,
  useState,
} from "react";

import {
  User,
  Mail,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

import { getAllBranches } from "../../Api/branchApi.js";
import { getAllUsers } from "../../Api/userApi.js";


const ProfilePage = () => {

  /*
   * =====================================================
   * ADMIN BASIC INFORMATION
   * =====================================================
   *
   * These are still static because you have not provided
   * an admin profile API.
   *
   */

  const [admin, setAdmin] = useState({
    name: "Ananta Prasad",
    role: "Super Admin",
    email: "admin@bharatfitnessden.com",
  });


  /*
   * =====================================================
   * BRANCH DATA
   * =====================================================
   */

  const [branches, setBranches] =
    useState([]);


  /*
   * =====================================================
   * TOTAL MEMBERS
   * =====================================================
   */

  const [totalUsers, setTotalUsers] =
    useState(0);


  /*
   * =====================================================
   * LOADING
   * =====================================================
   */

  const [loading, setLoading] =
    useState(true);


  /*
   * =====================================================
   * ERROR
   * =====================================================
   */

  const [error, setError] =
    useState("");


  /*
   * =====================================================
   * FETCH BRANCHES + USERS
   * =====================================================
   */

  useEffect(() => {

    const fetchProfileData = async () => {

      try {

        setLoading(true);
        setError("");


        /*
         * Fetch both APIs together
         */

        const [
          branchesRes,
          usersRes,
        ] = await Promise.all([

          getAllBranches(),

          getAllUsers(),

        ]);


        console.log(
          "Branches:",
          branchesRes
        );

        console.log(
          "Users:",
          usersRes
        );


        /*
         * =================================================
         * GET BRANCHES
         * =================================================
         */

        const branchList =
          branchesRes?.branches || [];


        /*
         * =================================================
         * GET USERS
         * =================================================
         */

        const userList =
          usersRes?.users || [];


        /*
         * =================================================
         * ONLY NORMAL USERS
         * =================================================
         *
         * We don't count trainers/admins as members.
         */

        const members =
          userList.filter(
            (user) =>
              user?.role === "user"
          );


        /*
         * =================================================
         * TOTAL MEMBERS
         * =================================================
         */

        setTotalUsers(
          members.length
        );


        /*
         * =================================================
         * ACTIVE MEMBERS BY BRANCH
         * =================================================
         *
         * Result example:
         *
         * {
         *   "branchId1": 5,
         *   "branchId2": 10
         * }
         *
         */

        const activeMembersByBranch =
          {};


        members
          .filter(
            (user) =>
              user?.isActive === true
          )
          .forEach((user) => {

            /*
             * branchId from populated User API
             */

            const branchId =
              user?.branchId?._id;


            if (!branchId) {
              return;
            }


            if (
              !activeMembersByBranch[
                branchId
              ]
            ) {

              activeMembersByBranch[
                branchId
              ] = 0;

            }


            activeMembersByBranch[
              branchId
            ] += 1;

          });


        /*
         * =================================================
         * COMBINE BRANCH DATA + ACTIVE MEMBERS
         * =================================================
         *
         * Important:
         *
         * We use the Branch API as the source of truth
         * for the branch list.
         *
         * Therefore branches with ZERO active members
         * are also displayed.
         *
         */

        const branchData =
          branchList.map(
            (branch) => ({

              ...branch,

              activeMembers:
                activeMembersByBranch[
                  branch._id
                ] || 0,

            })
          );


        /*
         * Optional alphabetical sorting
         */

        branchData.sort(
          (a, b) =>
            (a?.branchName || "")
              .localeCompare(
                b?.branchName || ""
              )
        );


        setBranches(
          branchData
        );

      } catch (error) {

        console.error(
          "Profile Data Error:",
          error
        );


        setError(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load profile data"
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProfileData();

  }, []);


  return (

    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

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


      {/* =========================
          PROFILE CARD
      ========================= */}

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
            flex-col
            lg:flex-row
            gap-8
            items-start
          "
        >

          {/* =========================
              PROFILE IMAGE
          ========================= */}

          <div
            className="
              h-28
              w-28
              rounded-full
              bg-gradient-to-r
              from-[#8B0000]
              to-[#F96B00]
              flex
              items-center
              justify-center
              text-white
              text-4xl
              font-bold
              shadow-lg
            "
          >
            {admin.name
              ?.charAt(0)
              ?.toUpperCase() || "A"}
          </div>


          {/* =========================
              INFO
          ========================= */}

          <div className="flex-1">

            <div
              className="
                flex
                flex-col
                md:flex-row
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
                  px-4
                  py-2
                  text-[#F96B00]
                  font-semibold
                "
              >

                <ShieldCheck size={18} />

                {admin.role}

              </div>

            </div>


            {/* =========================
                INFO GRID
            ========================= */}

            <div
              className="
                mt-8
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
              "
            >

              {/* =========================
                  EMAIL
              ========================= */}

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
                    className="text-[#F96B00]"
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
                    break-all
                  "
                >
                  {admin.email}
                </h3>

              </div>


              {/* =========================
                  TOTAL BRANCHES
              ========================= */}

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
                    className="text-[#F96B00]"
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
                  {loading
                    ? "..."
                    : branches.length}
                </h3>

              </div>


              {/* =========================
                  TOTAL MEMBERS
              ========================= */}

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
                    className="text-[#F96B00]"
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
                  {loading
                    ? "..."
                    : totalUsers.toLocaleString(
                        "en-IN"
                      )}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </motion.div>


      {/* =========================
          BRANCH SECTION
      ========================= */}

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
            flex
            items-center
            justify-between
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
              Active member distribution across all gym
              branches
            </p>

          </div>

        </div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (

          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
              dark:border-red-500/20
              dark:bg-red-500/10
              dark:text-red-400
            "
          >
            {error}
          </div>

        )}


        {/* =========================
            BRANCH LIST
        ========================= */}

        <div className="mt-8 space-y-4">

          {loading ? (

            /*
             * Loading state
             * Same layout as actual branch cards
             */

            [1, 2, 3].map(
              (item) => (

                <div
                  key={item}
                  className="
                    flex
                    flex-col
                    md:flex-row
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
                    animate-pulse
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        h-12
                        w-12
                        rounded-2xl
                        bg-gray-200
                        dark:bg-white/10
                      "
                    />

                    <div>

                      <div
                        className="
                          h-5
                          w-40
                          rounded
                          bg-gray-200
                          dark:bg-white/10
                        "
                      />

                      <div
                        className="
                          mt-2
                          h-4
                          w-28
                          rounded
                          bg-gray-200
                          dark:bg-white/10
                        "
                      />

                    </div>

                  </div>


                  <div
                    className="
                      h-10
                      w-32
                      rounded-2xl
                      bg-gray-200
                      dark:bg-white/10
                    "
                  />

                </div>

              )
            )

          ) : branches.length === 0 ? (

            <div
              className="
                py-12
                text-center
              "
            >

              <Building2
                size={40}
                className="
                  mx-auto
                  text-gray-400
                "
              />

              <p
                className="
                  mt-4
                  font-semibold
                  text-gray-700
                  dark:text-white
                "
              >
                No branches found
              </p>

            </div>

          ) : (

            branches.map(
              (branch, index) => (

                <motion.div
                  key={branch._id}
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    flex
                    flex-col
                    md:flex-row
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
                    transition-all
                    duration-300
                  "
                >

                  {/* =========================
                      LEFT
                  ========================= */}

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        h-12
                        w-12
                        rounded-2xl
                        bg-gradient-to-r
                        from-[#8B0000]
                        to-[#F96B00]
                        flex
                        items-center
                        justify-center
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
                        {branch.branchName ||
                          "Unknown Branch"}
                      </h3>


                      <p
                        className="
                          text-sm
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        {branch.status
                          ? "Active Gym Branch"
                          : "Inactive Gym Branch"}
                      </p>

                    </div>

                  </div>


                  {/* =========================
                      RIGHT
                  ========================= */}

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-2xl
                      bg-[#F96B00]/10
                      px-4
                      py-2
                      text-[#F96B00]
                      font-semibold
                    "
                  >

                    <Users size={18} />

                    {branch.activeMembers || 0} Active Members

                  </div>

                </motion.div>

              )
            )

          )}

        </div>

      </motion.div>

    </div>

  );

};


export default ProfilePage;