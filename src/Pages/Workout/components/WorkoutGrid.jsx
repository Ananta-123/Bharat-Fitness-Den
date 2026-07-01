import { motion } from "framer-motion";
import { Dumbbell, Plus } from "lucide-react";

import WorkoutCard from "./WorkoutCard";

export default function WorkoutGrid({
  workouts = [],
  onEdit,
  onDelete,
  onCreate,
}) {
  // Empty State
  if (!workouts.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="
          mt-8
          flex
          min-h-[420px]
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          border-gray-300
          bg-white
          px-6
          text-center
          shadow-md

          dark:border-slate-700
          dark:bg-slate-900/70
        "
      >
        {/* Icon */}

        <div
          className="
            mb-6
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-[#C11200]
            to-[#F96B00]
            shadow-xl
          "
        >
          <Dumbbell
            size={42}
            className="text-white"
          />
        </div>

        {/* Heading */}

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          No Workouts Found
        </h2>

        {/* Description */}

        <p className="mt-3 max-w-md text-gray-500 dark:text-slate-400">
          Create your first workout program and assign it to a goal group.
        </p>

        {/* Button */}

        {onCreate && (
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onCreate}
            className="
              mt-8
              flex
              items-center
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
            "
          >
            <Plus size={18} />
            Create Workout
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="
        mt-8
        grid
        grid-cols-1
        gap-6

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {workouts.map((workout, index) => (
        <motion.div
          key={workout._id}
          layout
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
            delay: index * 0.05,
          }}
        >
          <WorkoutCard
            workout={workout}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}