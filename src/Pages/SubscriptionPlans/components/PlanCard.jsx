import { motion } from "framer-motion";
import {
  Shield,
  Star,
  Zap,
  Crown,
  Check,
} from "lucide-react";

const icons = {
  Basic: Shield,
  Standard: Star,
  Premium: Zap,
  Elite: Crown,
};

export default function PlanCard({
  plan,
}) {
  const Icon = icons[plan.name];

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        relative
        p-6
        rounded-3xl
        bg-white
        dark:bg-[#0B1120]
        border
        border-gray-200
        dark:border-[#1B2440]
        shadow-lg
      "
    >
      {plan.popular && (
        <div
          className="
            absolute
            top-0
            right-0
            px-4
            py-1
            rounded-bl-xl
            bg-[#F96B00]
            text-white
            text-xs
            font-semibold
          "
        >
          POPULAR
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div
          className="
            w-12 h-12
            rounded-xl
            flex items-center justify-center
            bg-orange-100
            dark:bg-orange-500/10
          "
        >
          <Icon
            size={22}
            className="text-[#F96B00]"
          />
        </div>

        <div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">
            {plan.name}
          </h3>

          <p className="text-sm text-gray-500">
            {plan.subscribers} members
          </p>
        </div>
      </div>

      <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
        ${plan.price}
        <span className="text-lg text-gray-500">
          /month
        </span>
      </h2>

      <div className="mt-6 space-y-3">
        {plan.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <Check
              size={16}
              className="text-[#F96B00]"
            />

            <span className="text-gray-700 dark:text-gray-300">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        className="
          mt-8
          w-full
          py-3
          rounded-xl
          font-medium
          text-white
          bg-[#F96B00]
          hover:bg-orange-600
        "
      >
        Manage Plan
      </button>
    </motion.div>
  );
}