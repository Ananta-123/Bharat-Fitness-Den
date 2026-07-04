import { motion } from "framer-motion";
import { Dumbbell, PlusCircle } from "lucide-react";

export default function EmptyState({ onCreate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="
        flex
        min-h-[450px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-gray-300
        bg-white
        px-6
        py-12
        text-center
        shadow-sm

        dark:border-slate-700
        dark:bg-slate-900/70
      "
    >
      {/* Icon */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          mb-6
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-gradient-to-r
          from-red-700
          to-orange-500
          text-white
          shadow-xl
          shadow-orange-500/20
        "
      >
        <Dumbbell size={42} />
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        No Exercises Found
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-slate-400">
        Your exercise library is currently empty.
        <br />
        Create your first exercise to start building workout programs for
        members and trainers.
      </p>

      {/* Button */}
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
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-red-700
          to-orange-500
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          transition-all
          hover:shadow-orange-500/30
        "
      >
        <PlusCircle size={18} />

        Create Exercise
      </motion.button>
    </motion.div>
  );
}