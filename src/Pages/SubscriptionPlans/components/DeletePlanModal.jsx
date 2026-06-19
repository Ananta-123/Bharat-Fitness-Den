import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function DeletePlanModal({
  isOpen,
  onClose,
  plan,
  onConfirm,
}) {
  if (!isOpen || !plan) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            w-full
            max-w-md
            rounded-3xl
            bg-white
            dark:bg-[#0B1120]
            border
            border-gray-200
            dark:border-[#1B2440]
            p-6
            text-center
          "
        >
          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-full
              flex
              items-center
              justify-center
              bg-red-100
              dark:bg-red-500/10
              mb-4
            "
          >
            <Trash2 className="text-red-500" />
          </div>

          <h2 className="text-xl font-bold dark:text-white">
            Delete Plan
          </h2>

          <p className="mt-2 text-gray-500">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              {plan.name}
            </span>
            ?
          </p>

          <p className="text-sm text-red-500 mt-2">
            This action cannot be undone.
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="
                flex-1
                py-3
                rounded-xl
                border
              "
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onConfirm(plan._id)
              }
              className="
                flex-1
                py-3
                rounded-xl
                bg-red-500
                text-white
              "
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}