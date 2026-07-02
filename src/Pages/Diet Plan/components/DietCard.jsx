import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Salad,
  UtensilsCrossed,
  CalendarDays,
  Target,
  Pencil,
  Trash2,
} from "lucide-react";

export default function DietCard({
  diet,
  onEdit,
  onDelete,
}) {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`rounded-2xl border overflow-hidden transition-all ${
        theme === "dark"
          ? "bg-[#0B1020] border-white/10 hover:border-orange-500/30"
          : "bg-white border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-lg"
      }`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="h-14 w-14 rounded-xl bg-green-500/10 flex items-center justify-center">
            <Salad className="text-green-500" size={28} />
          </div>

          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">
            {diet.goalGroupId?.name || "Goal"}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`mt-5 text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {diet.title}
        </h2>

        <p
          className={`mt-1 text-sm line-clamp-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {diet.goalGroupId?.description || "No description available"}
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div
            className={`rounded-xl p-4 ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <UtensilsCrossed size={15} />
              Meals
            </div>

            <p className="mt-2 text-2xl font-bold">
              {diet.meals?.length || 0}
            </p>
          </div>

          <div
            className={`rounded-xl p-4 ${
              theme === "dark" ? "bg-white/5" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Target size={15} />
              Goal
            </div>

            <p className="mt-2 font-semibold text-orange-500">
              {diet.goalGroupId?.name || "-"}
            </p>
          </div>
        </div>

        {/* Created Date */}
        <div
          className={`mt-5 flex items-center gap-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <CalendarDays size={16} />
          Created on{" "}
          {new Date(diet.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Footer */}
      <div
        className={`flex items-center justify-between border-t px-6 py-4 ${
          theme === "dark"
            ? "border-white/10"
            : "border-gray-200"
        }`}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(diet)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-blue-500 transition hover:bg-blue-500/10"
        >
          <Pencil size={18} />
          Edit
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(diet)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 transition hover:bg-red-500/10"
        >
          <Trash2 size={18} />
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}