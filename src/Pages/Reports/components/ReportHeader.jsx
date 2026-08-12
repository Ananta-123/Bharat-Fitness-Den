import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import {
  FileDown,
  BarChart3,
} from "lucide-react";

export default function ReportHeader() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
      "
    >
      {/* Left */}
      <div className="
        flex
        items-start
        gap-4
      ">
        <div className="
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          shadow-lg
          bg-gradient-to-br
          from-[#8B0000]
          to-[#F96B00]
        ">
          <BarChart3
            className="w-7 h-7 text-white"
          />
        </div>

        <div>
          <h1
            className={`
              text-3xl
              font-bold
              tracking-tight
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            Reports & Analytics
          </h1>

          <p
            className={`
              mt-1
              text-sm
              ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            Revenue, memberships, workouts,
            diet and branch performance
          </p>
        </div>
      </div>

      {/* Export */}
      <motion.button
        type="button"
        whileHover={{
          scale: 1.03,
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className={`
          flex
          items-center
          justify-center
          gap-2
          px-5
          py-3
          rounded-xl
          font-medium
          transition-all
          border
          shadow-sm

          ${
            theme === "dark"
              ? "bg-[#10131F] border-gray-700 text-gray-200 hover:border-orange-500 hover:text-orange-400"
              : "bg-white border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600"
          }
        `}
      >
        <FileDown size={18} />

        Export Report
      </motion.button>
    </motion.div>
  );
}