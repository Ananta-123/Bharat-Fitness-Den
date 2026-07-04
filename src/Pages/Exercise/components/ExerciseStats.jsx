import { motion } from "framer-motion";
import {
  Dumbbell,
  ShieldCheck,
  Flame,
  Trophy,
} from "lucide-react";

export default function ExerciseStats({ stats }) {
  const statCards = [
    {
      title: "Total Exercises",
      value: stats.total,
      icon: Dumbbell,
      iconBg:
        "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
      border:
        "border-orange-200 dark:border-orange-500/20",
    },
    {
      title: "Beginner",
      value: stats.beginner,
      icon: ShieldCheck,
      iconBg:
        "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
      border:
        "border-green-200 dark:border-green-500/20",
    },
    {
      title: "Intermediate",
      value: stats.intermediate,
      icon: Flame,
      iconBg:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      border:
        "border-amber-200 dark:border-amber-500/20",
    },
    {
      title: "Advanced",
      value: stats.advanced,
      icon: Trophy,
      iconBg:
        "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
      border:
        "border-red-200 dark:border-red-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            className={`
              rounded-2xl
              border
              ${item.border}
              bg-white
              p-5
              shadow-sm
              transition-all
              hover:shadow-xl

              dark:bg-[#111827]
              dark:shadow-black/20
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </h2>
              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${item.iconBg}
                `}
              >
                <Icon size={28} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}