import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function SubscriptionHeader({
  onCreatePlan,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Subscription Plans
        </h1>

        <p className="mt-1 text-gray-500 dark:text-gray-400">
          1,986 active subscribers
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCreatePlan}
        className="
          flex items-center gap-2
          px-5 py-3
          rounded-xl
          font-medium
          text-white
          bg-[#F96B00]
          hover:bg-orange-600
          shadow-lg shadow-orange-500/20
          transition-all
        "
      >
        <Plus size={18} />
        New Plan
      </motion.button>
    </div>
  );
}