import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Gift, Plus } from "lucide-react";

export default function EmptyState({
  title = "No Offers Found",
  description = "Create your first promotional offer to start attracting more customers.",
  buttonText = "Create Offer",
  onClick,
}) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`rounded-3xl border p-12 flex flex-col items-center justify-center text-center
      ${
        theme === "dark"
          ? "bg-[#10131F]/90 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Icon */}

      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
        }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl" />

        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#8B0000] to-[#F96B00] flex items-center justify-center shadow-xl">
          <Gift
            size={42}
            className="text-white"
          />
        </div>
      </motion.div>

      {/* Title */}

      <h2
        className={`mt-8 text-2xl font-bold
        ${
          theme === "dark"
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        {title}
      </h2>

      {/* Description */}

      <p
        className={`mt-3 max-w-lg leading-7
        ${
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {description}
      </p>

      {/* Button */}

      <motion.button
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={onClick}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl
                   bg-gradient-to-r from-[#8B0000] to-[#F96B00]
                   text-white font-semibold shadow-lg
                   hover:shadow-orange-500/30 transition-all duration-300"
      >
        <Plus size={20} />
        {buttonText}
      </motion.button>

      {/* Bottom Info */}

      <div
        className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-sm
        ${
          theme === "dark"
            ? "text-gray-500"
            : "text-gray-400"
        }`}
      >
        <div>🎁 Unlimited Offers</div>
        <div>⚡ Instant Activation</div>
        <div>📈 Increase Sales</div>
      </div>
    </motion.div>
  );
}