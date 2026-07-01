import { motion } from "framer-motion";
import { Target, Plus } from "lucide-react";
import GoalCard from "./GoalCard";

export default function GoalGrid({
  goals = [],
  onEdit,
  onDelete,
  onCreate,
}) {
  // Empty State
  if (!goals.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          mt-10
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
          <Target
            size={42}
            className="text-white"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          No Goal Groups Found
        </h2>

        <p className="mt-3 max-w-md text-gray-500 dark:text-slate-400">
          Start organizing your members by creating your first
          goal group.
        </p>

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
              transition-all
            "
          >
            <Plus size={18} />
            Create Goal Group
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
      {goals.map((goal, index) => (
        <motion.div
          key={goal._id}
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
            delay: index * 0.05,
            duration: 0.25,
          }}
        >
          <GoalCard
            goal={goal}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}