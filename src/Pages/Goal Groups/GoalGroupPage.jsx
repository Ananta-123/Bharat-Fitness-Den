import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import GoalHeader from "./component/GoalHeader.jsx";
import GoalGrid from "./component/GoalGrid.jsx";
import AddGoalModal from "./component/AddGoalModal.jsx";
import EditGoalModal from "./component/EditGoalModal.jsx";
import DeleteGoalModal from "./component/DeleteGoalModal.jsx";

import {
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../Api/goalGroupApi.js"; 

export default function GoalGroupPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  // ===============================
  // Fetch Goals
  // ===============================

  const fetchGoals = async () => {
    try {
      setLoading(true);

      const res = await getAllGoals();

      if (res.success) {
        setGoals(res.goals || []);
      }
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // ===============================
  // Add Goal
  // ===============================

  const handleCreateGoal = async (formData) => {
    try {
      const res = await createGoal(formData);

      if (res.success) {
        setShowAddModal(false);
        fetchGoals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Edit Goal
  // ===============================

  const handleUpdateGoal = async (formData) => {
    try {
      const res = await updateGoal(selectedGoal._id, formData);

      if (res.success) {
        setShowEditModal(false);
        setSelectedGoal(null);
        fetchGoals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Delete Goal
  // ===============================

  const handleDeleteGoal = async () => {
    try {
      const res = await deleteGoal(selectedGoal._id);

      if (res.success) {
        setShowDeleteModal(false);
        setSelectedGoal(null);
        fetchGoals();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Skeleton Loading
  // ===============================

  const renderSkeleton = () => {
    return [...Array(6)].map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="mb-5 h-5 w-40 rounded bg-gray-300 dark:bg-slate-700" />

        <div className="mb-8 h-4 w-64 rounded bg-gray-200 dark:bg-slate-800" />

        <div className="flex justify-between">
          <div className="h-10 w-24 rounded bg-gray-200 dark:bg-slate-800" />
          <div className="h-10 w-24 rounded bg-gray-200 dark:bg-slate-800" />
        </div>
      </div>
    ));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#F5F7FB] px-6 py-6 transition-colors duration-300 dark:bg-[#060816]"
      >
        {/* Header */}

        <GoalHeader
          totalGoals={goals.length}
          onCreate={() => setShowAddModal(true)}
        />

        {/* Goal Grid */}

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {renderSkeleton()}
          </div>
        ) : (
          <GoalGrid
            goals={goals}
            onEdit={(goal) => {
              setSelectedGoal(goal);
              setShowEditModal(true);
            }}
            onDelete={(goal) => {
              setSelectedGoal(goal);
              setShowDeleteModal(true);
            }}
          />
        )}
      </motion.div>

      {/* Add */}

      <AddGoalModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateGoal}
      />

      {/* Edit */}

      <EditGoalModal
        isOpen={showEditModal}
        goal={selectedGoal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedGoal(null);
        }}
        onSubmit={handleUpdateGoal}
      />

      {/* Delete */}

      <DeleteGoalModal
        isOpen={showDeleteModal}
        goal={selectedGoal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedGoal(null);
        }}
        onDelete={handleDeleteGoal}
      />
    </>
  );
}