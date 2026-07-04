import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

export default function DeleteExerciseModal({
  isOpen,
  onClose,
  exercise,
  onDelete,
}) {
  if (!isOpen || !exercise) return null;

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
            y: 30,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            w-full
            max-w-md
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

          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Delete Exercise
            </h2>

            <button
              onClick={onClose}
              className="
                rounded-xl
                p-2
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-red-500

                dark:hover:bg-slate-800
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="px-6 py-8 text-center">
            <div
              className="
                mx-auto
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-100
                dark:bg-red-500/20
              "
            >
              <AlertTriangle
                size={40}
                className="text-red-500"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Are you sure?
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-slate-400">
              You are about to permanently delete
              this exercise.
            </p>

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-orange-200
                bg-orange-50
                p-4

                dark:border-orange-500/20
                dark:bg-orange-500/10
              "
            >
              <h4 className="font-semibold text-orange-600 dark:text-orange-400">
                {exercise.name}
              </h4>

              <p className="mt-2 text-sm capitalize text-gray-600 dark:text-slate-400">
                {exercise.muscleGroup.replace("_", " ")}
              </p>

              <div className="mt-3 flex justify-center gap-2">
                <span
                  className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-blue-700

                    dark:bg-blue-500/20
                    dark:text-blue-400
                  "
                >
                  {exercise.equipment}
                </span>

                <span
                  className="
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-green-700

                    dark:bg-green-500/20
                    dark:text-green-400
                  "
                >
                  {exercise.difficulty}
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm text-red-500">
              This action cannot be undone.
            </p>
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
              px-6
              py-5

              dark:border-slate-700
              dark:bg-slate-900/40
            "
          >
            <button
              onClick={onClose}
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-100

                dark:border-slate-600
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
              onClick={onDelete}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                hover:bg-red-700
              "
            >
              <Trash2 size={18} />

              Delete Exercise
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}