import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteGoalModal({
  isOpen,
  onClose,
  goal,
  onDelete,
}) {
  if (!isOpen || !goal) return null;

  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          transition={{ duration: 0.25 }}
          className="
            w-full
            max-w-md
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
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                <AlertTriangle size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete Goal Group
                </h2>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="px-6 py-6">
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-500/30 dark:bg-red-500/10">
              <p className="text-gray-700 dark:text-gray-300">
                Are you sure you want to delete the goal group
              </p>

              <p className="mt-3 text-lg font-bold text-red-600 dark:text-red-400">
                "{goal.name}"
              </p>

              {goal.description && (
                <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">
                  {goal.description}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-5 dark:border-slate-700">
            <button
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-2.5
                font-medium
                text-gray-700
                transition

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
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={handleDelete}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-6
                py-2.5
                font-semibold
                text-white
                shadow-lg
                transition

                hover:bg-red-700
              "
            >
              <Trash2 size={18} />
              Delete
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}