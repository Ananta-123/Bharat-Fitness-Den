import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Salad, Plus } from "lucide-react";

import DietCard from "./DietCard";

export default function DietGrid({
  diets,
  loading,
  onEdit,
  onDelete,
  onCreate,
}) {
  const { theme } = useTheme();

  // Loading Skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`h-80 animate-pulse rounded-2xl border ${
              theme === "dark"
                ? "border-white/10 bg-[#0B1020]"
                : "border-gray-200 bg-white"
            }`}
          />
        ))}
      </div>
    );
  }

  // Empty State
  if (!diets?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex min-h-[420px] flex-col items-center justify-center rounded-2xl border ${
          theme === "dark"
            ? "border-white/10 bg-[#0B1020]"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10">
          <Salad className="text-orange-500" size={40} />
        </div>

        <h2
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          No Diet Plans Found
        </h2>

        <p
          className={`mt-2 mb-8 text-center ${
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          Create your first diet plan to start managing nutrition plans.
        </p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white transition hover:bg-orange-700"
        >
          <Plus size={18} />
          Create Diet
        </motion.button>
      </motion.div>
    );
  }

  // Grid
  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      {diets.map((diet) => (
        <DietCard
          key={diet._id}
          diet={diet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </motion.div>
  );
}