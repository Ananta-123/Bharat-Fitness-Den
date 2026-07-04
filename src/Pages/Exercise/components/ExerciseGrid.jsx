import { motion, AnimatePresence } from "framer-motion";

import ExerciseCard from "./ExerciseCard";

export default function ExerciseGrid({
  exercises = [],
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      layout
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      <AnimatePresence mode="popLayout">
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise._id}
            layout
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
              delay: index * 0.05,
            }}
          >
            <ExerciseCard
              exercise={exercise}
              onEdit={() => onEdit(exercise)}
              onDelete={() => onDelete(exercise)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}