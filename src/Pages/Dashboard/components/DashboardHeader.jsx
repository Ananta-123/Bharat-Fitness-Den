import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Bell,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";

const DashboardHeader = () => {
  const { theme, setTheme } = useTheme();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {greeting}, Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              pl-10
              pr-4
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-[#F96B00]
              dark:border-zinc-700
              dark:bg-[#111827]
              dark:text-white
              dark:placeholder:text-gray-500
            "
          />
        </div>

        {/* Notification */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
            transition
            hover:border-[#F96B00]
            dark:border-zinc-700
            dark:bg-[#111827]
          "
        >
          <Bell
            size={20}
            className="text-gray-600 dark:text-gray-300"
          />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
            transition
            hover:border-[#F96B00]
            dark:border-zinc-700
            dark:bg-[#111827]
          "
        >
          <Settings
            size={20}
            className="text-gray-600 dark:text-gray-300"
          />
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            bg-white
            transition
            hover:border-[#F96B00]
            dark:border-zinc-700
            dark:bg-[#111827]
          "
        >
          {theme === "dark" ? (
            <Sun
              size={20}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={20}
              className="text-[#02045D]"
            />
          )}
        </motion.button>

        {/* Profile */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="
            flex
            cursor-pointer
            items-center
            gap-3
            rounded-xl
            border
            border-gray-200
            bg-white
            px-3
            py-2
            transition
            hover:border-[#F96B00]
            dark:border-zinc-700
            dark:bg-[#111827]
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-[#8B0000]
              to-[#F96B00]
              font-semibold
              text-white
            "
          >
            AD
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Admin
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Super Admin
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;