import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import ExerciseHeader from "./components/ExerciseHeader";
import ExerciseStats from "./components/ExerciseStats";
import ExerciseGrid from "./components/ExerciseGrid";
import LoadingSkeleton from "./components/LoadingSkeleton";
import EmptyState from "./components/EmptyState";

import CreateExerciseModal from "./Modals/CreateExerciseModal";
import EditExerciseModal from "./Modals/EditExerciseModal";
import DeleteExerciseModal from "./Modals/DeleteExerciseModal";

import {
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../../Api/exerciseApi.js";

export default function ExercisePage() {
  const [loading, setLoading] = useState(true);

  const [exercises, setExercises] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedExercise, setSelectedExercise] = useState(null);

  // -----------------------------
  // Fetch Exercises
  // -----------------------------

  const fetchExercises = async () => {
    try {
      setLoading(true);

      const res = await getAllExercises();

      setExercises(res?.exercises || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load exercises");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  // -----------------------------
  // Create
  // -----------------------------

  const handleCreateExercise = async (formData) => {
    try {
      await createExercise(formData);

      toast.success("Exercise created successfully");

      setShowCreateModal(false);

      fetchExercises();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Unable to create exercise"
      );
    }
  };

  // -----------------------------
  // Edit
  // -----------------------------

  const handleEditExercise = (exercise) => {
    setSelectedExercise(exercise);

    setShowEditModal(true);
  };

  const handleUpdateExercise = async (formData) => {
    try {
      await updateExercise(selectedExercise._id, formData);

      toast.success("Exercise updated successfully");

      setShowEditModal(false);

      setSelectedExercise(null);

      fetchExercises();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Unable to update exercise"
      );
    }
  };

  // -----------------------------
  // Delete
  // -----------------------------

  const handleDeleteClick = (exercise) => {
    setSelectedExercise(exercise);

    setShowDeleteModal(true);
  };

  const handleDeleteExercise = async () => {
    try {
      await deleteExercise(selectedExercise._id);

      toast.success("Exercise deleted");

      setShowDeleteModal(false);

      setSelectedExercise(null);

      fetchExercises();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message || "Unable to delete exercise"
      );
    }
  };

  // -----------------------------
  // Search
  // -----------------------------

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const keyword = searchTerm.toLowerCase();

      return (
        exercise.name.toLowerCase().includes(keyword) ||
        exercise.muscleGroup.toLowerCase().includes(keyword) ||
        exercise.equipment.toLowerCase().includes(keyword) ||
        exercise.difficulty.toLowerCase().includes(keyword)
      );
    });
  }, [exercises, searchTerm]);

  // -----------------------------
  // Stats
  // -----------------------------

  const stats = useMemo(() => {
    return {
      total: exercises.length,

      beginner: exercises.filter(
        (item) => item.difficulty === "beginner"
      ).length,

      intermediate: exercises.filter(
        (item) => item.difficulty === "intermediate"
      ).length,

      advanced: exercises.filter(
        (item) => item.difficulty === "advanced"
      ).length,
    };
  }, [exercises]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}

        <ExerciseHeader
          totalExercises={filteredExercises.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreate={() => setShowCreateModal(true)}
        />

        {/* Stats */}

        <ExerciseStats stats={stats} />

        {/* Content */}

        {loading ? (
          <LoadingSkeleton />
        ) : filteredExercises.length === 0 ? (
          <EmptyState onCreate={() => setShowCreateModal(true)} />
        ) : (
          <ExerciseGrid
            exercises={filteredExercises}
            onEdit={handleEditExercise}
            onDelete={handleDeleteClick}
          />
        )}
      </motion.div>

      {/* Create */}

      <CreateExerciseModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateExercise}
      />

      {/* Edit */}

      <EditExerciseModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedExercise(null);
        }}
        exercise={selectedExercise}
        onSubmit={handleUpdateExercise}
      />

      {/* Delete */}

      <DeleteExerciseModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedExercise(null);
        }}
        exercise={selectedExercise}
        onDelete={handleDeleteExercise}
      />
    </>
  );
}