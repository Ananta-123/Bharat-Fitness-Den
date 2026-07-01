import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import WorkoutHeader from "./components/WorkoutHeader.jsx";
import WorkoutGrid from "./components/WorkoutGrid.jsx";
import AddWorkoutModal from "./components/AddWorkoutModal.jsx";
import EditWorkoutModal from "./components/EditWorkoutModal.jsx";
import DeleteWorkoutModal from "./components/DeleteWorkoutModal.jsx";

import {
  getAllWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../../Api/workoutApi.js";

import { getAllGoals } from "../../Api/goalGroupApi";

export default function WorkoutPage() {
  // ===============================
  // STATES
  // ===============================

  const [workouts, setWorkouts] = useState([]);
  const [goalGroups, setGoalGroups] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ===============================
  // FETCH WORKOUTS
  // ===============================

  const fetchWorkouts = async () => {
    try {
      setLoading(true);

      const res = await getAllWorkouts();

      if (res.success) {
        setWorkouts(res.workouts || []);
      }
    } catch (err) {
      console.error("Failed to fetch workouts", err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // FETCH GOAL GROUPS
  // ===============================

  const fetchGoalGroups = async () => {
    try {
      const res = await getAllGoals();

      if (res.success) {
        setGoalGroups(res.goals || []);
      }
    } catch (err) {
      console.error("Failed to fetch goal groups", err);
    }
  };

  // ===============================
  // INITIAL LOAD
  // ===============================

  useEffect(() => {
    fetchWorkouts();
    fetchGoalGroups();
  }, []);

  // ===============================
  // CREATE WORKOUT
  // ===============================

  const handleCreateWorkout = async (formData) => {
  console.log("Sending Payload:", formData);

  try {
    const res = await createWorkout(formData);

    console.log("Response:", res);

    if (res.success) {
      setShowAddModal(false);
      fetchWorkouts();
    }
  } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Error:", err.response?.data);
    console.log("Payload:", formData);
  }
};

  // ===============================
  // UPDATE WORKOUT
  // ===============================

  const handleUpdateWorkout = async (formData) => {
    try {
      const res = await updateWorkout(
        selectedWorkout._id,
        formData
      );

      if (res.success) {
        setShowEditModal(false);
        setSelectedWorkout(null);
        fetchWorkouts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // DELETE WORKOUT
  // ===============================

  const handleDeleteWorkout = async () => {
    try {
      const res = await deleteWorkout(selectedWorkout._id);

      if (res.success) {
        setShowDeleteModal(false);
        setSelectedWorkout(null);
        fetchWorkouts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // LOADING SKELETON
  // ===============================

  const renderSkeleton = () => {
    return [...Array(6)].map((_, index) => (
      <div
        key={index}
        className="
          animate-pulse
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="mb-5 h-12 w-12 rounded-xl bg-gray-300 dark:bg-slate-700" />

        <div className="mb-3 h-6 w-40 rounded bg-gray-300 dark:bg-slate-700" />

        <div className="mb-2 h-4 w-56 rounded bg-gray-200 dark:bg-slate-800" />

        <div className="mb-6 h-4 w-40 rounded bg-gray-200 dark:bg-slate-800" />

        <div className="mb-5 h-8 w-24 rounded bg-gray-200 dark:bg-slate-800" />

        <div className="flex justify-between">
          <div className="h-10 w-24 rounded bg-gray-200 dark:bg-slate-800" />
          <div className="h-10 w-24 rounded bg-gray-200 dark:bg-slate-800" />
        </div>
      </div>
    ));
  };

  // ===============================
  // JSX
  // ===============================

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          min-h-screen
          bg-[#F5F7FB]
          px-6
          py-6
          transition-colors
          duration-300

          dark:bg-[#060816]
        "
      >
        {/* Header */}

        <WorkoutHeader
          totalWorkouts={workouts.length}
          onCreate={() => setShowAddModal(true)}
        />

        {/* Grid */}

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {renderSkeleton()}
          </div>
        ) : (
                      <WorkoutGrid
            workouts={workouts}
            onEdit={(workout) => {
              setSelectedWorkout(workout);
              setShowEditModal(true);
            }}
            onDelete={(workout) => {
              setSelectedWorkout(workout);
              setShowDeleteModal(true);
            }}
            onCreate={() => setShowAddModal(true)}
          />
        )}
      </motion.div>

      {/* =========================
          Add Workout Modal
      ========================== */}

      <AddWorkoutModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateWorkout}
        goalGroups={goalGroups}
      />

      {/* =========================
          Edit Workout Modal
      ========================== */}

      <EditWorkoutModal
        isOpen={showEditModal}
        workout={selectedWorkout}
        goalGroups={goalGroups}
        onClose={() => {
          setShowEditModal(false);
          setSelectedWorkout(null);
        }}
        onSubmit={handleUpdateWorkout}
      />

      {/* =========================
          Delete Workout Modal
      ========================== */}

      <DeleteWorkoutModal
        isOpen={showDeleteModal}
        workout={selectedWorkout}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedWorkout(null);
        }}
        onDelete={handleDeleteWorkout}
      />
    </>
  );
}