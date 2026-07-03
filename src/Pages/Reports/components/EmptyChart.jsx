import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { BarChart3 } from "lucide-react";

export default function EmptyChart({
  title = "No Data Available",
  description = "Chart data will appear here once records are available.",
  height = "h-72",
}) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`
        ${height}
        rounded-2xl
        border-2
        border-dashed
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
        transition-all
        duration-300
        ${
          theme === "dark"
            ? "border-gray-700 bg-[#161A2C]/50"
            : "border-gray-300 bg-gray-50"
        }
      `}
    >
      {/* Icon */}

      <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-5">
        <BarChart3
          size={36}
          className="text-orange-500"
        />
      </div>

      {/* Title */}

      <h3
        className={`text-xl font-semibold ${
          theme === "dark"
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className={`mt-2 max-w-sm text-sm leading-6 ${
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {description}
      </p>

      {/* Decorative Dots */}

      <div className="flex items-center gap-2 mt-6">
        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
        <span className="w-2 h-2 rounded-full bg-orange-300"></span>
      </div>
    </motion.div>
  );
}