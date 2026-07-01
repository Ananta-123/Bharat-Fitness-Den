import { motion } from "framer-motion";
import {
  Dumbbell,
  CalendarDays,
  Target,
  BarChart3,
  Pencil,
  Trash2,
} from "lucide-react";

export default function WorkoutCard({
  workout,
  onEdit,
  onDelete,
}) {
  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="
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
      {/* Header */}

      <div className="flex items-start justify-between border-b border-gray-200 p-6 dark:border-slate-700">
        <div className="flex gap-4">
          <div
            className="
              flex
              h-14
              w-14
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

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {workout.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              {workout.goalGroupId?.name || "No Goal Group"}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getDifficultyColor(
            workout.difficulty
          )}`}
        >
          {workout.difficulty}
        </span>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        {/* Description */}

        <div>
          <p className="text-sm leading-6 text-gray-600 dark:text-slate-300">
            {workout.description || "No description available"}
          </p>
        </div>

        {/* Goal Group */}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <Target size={16} />
            Goal Group
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {workout.goalGroupId?.name || "--"}
          </span>
        </div>

        {/* Difficulty */}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <BarChart3 size={16} />
            Difficulty
          </span>

          <span className="capitalize font-semibold text-gray-900 dark:text-white">
            {workout.difficulty}
          </span>
        </div>

        {/* Workout Days */}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
            <CalendarDays size={16} />
            Workout Days
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {workout.days?.length || 0}
          </span>
        </div>

        {/* Created */}

        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-slate-400">
            Created
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {formatDate(workout.createdAt)}
          </span>
        </div>

        {/* Future Fields */}

        {workout.duration && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-slate-400">
              Duration
            </span>

            <span className="font-semibold text-gray-900 dark:text-white">
              {workout.duration} mins
            </span>
          </div>
        )}

        {workout.members && (
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-slate-400">
              Members
            </span>

            <span className="font-semibold text-gray-900 dark:text-white">
              {workout.members}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-5 dark:border-slate-700">
        <motion.button
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

        <motion.button
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