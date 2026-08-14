import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "from-[#8B0000] to-[#F96B00]",
}) => {
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
        y: -5,
        scale: 1.01,
      }}
      transition={{
        duration: 0.3,
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
        dark:border-zinc-800
        dark:bg-[#0F1324]
      "
    >
      <div
        className="
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-[#F96B00]/10
          blur-2xl
        "
      />

      <div className="relative flex items-start justify-between">

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
            className="
              mt-4
              text-3xl
              font-bold
              tracking-tight
              text-gray-900
              dark:text-white
            "
          >
            {value}
          </motion.h2>

          {subtitle && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className={`
            flex
            h-14
            w-14
            shrink-0
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