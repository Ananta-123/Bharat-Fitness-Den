import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDashboardAnalytics,
  getRevenueAnalytics,
  getMembersAnalytics,
  getWorkoutAnalytics,
  getUserStatusCount,
} from "../../../Api/dashboardApi.js";

import { getAllUsers } from "../../../Api/userApi.js";
import {
  getAllTrainers,
} from "../../../Api/trainerApi.js";


const useDashboard = () => {

  const [dashboard, setDashboard] =
    useState(null);

  const [revenue, setRevenue] =
    useState([]);

  const [members, setMembers] =
    useState([]);

  const [trainers, setTrainers] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [userStatus, setUserStatus] =
    useState(null);


  const fetchDashboard = useCallback(
    async () => {

      try {

        setLoading(true);
        setError("");


        /*
         * =====================================================
         * FETCH ALL DASHBOARD APIs
         * =====================================================
         *
         * Promise.allSettled is used so that if one API
         * returns 429/500/etc., the other APIs can still
         * provide their data.
         *
         */

        const results =
          await Promise.allSettled([

            getDashboardAnalytics(),

            getRevenueAnalytics(),

            getMembersAnalytics(),

            getUserStatusCount(),

            getAllUsers(),

            getAllTrainers(),

          ]);


        /*
         * =====================================================
         * GET INDIVIDUAL RESULTS
         * =====================================================
         */

        const [
          dashboardResult,
          revenueResult,
          membersResult,
          statusResult,
          usersResult,
          trainersResult,
        ] = results;


        /*
         * =====================================================
         * LOG API RESULTS
         * =====================================================
         */

        console.log(
          "Dashboard Result:",
          dashboardResult
        );

        console.log(
          "Revenue Result:",
          revenueResult
        );

        console.log(
          "Members Result:",
          membersResult
        );

        // console.log(
        //   "Workout Result:",
        //   workoutResult
        // );

        console.log(
          "User Status Result:",
          statusResult
        );

        console.log(
          "Users Result:",
          usersResult
        );


        /*
         * =====================================================
         * DASHBOARD
         * =====================================================
         */

        if (
          dashboardResult.status ===
          "fulfilled"
        ) {

          const dashboardRes =
            dashboardResult.value;

          console.log(
            "Dashboard:",
            dashboardRes
          );


          if (dashboardRes?.success) {

            setDashboard(
              dashboardRes?.data || {}
            );

          } else {

            console.error(
              "Dashboard API Error:",
              dashboardRes?.message
            );

            setDashboard({});

          }

        } else {

          console.error(
            "Dashboard Request Failed:",
            dashboardResult.reason
          );

          setDashboard({});

        }


        /*
         * =====================================================
         * REVENUE
         * =====================================================
         */

        if (
          revenueResult.status ===
          "fulfilled"
        ) {

          const revenueRes =
            revenueResult.value;

          console.log(
            "Revenue:",
            revenueRes
          );


          setRevenue(
            revenueRes?.report || []
          );

        } else {

          console.error(
            "Revenue Request Failed:",
            revenueResult.reason
          );

          setRevenue([]);

        }


        /*
         * =====================================================
         * MEMBERS BY BRANCH
         * =====================================================
         */

        if (
          membersResult.status ===
          "fulfilled"
        ) {

          const membersRes =
            membersResult.value;

          console.log(
            "Members:",
            membersRes
          );


          setMembers(
            membersRes?.report || []
          );

        } else {

          console.error(
            "Members Request Failed:",
            membersResult.reason
          );

          setMembers([]);

        }


        /*
         * =====================================================
         * TRAINER
         * =====================================================
         */

        if (
          trainersResult.status ===
          "fulfilled"
        ) {

          const trainersRes =
            trainersResult.value;

          console.log(
            "Trainers:",
            trainersRes
          );

          setTrainers(
            trainersRes?.trainers || []
          );

        } else {

          console.error(
            "Trainers Request Failed:",
            trainersResult.reason
          );

          setTrainers([]);

        }


        /*
         * =====================================================
         * USER STATUS
         * =====================================================
         */

        if (
          statusResult.status ===
          "fulfilled"
        ) {

          const statusRes =
            statusResult.value;

          console.log(
            "User Status:",
            statusRes
          );


          setUserStatus(
            statusRes?.data || {}
          );

        } else {

          console.error(
            "User Status Request Failed:",
            statusResult.reason
          );

          setUserStatus({});

        }


        /*
         * =====================================================
         * USERS
         * =====================================================
         *
         * This data is now used by MembershipChart.
         *
         * MembershipChart receives:
         *
         * <MembershipChart data={users} />
         *
         */

        if (
          usersResult.status ===
          "fulfilled"
        ) {

          const usersRes =
            usersResult.value;

          console.log(
            "Users:",
            usersRes
          );


          setUsers(
            usersRes?.users || []
          );

        } else {

          console.error(
            "Users Request Failed:",
            usersResult.reason
          );

          setUsers([]);

        }


      } catch (error) {

        /*
         * =====================================================
         * UNEXPECTED ERROR
         * =====================================================
         */

        console.error(
          "Dashboard Error:",
          error
        );


        setError(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load dashboard"
        );


      } finally {

        setLoading(false);

      }

    },
    []
  );


  /*
   * =====================================================
   * INITIAL DASHBOARD LOAD
   * =====================================================
   */

  useEffect(() => {

    fetchDashboard();

  }, [fetchDashboard]);


  /*
   * =====================================================
   * RETURN DASHBOARD DATA
   * =====================================================
   */

  return {

    dashboard,

    userStatus,

    revenue,

    members,

    users,

    trainers,

    loading,

    error,

    refetch:
      fetchDashboard,

  };

};


export default useDashboard;