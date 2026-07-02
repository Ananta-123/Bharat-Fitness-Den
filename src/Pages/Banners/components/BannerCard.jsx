import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Image,
  CalendarDays,
  BadgeCheck,
  BadgeX,
  Pencil,
  Trash2,
} from "lucide-react";

export default function BannerCard({
  banner,
  onEdit,
  onDelete,
}) {
  const { theme } = useTheme();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

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
      className={`overflow-hidden rounded-2xl border transition-all ${
        theme === "dark"
          ? "bg-[#0B1020] border-white/10 hover:border-orange-500/30"
          : "bg-white border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-lg"
      }`}
    >
      {/* Banner Image */}

      <div className="relative h-52 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        {banner.image ? (
          <img
            src={banner.image}
            alt={banner.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x350?text=No+Image";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Image
              size={48}
              className="text-gray-400"
            />
          </div>
        )}

        {/* Status */}

        <div className="absolute top-4 right-4">
          {banner.status ? (
            <span className="flex items-center gap-1 rounded-full bg-green-500/90 px-3 py-1 text-xs font-medium text-white shadow">
              <BadgeCheck size={14} />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-gray-600 px-3 py-1 text-xs font-medium text-white shadow">
              <BadgeX size={14} />
              Inactive
            </span>
          )}
        </div>
      </div>

      {/* Body */}

      <div className="p-6">
        <h2
          className={`line-clamp-2 text-xl font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-gray-900"
          }`}
        >
          {banner.title}
        </h2>

        <div
          className={`mt-5 flex items-center gap-2 text-sm ${
            theme === "dark"
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          <CalendarDays size={16} />

          <span>
            Created: {formatDate(banner.createdAt)}
          </span>
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
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => onEdit(banner)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-blue-500 transition hover:bg-blue-500/10"
        >
          <Pencil size={18} />
          Edit
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => onDelete(banner)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-500 transition hover:bg-red-500/10"
        >
          <Trash2 size={18} />
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}