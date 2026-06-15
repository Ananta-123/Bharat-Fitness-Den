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
  Trash2
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import BranchMiniChart from "./BranchMiniChart";

import UpdateBranchModal from "./UpdateBranchModal.jsx";
import { updateBranch, deleteBranch } from "../../../Api/branchApi.js";

const BranchCard = ({ branch, onBranchUpdate, onBranchDelete,}) => {

  const [openModal, setOpenModal] = useState(false);

  const handleUpdateBranch =
  async (updatedData) => {
    try {
      const response =
        await updateBranch(
          branch._id,
          updatedData
        );

      console.log(response);

      // UPDATE REACT STATE

      onBranchUpdate(
        response.branch
      );

      // CLOSE MODAL

      setOpenModal(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBranch =
  async () => {
    try {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this branch?"
        );

      if (!confirmDelete)
        return;

      const response =
        await deleteBranch(
          branch._id
        );

      console.log(response);

      // UPDATE UI

      onBranchDelete(
        branch._id
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      {/* TOP */}

      <div
        className="
          flex items-start
          justify-between
          gap-4
        "
      >
        <div className="flex gap-4">
          <div
            className="
              h-14 w-14
              rounded-2xl
              flex items-center justify-center

              bg-orange-100
              dark:bg-orange-500/10
            "
          >
            <Building2
              className="
                text-orange-500
              "
            />
          </div>

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {branch.branchName}
            </h2>

            <div
              className="
                flex items-center gap-2
                mt-1
                text-gray-500
                dark:text-gray-400
              "
            >
              <MapPin size={15} />

              {branch.address}
            </div>
          </div>
        </div>

        <StatusBadge
          status={
            branch.status
              ? "active"
              : "inactive"
          }
        />
      </div>

      {/* STATS */}

      <div
        className="
          grid grid-cols-3
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
              dark:text-white
            "
          >
            {branch.totalUsers}
          </h3>

          <p className="text-gray-400 text-sm">
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
              dark:text-white
            "
          >
            {branch.totalTrainers}
          </h3>

          <p className="text-gray-400 text-sm">
            Trainers
          </p>
        </div>

        {/* REVENUE */}

        <div
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
              dark:text-white
            "
          >
            $0
          </h3>

          <p className="text-gray-400 text-sm">
            Revenue
          </p>
        </div>
      </div>

      {/* CAPACITY */}

      <div className="mt-6">
        <div
          className="
            flex items-center
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
              width: `60%`,
            }}
            className="
              h-full
              rounded-full
              bg-orange-500
            "
          />
        </div>
      </div>

      {/* MINI CHART */}

      <BranchMiniChart
        chartData={[
          20, 45, 30, 60, 40,
        ]}
      />

      {/* FOOTER */}

      <div
        className="
          mt-8
          pt-5
          border-t
          border-gray-200
          dark:border-white/10
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          {/* PHONE */}

          <div className="flex items-center gap-2">
            <Phone size={15} />

            {branch.phone}
          </div>

          {/* TIMING */}

          <div className="flex items-center gap-2">
            <Clock3 size={15} />

            6AM - 10PM
          </div>
        </div>

        {/* BUTTONS */}

        <div
          className="
            flex gap-4
            mt-5
          "
        >
          <button
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
    from-orange-500
    to-orange-400

    hover:scale-[1.01]
    transition-all
  "
>
  Manage
</button>

          <button
            className="
              px-6
              rounded-2xl
              border
              border-gray-200
              dark:border-orange-500/20

              bg-gray-100
              dark:bg-[#0B1023]

              font-semibold
              dark:text-white
            "
          >
            Analytics
          </button>
          <button
    onClick={
      handleDeleteBranch
    }
    className="
      h-12
      w-12

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

      hover:scale-105

      transition-all
    "
  >
    <Trash2 size={18} />
  </button>
        </div>
      </div>
      <UpdateBranchModal
  isOpen={openModal}
  onClose={() =>
    setOpenModal(false)
  }
  branch={branch}
  onUpdate={handleUpdateBranch}
/>
    </motion.div>
  );
};

export default BranchCard;