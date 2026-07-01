import { motion } from "framer-motion";
import { Plus, Dumbbell } from "lucide-react";

export default function WorkoutHeader({
  totalWorkouts = 0,
  onCreate,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
    >
      {/* Left Section */}
      <div>
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#C11200] to-[#F96B00] shadow-lg">
            <Dumbbell className="text-white" size={26} />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Workout Programs
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Manage workout plans for every goal group.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
            Total Workouts
          </span>

          <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm font-bold text-[#F96B00] dark:bg-orange-500/20 dark:text-orange-400">
            {totalWorkouts}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <motion.button
        whileHover={{
          scale: 1.04,
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
        onClick={onCreate}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-[#C11200]
          to-[#F96B00]
          px-6
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-all
          hover:shadow-orange-500/30
        "
      >
        <Plus size={20} />
        Create Workout
      </motion.button>
    </motion.div>
  );
}