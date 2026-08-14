import { motion } from "framer-motion";

import {
  RefreshCcw,
  Database,
} from "lucide-react";

const EmptyState = ({
  title = "No Data Available",
  description =
    "There is currently no data to display.",
  icon: Icon = Database,
  buttonText = "Try Again",
  onRetry,
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
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-xl
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-10
          text-center
          shadow-sm
          dark:border-zinc-800
          dark:bg-[#0F1324]
        "
      >
        <motion.div
          initial={{
            scale: 0.8,
          }}
          animate={{
            scale: 1,
          }}
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#8B0000]
            to-[#F96B00]
            shadow-lg
          "
        >
          <Icon
            size={42}
            className="text-white"
          />
        </motion.div>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
          {description}
        </p>

        {onRetry && (
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onRetry}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#8B0000]
              to-[#F96B00]
              px-6
              py-3
              font-medium
              text-white
              shadow-lg
            "
          >
            <RefreshCcw size={18} />

            {buttonText}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState;