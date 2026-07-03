import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Plus, TicketPercent } from "lucide-react";

export default function OfferHeader({ onCreate }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
    >
      {/* Left */}

      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#8B0000] to-[#F96B00]"
              : "bg-gradient-to-br from-orange-500 to-red-500"
          }`}
        >
          <TicketPercent className="w-7 h-7 text-white" />
        </div>

        <div>
          <h1
            className={`text-3xl font-bold tracking-tight
            ${
              theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Offers & Coupons
          </h1>

          <p
            className={`mt-1 text-sm
            ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Manage promotional offers and discount campaigns
          </p>
        </div>
      </div>

      {/* Right */}

      <motion.button
        whileHover={{
          scale: 1.03,
          y: -2,
        }}
        whileTap={{ scale: 0.96 }}
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2
                   px-6 py-3 rounded-xl font-semibold
                   bg-gradient-to-r from-[#8B0000] to-[#F96B00]
                   text-white shadow-lg
                   hover:shadow-orange-500/30
                   transition-all duration-300"
      >
        <Plus size={20} />

        Create Offer
      </motion.button>
    </motion.div>
  );
}