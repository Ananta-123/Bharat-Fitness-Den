import { motion } from "framer-motion";
import {
  Dumbbell,
  CalendarDays,
  Target,
  BarChart3,
  Pencil,
  Trash2,
  Flame,
  Clock,
  ListChecks,
} from "lucide-react";

export default function WorkoutCard({
  workout,
  onEdit,
  onDelete,
}) {
  // ==========================================
  // Format Date
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // Difficulty Color
  // ==========================================

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";

      case "intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";

      case "advanced":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300";
    }
  };

  // ==========================================
  // Workout Days
  // ==========================================

  const workoutDays = workout?.days || [];

  // ==========================================
  // Total Exercises
  // ==========================================

  const totalExercises = workoutDays.reduce(
    (total, day) =>
      total + (day.exercises?.length || 0),
    0
  );

  // ==========================================
  // Exercise Names
  // ==========================================

  const exerciseNames = workoutDays.flatMap(
    (day) =>
      (day.exercises || []).map(
        (exercise) =>
          exercise.exerciseId?.name ||
          exercise.exerciseId?.title ||
          exercise.exerciseId?.exerciseName
      )
  );

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:shadow-xl

        dark:border-slate-700
        dark:bg-slate-900/80
        dark:hover:border-orange-500/40
      "
    >
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          border-b
          border-gray-200
          p-6
          dark:border-slate-700
        "
      >
        <div className="flex min-w-0 gap-4">
          {/* Icon */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-[#C11200]
              to-[#F96B00]
              text-white
              shadow-lg
            "
          >
            <Dumbbell size={26} />
          </div>

          {/* Title */}

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
              title={workout.title}
            >
              {workout.title || "Untitled Workout"}
            </h2>

            <p
              className="
                mt-2
                truncate
                text-sm
                text-gray-500
                dark:text-slate-400
              "
            >
              {workout.goalGroupId?.name ||
                "No Goal Group"}
            </p>
          </div>
        </div>

        {/* Difficulty */}

        <span
          className={`
            ml-3
            shrink-0
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            capitalize
            ${getDifficultyColor(
              workout.difficulty
            )}
          `}
        >
          {workout.difficulty || "--"}
        </span>
      </div>

      {/* ========================================== */}
      {/* BODY */}
      {/* ========================================== */}

      <div className="space-y-5 p-6">

        {/* ====================================== */}
        {/* DESCRIPTION */}
        {/* ====================================== */}

        <div>
          <p
            className="
              line-clamp-3
              text-sm
              leading-6
              text-gray-600
              dark:text-slate-300
            "
          >
            {workout.description ||
              "No description available"}
          </p>
        </div>

        {/* ====================================== */}
        {/* GOAL GROUP */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              dark:text-slate-400
            "
          >
            <Target size={16} />
            Goal Group
          </span>

          <span
            className="
              max-w-[60%]
              truncate
              text-right
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {workout.goalGroupId?.name ||
              "--"}
          </span>
        </div>

        {/* ====================================== */}
        {/* DIFFICULTY */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              dark:text-slate-400
            "
          >
            <BarChart3 size={16} />
            Difficulty
          </span>

          <span
            className="
              text-sm
              font-semibold
              capitalize
              text-gray-900
              dark:text-white
            "
          >
            {workout.difficulty || "--"}
          </span>
        </div>

        {/* ====================================== */}
        {/* ESTIMATED CALORIES */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              dark:text-slate-400
            "
          >
            <Flame size={16} />
            Estimated Calories
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {workout.estimatedCalories != null
              ? `${workout.estimatedCalories} kcal`
              : "--"}
          </span>
        </div>

        {/* ====================================== */}
        {/* ESTIMATED DURATION */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              dark:text-slate-400
            "
          >
            <Clock size={16} />
            Estimated Duration
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {workout.estimatedDuration != null
              ? `${workout.estimatedDuration} mins`
              : "--"}
          </span>
        </div>

        {/* ====================================== */}
        {/* WORKOUT DAYS */}
        {/* ====================================== */}

        <div>
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
                dark:text-slate-400
              "
            >
              <CalendarDays size={16} />
              Workout Days
            </span>

            <span
              className="
                text-sm
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {workoutDays.length}
            </span>
          </div>

          {/* Day badges */}

          {workoutDays.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {workoutDays.map(
                (day, index) => (
                  <span
                    key={`${day.day}-${index}`}
                    className="
                      rounded-lg
                      bg-orange-50
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-orange-700

                      dark:bg-orange-500/10
                      dark:text-orange-400
                    "
                  >
                    {day.day}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        {/* ====================================== */}
        {/* TOTAL EXERCISES */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              dark:text-slate-400
            "
          >
            <ListChecks size={16} />
            Total Exercises
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {totalExercises}
          </span>
        </div>

        {/* ====================================== */}
        {/* EXERCISE NAMES */}
        {/* ====================================== */}

        {exerciseNames.length > 0 && (
          <div>
            <p
              className="
                mb-2
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-gray-500
                dark:text-slate-400
              "
            >
              Exercises
            </p>

            <div className="flex flex-wrap gap-2">
              {exerciseNames
                .slice(0, 6)
                .map(
                  (name, index) =>
                    name && (
                      <span
                        key={`${name}-${index}`}
                        className="
                          rounded-lg
                          bg-gray-100
                          px-2.5
                          py-1.5
                          text-xs
                          font-medium
                          text-gray-700

                          dark:bg-slate-800
                          dark:text-slate-300
                        "
                      >
                        {name}
                      </span>
                    )
                )}

              {exerciseNames.length >
                6 && (
                <span
                  className="
                    rounded-lg
                    bg-gray-100
                    px-2.5
                    py-1.5
                    text-xs
                    font-medium
                    text-gray-500

                    dark:bg-slate-800
                    dark:text-slate-400
                  "
                >
                  +{exerciseNames.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* ====================================== */}
        {/* CREATED */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-gray-100
            pt-4
            dark:border-slate-800
          "
        >
          <span
            className="
              text-sm
              text-gray-500
              dark:text-slate-400
            "
          >
            Created
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            {formatDate(workout.createdAt)}
          </span>
        </div>
      </div>

      {/* ========================================== */}
      {/* FOOTER */}
      {/* ========================================== */}

      <div
        className="
          flex
          items-center
          justify-end
          gap-3
          border-t
          border-gray-200
          p-5
          dark:border-slate-700
        "
      >
        {/* Edit */}

        <motion.button
          type="button"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => onEdit(workout)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-blue-500
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-600
            transition-all

            hover:bg-blue-500
            hover:text-white

            dark:text-blue-400
            dark:hover:text-white
          "
        >
          <Pencil size={16} />
          Edit
        </motion.button>

        {/* Delete */}

        <motion.button
          type="button"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => onDelete(workout)}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500
            px-4
            py-2
            text-sm
            font-semibold
            text-red-600
            transition-all

            hover:bg-red-500
            hover:text-white

            dark:text-red-400
            dark:hover:text-white
          "
        >
          <Trash2 size={16} />
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}