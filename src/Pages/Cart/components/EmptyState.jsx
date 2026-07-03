import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";

export default function EmptyState() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center px-6 py-20"
    >
      {/* Icon */}
      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F96B00]/20 to-[#C11200]/20 blur-2xl" />

        <div
          className={`relative flex h-24 w-24 items-center justify-center rounded-full border ${
            theme === "dark"
              ? "border-white/10 bg-[#111827]"
              : "border-gray-200 bg-white"
          } shadow-lg`}
        >
          <ShoppingCart
            size={42}
            className="text-[#F96B00]"
          />
        </div>
      </motion.div>

      {/* Title */}
      <h2
        className={`mt-8 text-2xl font-bold ${
          theme === "dark"
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        No Carts Found
      </h2>

      {/* Description */}
      <p
        className={`mt-3 max-w-md text-center text-sm leading-6 ${
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        There are currently no shopping carts available.
        Once customers add products to their cart, they will
        appear here for review and management.
      </p>

      {/* Decorative Badge */}
      <div
        className={`mt-8 rounded-full border px-4 py-2 text-sm font-medium ${
          theme === "dark"
            ? "border-[#F96B00]/20 bg-[#F96B00]/10 text-[#F96B00]"
            : "border-orange-200 bg-orange-50 text-orange-600"
        }`}
      >
        Waiting for cart activity...
      </div>
    </motion.div>
  );
}