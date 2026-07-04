import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Dumbbell,
  Link,
  Flame,
  FileText,
  Target,
  Plus,
  Trash2,
} from "lucide-react";

import {
  muscleGroups,
  equipments,
  difficulties,
} from "../utils/exerciseEnums";

export default function EditExerciseModal({
  isOpen,
  onClose,
  exercise,
  onSubmit,
}) {
  const initialForm = {
    name: "",
    muscleGroup: muscleGroups[0],
    equipment: equipments[0],
    difficulty: difficulties[0],
    description: "",
    instructions: [""],
    videoUrl: "",
    caloriesBurnPerMinute: 5,
    isActive: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Populate Form
  // -----------------------------

  useEffect(() => {
    if (exercise && isOpen) {
      setFormData({
        name: exercise.name || "",
        muscleGroup:
          exercise.muscleGroup || muscleGroups[0],
        equipment:
          exercise.equipment || equipments[0],
        difficulty:
          exercise.difficulty || difficulties[0],
        description:
          exercise.description || "",
        instructions:
          exercise.instructions &&
          exercise.instructions.length > 0
            ? exercise.instructions
            : [""],
        videoUrl:
          exercise.videoUrl || "",
        caloriesBurnPerMinute:
          exercise.caloriesBurnPerMinute || 5,
        isActive:
          exercise.isActive ?? true,
      });
    }
  }, [exercise, isOpen]);

  // -----------------------------
  // Input Handler
  // -----------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name ===
            "caloriesBurnPerMinute"
          ? Number(value)
          : value,
    }));
  };

  // -----------------------------
  // Instructions
  // -----------------------------

  const handleInstructionChange = (
    index,
    value
  ) => {
    const updated = [...formData.instructions];

    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      instructions: updated,
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        "",
      ],
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length === 1)
      return;

    const updated = [...formData.instructions];

    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      instructions: updated,
    }));
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...formData,
        instructions:
          formData.instructions.filter(
            (item) => item.trim() !== ""
          ),
      };

      await onSubmit(payload);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            w-full
            max-w-4xl
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-2xl

            dark:border-slate-700
            dark:bg-[#0F172A]
          "
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-slate-700">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                <Dumbbell className="text-orange-500" />
                Edit Exercise
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                Update exercise information.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500 dark:hover:bg-slate-800"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body */}

          <div className="max-h-[70vh] overflow-y-auto p-8 space-y-6">

            {/* Exercise Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Exercise Name *
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Exercise Name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* Dropdowns */}

            <div className="grid gap-5 md:grid-cols-3">

              {/* Muscle Group */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Muscle Group
                </label>

                <select
                  name="muscleGroup"
                  value={formData.muscleGroup}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  {muscleGroups.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Equipment
                </label>

                <select
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  {equipments.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Difficulty
                </label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  {difficulties.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

            </div>
                        {/* Calories + Video URL */}

            <div className="grid gap-5 md:grid-cols-2">

              {/* Calories */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Flame size={16} />
                  Calories Burn / Minute
                </label>

                <input
                  type="number"
                  min="1"
                  name="caloriesBurnPerMinute"
                  value={formData.caloriesBurnPerMinute}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Video URL */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Link size={16} />
                  Video URL
                </label>

                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

            </div>

            {/* Description */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FileText size={16} />
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write exercise description..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* Instructions */}

            <div>
              <div className="mb-4 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Target size={16} />
                  Instructions
                </label>

                <button
                  type="button"
                  onClick={addInstruction}
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  <Plus size={16} />
                  Add Step
                </button>
              </div>

              {formData.instructions.map((instruction, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-3 flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={instruction}
                    onChange={(e) =>
                      handleInstructionChange(
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Instruction ${index + 1}`}
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => removeInstruction(index)}
                    disabled={formData.instructions.length === 1}
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-red-500
                      text-white
                      transition
                      hover:bg-red-600
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Status */}

            <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-5 dark:border-slate-700">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Exercise Status
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                  Enable or disable this exercise.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <div
                  className="
                    relative
                    h-7
                    w-12
                    rounded-full
                    bg-gray-300
                    transition-all
                    peer-checked:bg-orange-500

                    after:absolute
                    after:left-1
                    after:top-1
                    after:h-5
                    after:w-5
                    after:rounded-full
                    after:bg-white
                    after:transition-all

                    peer-checked:after:translate-x-5
                  "
                />
              </label>
            </div>

          </div>

                    {/* Footer */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-4
              border-t
              border-gray-200
              bg-gray-50
              px-8
              py-5

              dark:border-slate-700
              dark:bg-slate-900/40
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-gray-300
                px-6
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-100

                disabled:cursor-not-allowed
                disabled:opacity-60

                dark:border-slate-600
                dark:text-gray-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-gradient-to-r
                from-red-700
                to-orange-500
                px-8
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                hover:shadow-orange-500/30

                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading ? "Updating..." : "Update Exercise"}
            </motion.button>
          </div>

        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}