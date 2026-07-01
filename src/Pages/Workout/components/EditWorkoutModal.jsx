import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Dumbbell,
  Save,
} from "lucide-react";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function EditWorkoutModal({
  isOpen,
  onClose,
  onSubmit,
  workout,
  goalGroups = [],
}) {
  // ==========================================
  // Initial Form
  // ==========================================

  const initialForm = {
    goalGroupId: "",
    title: "",
    description: "",
    difficulty: "beginner",
    days: [],
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Populate Form When Workout Changes
  // ==========================================

  useEffect(() => {
  if (!workout || !isOpen) return;

  setFormData({
    goalGroupId:
      workout.goalGroupId?._id ||
      workout.goalGroupId ||
      "",

    title: workout.title || "",

    description: workout.description || "",

    difficulty: workout.difficulty || "beginner",

    days:
      workout.days?.map((item) => item.day) || [],
  });

  setErrors({});
}, [workout, isOpen]);

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================================
  // Toggle Workout Days
  // ==========================================

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const exists = prev.days.includes(day);

      return {
        ...prev,
        days: exists
          ? prev.days.filter((d) => d !== day)
          : [...prev.days, day],
      };
    });
  };

    // ==========================================
  // Validation
  // ==========================================

  const validate = () => {
    const newErrors = {};

    if (!formData.goalGroupId) {
      newErrors.goalGroupId = "Goal Group is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Workout title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.difficulty) {
      newErrors.difficulty = "Difficulty is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

const payload = {
  ...formData,
  days: formData.days.map((day) => {
    const existingDay = workout.days?.find((d) => d.day === day);

    return {
      day,
      exercises: existingDay?.exercises || [],
    };
  }),
};

await onSubmit(payload);

await onSubmit(payload);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Close Modal
  // ==========================================

  if (!isOpen || !workout) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{ duration: 0.25 }}
          className="
            w-full
            max-w-3xl
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl

            dark:bg-slate-900
          "
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#C11200] to-[#F96B00] text-white">
                <Dumbbell size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Workout
                </h2>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Update workout information
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >
            {/* Goal Group & Difficulty */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Goal Group */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Goal Group
                </label>

                <select
                  name="goalGroupId"
                  value={formData.goalGroupId}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-[#F96B00]

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                >
                  <option value="">
                    Select Goal Group
                  </option>

                  {goalGroups.map((goal) => (
                    <option
                      key={goal._id}
                      value={goal._id}
                    >
                      {goal.name}
                    </option>
                  ))}
                </select>

                {errors.goalGroupId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.goalGroupId}
                  </p>
                )}
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
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-[#F96B00]

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                  "
                >
                  <option value="beginner">
                    Beginner
                  </option>

                  <option value="intermediate">
                    Intermediate
                  </option>

                  <option value="advanced">
                    Advanced
                  </option>
                </select>
              </div>

            </div>

                        {/* Workout Title */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Workout Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter workout title"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-[#F96B00]

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />

              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter workout description"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition
                  resize-none
                  focus:border-[#F96B00]

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Workout Days */}

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Workout Days
              </label>

              <div className="flex flex-wrap gap-3">
                {WEEK_DAYS.map((day) => {
                  const selected = formData.days.includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`
                        rounded-xl
                        border
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition-all

                        ${
                          selected
                            ? "border-[#F96B00] bg-gradient-to-r from-[#C11200] to-[#F96B00] text-white shadow-md"
                            : "border-gray-300 bg-white text-gray-700 hover:border-[#F96B00] dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300"
                        }
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                Select one or more workout days.
              </p>
            </div>

            {/* Future Fields */}

            {/*
              Duration
              Trainer
              Calories
              Equipment
              Thumbnail
              Video URL
              Status
            */}

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-slate-700">

              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-5
                  py-2.5
                  font-medium
                  text-gray-700
                  transition-all

                  hover:bg-gray-100

                  dark:border-slate-700
                  dark:text-gray-300
                  dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                disabled={loading}
                type="submit"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#C11200]
                  to-[#F96B00]
                  px-6
                  py-2.5
                  font-semibold
                  text-white
                  shadow-lg

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <Save size={18} />

                {loading ? "Updating..." : "Update Workout"}
              </motion.button>

            </div>

          </form>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}