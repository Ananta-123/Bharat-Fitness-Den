
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useState } from "react";

import AddBranchModal from "./AddBranchModal";

const BranchHeader = ({
  branches = [],
  onBranchCreate,
}) => {
  const [openModal, setOpenModal] =
    useState(false);

  // ==========================================
  // TOTAL BRANCHES
  // ==========================================

  const totalBranches =
    branches.length;

  // ==========================================
  // TOTAL MEMBERS / USERS
  // ==========================================

  const totalMembers =
    branches.reduce(
      (total, branch) =>
        total +
        Number(
          branch.totalUsers || 0
        ),
      0
    );

  // ==========================================
  // HANDLE CREATE
  // ==========================================

  const handleCreateBranch = (
    newBranch
  ) => {
    if (onBranchCreate) {
      onBranchCreate(newBranch);
    }

    setOpenModal(false);
  };

  return (
    <>
      <div
        className="
          flex flex-col
          lg:flex-row
          items-start lg:items-center
          justify-between
          gap-5
          mb-8
        "
      >
        {/* HEADER TEXT */}

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Branch Network
          </h1>

          <p
            className="
              text-gray-500
              dark:text-gray-400
              mt-1
            "
          >
            {totalBranches}{" "}
            {totalBranches === 1
              ? "branch"
              : "branches"}{" "}
            ·{" "}
            {totalMembers.toLocaleString(
              "en-IN"
            )}{" "}
            total members
          </p>
        </div>

        {/* ADD BRANCH BUTTON */}

        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            setOpenModal(true)
          }
          className="
            flex items-center gap-2
            px-6 py-3
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-orange-400
            text-white
            font-semibold
            shadow-[0_0_30px_rgba(249,107,0,0.25)]
          "
        >
          <Building2 size={18} />

          Add Branch
        </motion.button>
      </div>

      {/* ADD BRANCH MODAL */}

      <AddBranchModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSubmit={
          handleCreateBranch
        }
      />
    </>
  );
};

export default BranchHeader;

