import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = "increase",
  iconBg = "from-[#8B0000] to-[#F96B00]",
  loading = false,
}) => {
  if (loading) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          dark:border-zinc-800
          dark:bg-[#0F1324]
          animate-pulse
        "
      >
        <div className="flex justify-between">
          <div className="space-y-3">
            <div className="h-3 w-24 rounded bg-gray-300 dark:bg-zinc-700" />
            <div className="h-8 w-20 rounded bg-gray-300 dark:bg-zinc-700" />
            <div className="h-3 w-28 rounded bg-gray-300 dark:bg-zinc-700" />
          </div>

          <div className="h-14 w-14 rounded-xl bg-gray-300 dark:bg-zinc-700" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-xl
        dark:border-zinc-800
        dark:bg-[#0F1324]
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          -right-8
          -top-8
          h-32
          w-32
          rounded-full
          bg-[#F96B00]/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-[#F96B00]/20
        "
      />

      <div className="relative flex items-start justify-between">
        {/* Left */}
        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-gray-500
              dark:text-gray-400
            "
          >
            {title}
          </p>

          <motion.h2
            initial={{
              scale: 0.9,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              delay: 0.1,
            }}
            className="
              mt-4
              text-4xl
              font-bold
              tracking-tight
              text-gray-900
              dark:text-white
            "
          >
            {value}
          </motion.h2>

          {(subtitle || trend) && (
            <div className="mt-3 flex items-center gap-2">
              {trend && (
                <div
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                    trendType === "increase"
                      ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                  }`}
                >
                  {trendType === "increase" ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}

                  {trend}
                </div>
              )}

              {subtitle && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            ${iconBg}
            shadow-lg
          `}
        >
          {Icon && (
            <Icon
              size={26}
              className="text-white"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatCard;