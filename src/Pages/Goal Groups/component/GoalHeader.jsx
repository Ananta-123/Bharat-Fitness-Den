import { motion } from "framer-motion";
import { Plus, Target } from "lucide-react";

export default function GoalHeader({ totalGoals = 0, onCreate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
    >
      {/* Left Side */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#C11200] to-[#F96B00] shadow-lg">
            <Target size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Goal Groups
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Organize members by their fitness goals
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <span className="text-sm text-gray-500 dark:text-slate-400">
            Total Goal Groups
          </span>

          <span className="ml-3 rounded-lg bg-orange-100 px-3 py-1 text-sm font-semibold text-[#F96B00] dark:bg-orange-500/20 dark:text-orange-400">
            {totalGoals}
          </span>
        </div>
      </div>

      {/* Right Side */}
      <motion.button
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
        onClick={onCreate}
        className="
          flex items-center justify-center gap-2
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
        <Plus size={18} />
        Create Goal Group
      </motion.button>
    </motion.div>
  );
}