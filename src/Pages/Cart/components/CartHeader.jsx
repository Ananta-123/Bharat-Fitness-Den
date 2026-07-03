import { motion } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";

export default function CartHeader({ search, setSearch }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
    >
      {/* Left */}
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ duration: 0.2 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C11200] to-[#F96B00] text-white shadow-lg"
        >
          <ShoppingCart size={28} />
        </motion.div>

        <div>
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Cart Management
          </h1>

          <p
            className={`mt-1 text-sm ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Review and manage customer shopping carts.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${
            theme === "dark"
              ? "text-gray-500"
              : "text-gray-400"
          }`}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search member or product..."
          className={`h-12 w-full rounded-xl border pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#F96B00] ${
            theme === "dark"
              ? "border-white/10 bg-[#111827] text-white placeholder:text-gray-500"
              : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
          }`}
        />
      </div>
    </motion.div>
  );
}