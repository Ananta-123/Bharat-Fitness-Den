import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Image, Plus } from "lucide-react";

import BannerCard from "./BannerCard";

export default function BannerGrid({
  banners = [],
  loading,
  onCreate,
  onEdit,
  onDelete,
}) {
  const { theme } = useTheme();

  // Loading State
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
  if (!banners.length) {
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
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10">
          <Image
            size={40}
            className="text-orange-500"
          />
        </div>

        <h2
          className={`text-2xl font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          No Banners Found
        </h2>

        <p
          className={`mt-2 mb-8 text-center ${
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          Create your first promotional banner.
        </p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white transition hover:bg-orange-700"
        >
          <Plus size={18} />
          Create Banner
        </motion.button>
      </motion.div>
    );
  }

  // Banner Grid
  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      {banners.map((banner) => (
        <BannerCard
          key={banner._id}
          banner={banner}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </motion.div>
  );
}