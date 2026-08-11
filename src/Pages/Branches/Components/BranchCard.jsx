import { useState } from "react";
import { motion } from "framer-motion";

import {
  Building2,
  MapPin,
  Users,
  Activity,
  DollarSign,
  Phone,
  Clock3,
  Trash2,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import BranchMiniChart from "./BranchMiniChart";
import UpdateBranchModal from "./UpdateBranchModal.jsx";

import { deleteBranch } from "../../../Api/branchApi.js";

const BranchCard = ({
  branch,
  onBranchUpdate,
  onBranchDelete,
}) => {
  const [openModal, setOpenModal] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  // ==========================================
  // UPDATE BRANCH
  // ==========================================
  // UpdateBranchModal already calls the API.
  // Here we only receive the updated branch
  // and update the parent React state.

  const handleUpdateBranch = (updatedBranch) => {
    if (!updatedBranch) return;

    console.log(
      "Updated Branch:",
      updatedBranch
    );

    if (onBranchUpdate) {
      onBranchUpdate(updatedBranch);
    }

    setOpenModal(false);
  };

  // ==========================================
  // DELETE BRANCH
  // ==========================================

  const handleDeleteBranch = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);

      const response =
        await deleteBranch(branch._id);

      console.log(
        "Deleted Branch:",
        response
      );

      if (onBranchDelete) {
        onBranchDelete(branch._id);
      }
    } catch (error) {
      console.error(
        "Delete Branch Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete branch"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{
          y: -4,
        }}
        className="
          rounded-3xl
          p-6
          bg-white
          dark:bg-[#050816]
          border
          border-gray-200
          dark:border-orange-500/20
          shadow-sm
          dark:shadow-none
          transition-all
        "
      >
        {/* ==========================================
            TOP
        ========================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* Branch Information */}

          <div className="flex gap-4 min-w-0">
            <div
              className="
                h-14
                w-14
                shrink-0
                rounded-2xl
                flex
                items-center
                justify-center
                bg-orange-100
                dark:bg-orange-500/10
              "
            >
              <Building2
                className="text-orange-500"
                size={26}
              />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  text-2xl
                  font-bold
                  text-gray-900
                  dark:text-white
                  break-words
                "
              >
                {branch.branchName}
              </h2>

              <div
                className="
                  flex
                  items-start
                  gap-2
                  mt-1
                  text-gray-500
                  dark:text-gray-400
                  text-sm
                "
              >
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <span className="break-words">
                  {branch.address}
                </span>
              </div>
            </div>
          </div>

          {/* Status */}

          <StatusBadge
            status={
              branch.status
                ? "active"
                : "inactive"
            }
          />
        </div>

        {/* ==========================================
            STATS
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-4
            mt-6
          "
        >
          {/* MEMBERS */}

          <div
            className="
              rounded-2xl
              p-4
              bg-gray-100
              dark:bg-[#0B1023]
            "
          >
            <Users
              size={18}
              className="text-lime-400 mb-2"
            />

            <h3
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {branch.totalUsers ?? 0}
            </h3>

            <p
              className="
                text-gray-500
                dark:text-gray-400
                text-sm
              "
            >
              Members
            </p>
          </div>

          {/* TRAINERS */}

          <div
            className="
              rounded-2xl
              p-4
              bg-gray-100
              dark:bg-[#0B1023]
            "
          >
            <Activity
              size={18}
              className="text-orange-400 mb-2"
            />

            <h3
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {branch.totalTrainers ?? 0}
            </h3>

            <p
              className="
                text-gray-500
                dark:text-gray-400
                text-sm
              "
            >
              Trainers
            </p>
          </div>

          {/* REVENUE */}

          {/* <div
            className="
              rounded-2xl
              p-4
              bg-gray-100
              dark:bg-[#0B1023]
            "
          >
            <DollarSign
              size={18}
              className="text-green-400 mb-2"
            />

            <h3
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              ₹0
            </h3>

            <p
              className="
                text-gray-500
                dark:text-gray-400
                text-sm
              "
            >
              Revenue
            </p>
          </div> */}
        </div>

        {/* ==========================================
            CAPACITY
        ========================================== */}

        <div className="mt-6">
          <div
            className="
              flex
              items-center
              justify-between
              mb-2
            "
          >
            <p
              className="
                text-gray-500
                dark:text-gray-400
              "
            >
              Capacity Usage
            </p>

            <p
              className="
                font-semibold
                text-orange-500
              "
            >
              60%
            </p>
          </div>

          <div
            className="
              h-2
              rounded-full
              bg-gray-200
              dark:bg-white/10
              overflow-hidden
            "
          >
            <div
              style={{
                width: "60%",
              }}
              className="
                h-full
                rounded-full
                bg-orange-500
              "
            />
          </div>
        </div>

        {/* ==========================================
            MINI CHART
        ========================================== */}

        {/* <BranchMiniChart
          chartData={[
            20,
            45,
            30,
            60,
            40,
          ]}
        /> */}

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div
          className="
            mt-8
            pt-5
            border-t
            border-gray-200
            dark:border-white/10
          "
        >
          {/* Contact Information */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            {/* PHONE */}

            <div className="flex items-center gap-2">
              <Phone size={15} />

              <span>
                {branch.phone || "No phone"}
              </span>
            </div>

            {/* EMAIL */}

            {branch.email && (
              <div className="flex items-center gap-2">
                <span className="truncate max-w-[220px]">
                  {branch.email}
                </span>
              </div>
            )}

            {/* TIMING */}

            <div className="flex items-center gap-2">
              <Clock3 size={15} />

              <span>
                6AM - 10PM
              </span>
            </div>
          </div>

          {/* ==========================================
              BUTTONS
          ========================================== */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              mt-5
            "
          >
            {/* MANAGE / UPDATE */}

            <button
              type="button"
              onClick={() =>
                setOpenModal(true)
              }
              className="
                flex-1
                py-3
                rounded-2xl
                font-semibold
                text-white
                bg-gradient-to-r
                from-[#8B0000]
                to-[#F96B00]
                hover:scale-[1.01]
                transition-all
              "
            >
              Manage
            </button>

            {/* ANALYTICS */}

            {/* <button
              type="button"
              className="
                flex-1
                py-3
                rounded-2xl
                border
                border-gray-200
                dark:border-orange-500/20
                bg-gray-100
                dark:bg-[#0B1023]
                font-semibold
                text-gray-900
                dark:text-white
                hover:bg-gray-200
                dark:hover:bg-[#111831]
                transition-all
              "
            >
              Analytics
            </button> */}

            {/* DELETE */}

            <button
              type="button"
              onClick={
                handleDeleteBranch
              }
              disabled={deleteLoading}
              className="
                h-12
                w-full
                sm:w-12
                shrink-0
                rounded-2xl
                flex
                items-center
                justify-center
                border
                border-red-200
                dark:border-red-500/20
                bg-red-50
                dark:bg-red-500/10
                text-red-500
                hover:bg-red-100
                dark:hover:bg-red-500/20
                hover:scale-105
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {deleteLoading ? (
                <span className="text-xs font-semibold">
                  ...
                </span>
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          UPDATE BRANCH MODAL
      ========================================== */}

      <UpdateBranchModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        branch={branch}
        onUpdate={
          handleUpdateBranch
        }
      />
    </>
  );
};

export default BranchCard;

