import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  CalendarDays,
  Target,
} from "lucide-react";

export default function GoalCard({
  goal,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        <div className="flex items-start gap-4">
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
              shadow-lg
            "
          >
            <Target size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {goal.name}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-slate-400">
              {goal.description || "No description available"}
            </p>
          </div>
        </div>

        {/* Future Status Badge */}
        {goal.status && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-400">
            Active
          </span>
        )}
      </div>

      {/* Body */}
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
          <CalendarDays size={16} />
          Created :
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {formatDate(goal.createdAt)}
          </span>
        </div>

        {/* Future API Fields */}

        {goal.members && (
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">
              Members
            </span>

            <span className="font-semibold text-gray-900 dark:text-white">
              {goal.members}
            </span>
          </div>
        )}

        {goal.trainer && (
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">
              Trainer
            </span>

            <span className="font-semibold text-gray-900 dark:text-white">
              {goal.trainer}
            </span>
          </div>
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
          border-gray-200
          p-5

          dark:border-slate-700
        "
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onEdit(goal)}
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
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onDelete(goal)}
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