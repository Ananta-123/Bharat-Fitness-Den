import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Plus } from "lucide-react";

export default function BannerHeader({ onCreateBanner }) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            theme === "dark"
              ? "bg-orange-500/10"
              : "bg-orange-100"
          }`}
        >
          <Image
            size={28}
            className="text-orange-500"
          />
        </div> */}

        <div>
          <h1
            className={`text-3xl font-bold ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Banner Management
          </h1>

          <p
            className={`mt-1 text-sm ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Manage promotional banners displayed throughout the application.
          </p>
        </div>
      </div>

      {/* Right */}
      <motion.button
        whileHover={{
          scale: 1.04,
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
        onClick={onCreateBanner}
        className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-700"
      >
        <Plus size={18} />
        Create Banner
      </motion.button>
    </div>
  );
}