import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Dumbbell,
  Save,
  Plus,
  Trash2,
  ChevronDown,
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

const createEmptyExercise = () => ({
  exerciseId: "",
  sets: 3,
  reps: 12,
  durationSeconds: 60,
  restSeconds: 30,
  order: 1,
});

const initialForm = {
  goalGroupId: "",
  title: "",
  description: "",
  estimatedCalories: "",
  estimatedDuration: "",
  difficulty: "beginner",
  days: [],
};

export default function EditWorkoutModal({
  isOpen,
  onClose,
  onSubmit,
  workout,
  goalGroups = [],
  exercises = [],
}) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDay, setOpenDay] = useState(null);

  // ==========================================
  // Populate Form When Workout Changes
  // ==========================================

  useEffect(() => {
    if (!workout || !isOpen) return;

    const formattedDays =
      workout.days?.map((day) => ({
        day: day.day,

        exercises:
          day.exercises?.map((exercise, index) => ({
            exerciseId:
              exercise.exerciseId?._id ||
              exercise.exerciseId ||
              "",

            sets:
              exercise.sets ?? 3,

            reps:
              exercise.reps ?? 12,

            durationSeconds:
              exercise.durationSeconds ?? 60,

            restSeconds:
              exercise.restSeconds ?? 30,

            order:
              exercise.order ?? index + 1,
          })) || [],
      })) || [];

    setFormData({
      goalGroupId:
        workout.goalGroupId?._id ||
        workout.goalGroupId ||
        "",

      title: workout.title || "",

      description:
        workout.description || "",

      estimatedCalories:
        workout.estimatedCalories ?? "",

      estimatedDuration:
        workout.estimatedDuration ?? "",

      difficulty:
        workout.difficulty || "beginner",

      days: formattedDays,
    });

    setErrors({});

    // Open first day automatically
    if (formattedDays.length > 0) {
      setOpenDay(formattedDays[0].day);
    } else {
      setOpenDay(null);
    }
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
  // Toggle Workout Day
  // ==========================================

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const existingDay = prev.days.find(
        (item) => item.day === day
      );

      // Remove day
      if (existingDay) {
        return {
          ...prev,
          days: prev.days.filter(
            (item) => item.day !== day
          ),
        };
      }

      // Add new day
      return {
        ...prev,
        days: [
          ...prev.days,
          {
            day,
            exercises: [],
          },
        ],
      };
    });

    setErrors((prev) => ({
      ...prev,
      days: "",
    }));

    // Open newly selected day
    setOpenDay(day);
  };

  // ==========================================
  // Add Exercise
  // ==========================================

  const handleAddExercise = (dayName) => {
    setFormData((prev) => ({
      ...prev,

      days: prev.days.map((day) => {
        if (day.day !== dayName) {
          return day;
        }

        return {
          ...day,

          exercises: [
            ...day.exercises,

            {
              ...createEmptyExercise(),

              order:
                day.exercises.length + 1,
            },
          ],
        };
      }),
    }))

    setOpenDay(dayName);
  };

  // ==========================================
  // Remove Exercise
  // ==========================================

  const handleRemoveExercise = (
    dayName,
    exerciseIndex
  ) => {
    setFormData((prev) => ({
      ...prev,

      days: prev.days.map((day) => {
        if (day.day !== dayName) {
          return day;
        }

        const updatedExercises =
          day.exercises
            .filter(
              (_, index) =>
                index !== exerciseIndex
            )
            .map((exercise, index) => ({
              ...exercise,
              order: index + 1,
            }));

        return {
          ...day,
          exercises: updatedExercises,
        };
      }),
    }));
  };

  // ==========================================
  // Exercise Field Change
  // ==========================================

  const handleExerciseChange = (
    dayName,
    exerciseIndex,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      days: prev.days.map((day) => {
        if (day.day !== dayName) {
          return day;
        }

        return {
          ...day,

          exercises: day.exercises.map(
            (exercise, index) => {
              if (index !== exerciseIndex) {
                return exercise;
              }

              return {
                ...exercise,

                [field]:
                  field === "exerciseId"
                    ? value
                    : Number(value),
              };
            }
          ),
        };
      }),
    }));

    setErrors((prev) => ({
      ...prev,
      [`${dayName}-${exerciseIndex}`]:
        "",
    }));
  };

  // ==========================================
  // Validation
  // ==========================================

  const validate = () => {
    const newErrors = {};

    if (!formData.goalGroupId) {
      newErrors.goalGroupId =
        "Goal Group is required";
    }

    if (!formData.title.trim()) {
      newErrors.title =
        "Workout title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required";
    }

    if (
      formData.estimatedCalories === "" ||
      Number(formData.estimatedCalories) < 0
    ) {
      newErrors.estimatedCalories =
        "Enter valid estimated calories";
    }

    if (
      formData.estimatedDuration === "" ||
      Number(formData.estimatedDuration) <= 0
    ) {
      newErrors.estimatedDuration =
        "Enter valid duration";
    }

    if (!formData.difficulty) {
      newErrors.difficulty =
        "Difficulty is required";
    }

    if (formData.days.length === 0) {
      newErrors.days =
        "Select at least one workout day";
    }

    // Validate exercises
    formData.days.forEach((day) => {
      day.exercises.forEach(
        (exercise, index) => {
          if (!exercise.exerciseId) {
            newErrors[
              `${day.day}-${index}`
            ] = "Select an exercise";
          }

          if (
            !exercise.sets ||
            Number(exercise.sets) <= 0
          ) {
            newErrors[
              `${day.day}-${index}-sets`
            ] = "Invalid sets";
          }

          if (
            !exercise.reps ||
            Number(exercise.reps) <= 0
          ) {
            newErrors[
              `${day.day}-${index}-reps`
            ] = "Invalid reps";
          }
        }
      );
    });

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
        goalGroupId: formData.goalGroupId,

        title: formData.title.trim(),

        description:
          formData.description.trim(),

        estimatedCalories: Number(
          formData.estimatedCalories
        ),

        estimatedDuration: Number(
          formData.estimatedDuration
        ),

        difficulty: formData.difficulty,

        days: formData.days.map((day) => ({
          day: day.day,

          exercises: day.exercises.map(
            (exercise, index) => ({
              exerciseId:
                exercise.exerciseId,

              sets: Number(exercise.sets),

              reps: Number(exercise.reps),

              durationSeconds: Number(
                exercise.durationSeconds
              ),

              restSeconds: Number(
                exercise.restSeconds
              ),

              order: index + 1,
            })
          ),
        })),
      };

      console.log(
        "UPDATE WORKOUT PAYLOAD:",
        payload
      );

      // IMPORTANT:
      // Only call onSubmit ONCE
      await onSubmit(payload);

      setErrors({});
      onClose();
    } catch (error) {
      console.error(
        "Update workout error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Close
  // ==========================================

  const handleClose = () => {
    if (loading) return;

    setErrors({});
    setOpenDay(null);

    onClose();
  };

  if (!isOpen || !workout) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-4
          backdrop-blur-sm
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            flex
            max-h-[92vh]
            w-full
            max-w-5xl
            flex-col
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
            dark:bg-slate-900
          "
        >
          {/* ========================================== */}
          {/* HEADER */}
          {/* ========================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-gray-200
              px-6
              py-5
              dark:border-slate-700
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-[#C11200]
                  to-[#F96B00]
                  text-white
                "
              >
                <Dumbbell size={24} />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Edit Workout
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    dark:text-slate-400
                  "
                >
                  Update workout information
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                rounded-lg
                p-2
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                dark:hover:bg-slate-800
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* ========================================== */}
          {/* FORM */}
          {/* ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="
              flex-1
              overflow-y-auto
              p-6
            "
          >
            <div className="space-y-6">

              {/* ====================================== */}
              {/* BASIC INFORMATION */}
              {/* ====================================== */}

              <div>
                <h3
                  className="
                    mb-4
                    text-base
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Basic Information
                </h3>

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-5
                    md:grid-cols-2
                  "
                >
                  {/* Goal Group */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Goal Group
                    </label>

                    <select
                      name="goalGroupId"
                      value={
                        formData.goalGroupId
                      }
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

                      {goalGroups.map(
                        (goal) => (
                          <option
                            key={goal._id}
                            value={goal._id}
                          >
                            {goal.name}
                          </option>
                        )
                      )}
                    </select>

                    {errors.goalGroupId && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.goalGroupId}
                      </p>
                    )}
                  </div>

                  {/* Difficulty */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Difficulty
                    </label>

                    <select
                      name="difficulty"
                      value={
                        formData.difficulty
                      }
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

                  {/* Title */}

                  <div className="md:col-span-2">
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Workout Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={
                        formData.title
                      }
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

                  <div className="md:col-span-2">
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Description
                    </label>

                    <textarea
                      rows={4}
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={handleChange}
                      placeholder="Enter workout description"
                      className="
                        w-full
                        resize-none
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

                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Estimated Calories */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Estimated Calories
                      <span
                        className="
                          ml-1
                          text-xs
                          font-normal
                          text-gray-400
                        "
                      >
                        (kcal)
                      </span>
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="estimatedCalories"
                      value={
                        formData.estimatedCalories
                      }
                      onChange={handleChange}
                      placeholder="e.g. 500"
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

                    {errors.estimatedCalories && (
                      <p className="mt-1 text-sm text-red-500">
                        {
                          errors.estimatedCalories
                        }
                      </p>
                    )}
                  </div>

                  {/* Estimated Duration */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-gray-700
                        dark:text-gray-300
                      "
                    >
                      Estimated Duration
                      <span
                        className="
                          ml-1
                          text-xs
                          font-normal
                          text-gray-400
                        "
                      >
                        (minutes)
                      </span>
                    </label>

                    <input
                      type="number"
                      min="1"
                      name="estimatedDuration"
                      value={
                        formData.estimatedDuration
                      }
                      onChange={handleChange}
                      placeholder="e.g. 60"
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

                    {errors.estimatedDuration && (
                      <p className="mt-1 text-sm text-red-500">
                        {
                          errors.estimatedDuration
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ====================================== */}
              {/* WORKOUT DAYS */}
              {/* ====================================== */}

              <div>
                <div className="mb-3">
                  <h3
                    className="
                      text-base
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Workout Schedule
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-500
                      dark:text-slate-400
                    "
                  >
                    Select the days on which
                    this workout will be performed.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {WEEK_DAYS.map((day) => {
                    const selected =
                      formData.days.some(
                        (item) =>
                          item.day === day
                      );

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() =>
                          handleDayToggle(day)
                        }
                        className={`
                          rounded-xl
                          border
                          px-4
                          py-2.5
                          text-sm
                          font-semibold
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

                {errors.days && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.days}
                  </p>
                )}
              </div>

              {/* ====================================== */}
              {/* EXERCISES */}
              {/* ====================================== */}

              {formData.days.length > 0 && (
                <div className="space-y-4">
                  <h3
                    className="
                      text-base
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Exercises
                  </h3>

                  {formData.days.map(
                    (day) => {
                      const isOpen =
                        openDay === day.day;

                      return (
                        <div
                          key={day.day}
                          className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-gray-200
                            dark:border-slate-700
                          "
                        >
                          {/* Day Header */}

                          <button
                            type="button"
                            onClick={() =>
                              setOpenDay(
                                isOpen
                                  ? null
                                  : day.day
                              )
                            }
                            className="
                              flex
                              w-full
                              items-center
                              justify-between
                              bg-gray-50
                              px-5
                              py-4
                              text-left
                              transition
                              hover:bg-gray-100
                              dark:bg-slate-800
                            "
                          >
                            <div>
                              <h4
                                className="
                                  font-bold
                                  text-gray-900
                                  dark:text-white
                                "
                              >
                                {day.day}
                              </h4>

                              <p
                                className="
                                  mt-1
                                  text-xs
                                  text-gray-500
                                  dark:text-slate-400
                                "
                              >
                                {
                                  day.exercises
                                    .length
                                }{" "}
                                exercise
                                {day.exercises
                                  .length !==
                                1
                                  ? "s"
                                  : ""}
                              </p>
                            </div>

                            <ChevronDown
                              size={20}
                              className={`
                                transition-transform
                                ${
                                  isOpen
                                    ? "rotate-180"
                                    : ""
                                }
                              `}
                            />
                          </button>

                          {/* Day Content */}

                          {isOpen && (
                            <div
                              className="
                                space-y-4
                                border-t
                                border-gray-200
                                p-5
                                dark:border-slate-700
                              "
                            >
                              {/* Add Exercise */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleAddExercise(
                                    day.day
                                  )
                                }
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  border
                                  border-dashed
                                  border-[#F96B00]
                                  px-4
                                  py-2.5
                                  text-sm
                                  font-semibold
                                  text-[#F96B00]
                                  transition
                                  hover:bg-orange-50
                                  dark:hover:bg-orange-950/20
                                "
                              >
                                <Plus
                                  size={17}
                                />
                                Add Exercise
                              </button>

                              {/* Empty State */}

                              {day.exercises
                                .length ===
                                0 && (
                                <div
                                  className="
                                    rounded-xl
                                    border
                                    border-dashed
                                    border-gray-300
                                    p-6
                                    text-center
                                    dark:border-slate-700
                                  "
                                >
                                  <Dumbbell
                                    size={28}
                                    className="
                                      mx-auto
                                      mb-2
                                      text-gray-400
                                    "
                                  />

                                  <p
                                    className="
                                      text-sm
                                      text-gray-500
                                      dark:text-slate-400
                                    "
                                  >
                                    No exercises
                                    added for{" "}
                                    {day.day}.
                                  </p>
                                </div>
                              )}

                              {/* Exercise Cards */}

                              {day.exercises.map(
                                (
                                  exercise,
                                  exerciseIndex
                                ) => (
                                  <div
                                    key={
                                      exerciseIndex
                                    }
                                    className="
                                      rounded-xl
                                      border
                                      border-gray-200
                                      bg-gray-50
                                      p-4
                                      dark:border-slate-700
                                      dark:bg-slate-800
                                    "
                                  >
                                    {/* Exercise Header */}

                                    <div
                                      className="
                                        mb-4
                                        flex
                                        items-center
                                        justify-between
                                      "
                                    >
                                      <div className="flex items-center gap-2">
                                        <div
                                          className="
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-gradient-to-r
                                            from-[#C11200]
                                            to-[#F96B00]
                                            text-xs
                                            font-bold
                                            text-white
                                          "
                                        >
                                          {exerciseIndex +
                                            1}
                                        </div>

                                        <span
                                          className="
                                            text-sm
                                            font-bold
                                            text-gray-800
                                            dark:text-white
                                          "
                                        >
                                          Exercise{" "}
                                          {exerciseIndex +
                                            1}
                                        </span>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveExercise(
                                            day.day,
                                            exerciseIndex
                                          )
                                        }
                                        className="
                                          rounded-lg
                                          p-2
                                          text-red-500
                                          transition
                                          hover:bg-red-50
                                          dark:hover:bg-red-950/30
                                        "
                                      >
                                        <Trash2
                                          size={17}
                                        />
                                      </button>
                                    </div>

                                    {/* Exercise Select */}

                                    <div className="mb-4">
                                      <label
                                        className="
                                          mb-2
                                          block
                                          text-xs
                                          font-semibold
                                          text-gray-600
                                          dark:text-gray-300
                                        "
                                      >
                                        Exercise
                                      </label>

                                      <select
                                        value={
                                          exercise.exerciseId
                                        }
                                        onChange={(
                                          e
                                        ) =>
                                          handleExerciseChange(
                                            day.day,
                                            exerciseIndex,
                                            "exerciseId",
                                            e.target
                                              .value
                                          )
                                        }
                                        className="
                                          w-full
                                          rounded-xl
                                          border
                                          border-gray-300
                                          bg-white
                                          px-4
                                          py-3
                                          text-sm
                                          outline-none
                                          transition
                                          focus:border-[#F96B00]
                                          dark:border-slate-700
                                          dark:bg-slate-900
                                          dark:text-white
                                        "
                                      >
                                        <option value="">
                                          Select Exercise
                                        </option>

                                        {exercises.map(
                                          (
                                            item
                                          ) => (
                                            <option
                                              key={
                                                item._id
                                              }
                                              value={
                                                item._id
                                              }
                                            >
                                              {item.name ||
                                                item.title ||
                                                item.exerciseName}
                                            </option>
                                          )
                                        )}
                                      </select>

                                      {errors[
                                        `${day.day}-${exerciseIndex}`
                                      ] && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {
                                            errors[
                                              `${day.day}-${exerciseIndex}`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>

                                    {/* Exercise Settings */}

                                    <div
                                      className="
                                        grid
                                        grid-cols-2
                                        gap-3
                                        md:grid-cols-4
                                      "
                                    >
                                      {/* Sets */}

                                      <div>
                                        <label
                                          className="
                                            mb-2
                                            block
                                            text-xs
                                            font-semibold
                                            text-gray-600
                                            dark:text-gray-300
                                          "
                                        >
                                          Sets
                                        </label>

                                        <input
                                          type="number"
                                          min="1"
                                          value={
                                            exercise.sets
                                          }
                                          onChange={(
                                            e
                                          ) =>
                                            handleExerciseChange(
                                              day.day,
                                              exerciseIndex,
                                              "sets",
                                              e.target
                                                .value
                                            )
                                          }
                                          className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-300
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-[#F96B00]
                                            dark:border-slate-700
                                            dark:bg-slate-900
                                            dark:text-white
                                          "
                                        />
                                      </div>

                                      {/* Reps */}

                                      <div>
                                        <label
                                          className="
                                            mb-2
                                            block
                                            text-xs
                                            font-semibold
                                            text-gray-600
                                            dark:text-gray-300
                                          "
                                        >
                                          Reps
                                        </label>

                                        <input
                                          type="number"
                                          min="1"
                                          value={
                                            exercise.reps
                                          }
                                          onChange={(
                                            e
                                          ) =>
                                            handleExerciseChange(
                                              day.day,
                                              exerciseIndex,
                                              "reps",
                                              e.target
                                                .value
                                            )
                                          }
                                          className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-300
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-[#F96B00]
                                            dark:border-slate-700
                                            dark:bg-slate-900
                                            dark:text-white
                                          "
                                        />
                                      </div>

                                      {/* Duration */}

                                      <div>
                                        <label
                                          className="
                                            mb-2
                                            block
                                            text-xs
                                            font-semibold
                                            text-gray-600
                                            dark:text-gray-300
                                          "
                                        >
                                          Duration
                                          <span className="ml-1 font-normal text-gray-400">
                                            (sec)
                                          </span>
                                        </label>

                                        <input
                                          type="number"
                                          min="0"
                                          value={
                                            exercise.durationSeconds
                                          }
                                          onChange={(
                                            e
                                          ) =>
                                            handleExerciseChange(
                                              day.day,
                                              exerciseIndex,
                                              "durationSeconds",
                                              e.target
                                                .value
                                            )
                                          }
                                          className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-300
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-[#F96B00]
                                            dark:border-slate-700
                                            dark:bg-slate-900
                                            dark:text-white
                                          "
                                        />
                                      </div>

                                      {/* Rest */}

                                      <div>
                                        <label
                                          className="
                                            mb-2
                                            block
                                            text-xs
                                            font-semibold
                                            text-gray-600
                                            dark:text-gray-300
                                          "
                                        >
                                          Rest
                                          <span className="ml-1 font-normal text-gray-400">
                                            (sec)
                                          </span>
                                        </label>

                                        <input
                                          type="number"
                                          min="0"
                                          value={
                                            exercise.restSeconds
                                          }
                                          onChange={(
                                            e
                                          ) =>
                                            handleExerciseChange(
                                              day.day,
                                              exerciseIndex,
                                              "restSeconds",
                                              e.target
                                                .value
                                            )
                                          }
                                          className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-300
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-[#F96B00]
                                            dark:border-slate-700
                                            dark:bg-slate-900
                                            dark:text-white
                                          "
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* ========================================== */}
            {/* FOOTER */}
            {/* ========================================== */}

            <div
              className="
                mt-6
                flex
                justify-end
                gap-3
                border-t
                border-gray-200
                pt-6
                dark:border-slate-700
              "
            >
              {/* Cancel */}

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
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
                  disabled:cursor-not-allowed
                  dark:border-slate-700
                  dark:text-gray-300
                  dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              {/* Update */}

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

                {loading
                  ? "Updating..."
                  : "Update Workout"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}