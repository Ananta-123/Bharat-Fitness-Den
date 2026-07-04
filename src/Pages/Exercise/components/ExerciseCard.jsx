import { motion } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Wrench,
  PlayCircle,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Target,
} from "lucide-react";

export default function ExerciseCard({
  exercise,
  onEdit,
  onDelete,
}) {
  const difficultyStyles = {
    beginner:
      "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",

    intermediate:
      "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",

    advanced:
      "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  };

  const statusStyles = exercise.isActive
    ? {
        text: "Active",
        className:
          "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
        icon: CheckCircle2,
      }
    : {
        text: "Inactive",
        className:
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
        icon: XCircle,
      };

  const StatusIcon = statusStyles.icon;

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        hover:shadow-xl

        dark:border-slate-700
        dark:bg-slate-900/70
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between p-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-red-700
              to-orange-500
              text-white
            "
          >
            <Dumbbell size={26} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {exercise.name}
            </h2>

            <p className="mt-1 text-sm capitalize text-gray-500 dark:text-gray-400">
              {exercise.muscleGroup.replace("_", " ")}
            </p>
          </div>
        </div>

        <span
          className={`
            flex
            items-center
            gap-1
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusStyles.className}
          `}
        >
          <StatusIcon size={14} />
          {statusStyles.text}
        </span>
      </div>

      {/* Body */}

      <div className="space-y-4 border-t border-gray-100 p-5 dark:border-slate-700">
        {/* Equipment */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Wrench size={16} />
            <span className="text-sm">Equipment</span>
          </div>

          <span className="text-sm font-semibold capitalize text-gray-800 dark:text-white">
            {exercise.equipment}
          </span>
        </div>

        {/* Difficulty */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Target size={16} />
            <span className="text-sm">Difficulty</span>
          </div>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              capitalize
              ${difficultyStyles[exercise.difficulty]}
            `}
          >
            {exercise.difficulty}
          </span>
        </div>

        {/* Calories */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Flame size={16} />
            <span className="text-sm">Calories</span>
          </div>

          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {exercise.caloriesBurnPerMinute} kcal/min
          </span>
        </div>

        {/* Description */}

        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Description
          </p>

          <p className="line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {exercise.description || "No description available."}
          </p>
        </div>

        {/* Instructions */}

        {exercise.instructions &&
          exercise.instructions.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Instructions
              </p>

              <ul className="space-y-1">
                {exercise.instructions
                  .slice(0, 3)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-500" />

                      <span>{item}</span>
                    </li>
                  ))}

                {exercise.instructions.length > 3 && (
                  <p className="text-xs text-orange-500">
                    +{exercise.instructions.length - 3} more
                  </p>
                )}
              </ul>
            </div>
          )}

        {/* Video */}

        {exercise.videoUrl && (
          <a
            href={exercise.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-orange-50
              px-4
              py-3
              text-sm
              font-medium
              text-orange-600
              transition
              hover:bg-orange-100

              dark:bg-orange-500/10
              dark:text-orange-400
              dark:hover:bg-orange-500/20
            "
          >
            <PlayCircle size={18} />

            Watch Exercise Video
          </a>
        )}
      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-end
          gap-3
          border-t
          border-gray-100
          p-5

          dark:border-slate-700
        "
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={onEdit}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-blue-50
            px-4
            py-2
            text-sm
            font-medium
            text-blue-600
            transition
            hover:bg-blue-100

            dark:bg-blue-500/15
            dark:text-blue-400
            dark:hover:bg-blue-500/25
          "
        >
          <Pencil size={16} />

          Edit
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={onDelete}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-50
            px-4
            py-2
            text-sm
            font-medium
            text-red-600
            transition
            hover:bg-red-100

            dark:bg-red-500/15
            dark:text-red-400
            dark:hover:bg-red-500/25
          "
        >
          <Trash2 size={16} />

          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}