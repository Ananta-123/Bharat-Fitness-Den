import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Plus } from "lucide-react";

export default function DietHeader({ onCreateDiet }) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
      {/* Left Section */}
      <div>
        <h1
          className={`text-3xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Diet Plans
        </h1>

        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Manage diet plans for different fitness goals.
        </p>
      </div>

      {/* Right Section */}
      <motion.button
        whileHover={{
          scale: 1.04,
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
        onClick={onCreateDiet}
        className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-700"
      >
        <Plus size={18} strokeWidth={2.5} />
        Create Diet
      </motion.button>
    </div>
  );
}