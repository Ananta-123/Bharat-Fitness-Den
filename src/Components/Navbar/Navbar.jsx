import {
  Bell,
  User,
  Menu,
} from "lucide-react";

import { motion } from "framer-motion";

import ThemeToggle from "./ThemeToggle";

const Navbar = ({ setMobileOpen }) => {
  return (
    <header
      className="
        sticky top-0 z-30
        h-20

        

        bg-white/95
        dark:bg-[#060816]/95

        backdrop-blur-xl

        transition-all duration-300
      "
    >
      <div
        className="
          h-full
          flex items-center justify-between
          px-4 md:px-6
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileOpen(true)}
            className="
              md:hidden

              h-4 w-4
              rounded-xl

              

              bg-white
              dark:bg-[#111827]

              text-[#F96B00]

              flex items-center justify-center

              

              transition-all duration-300
            "
          >
            <Menu size={22} />
          </button>

          {/* TITLE */}
          <div>
            <h1
              className="
                text-2xl
                font-bold

                text-gray-900
                dark:text-white

                transition-colors duration-300
              "
            >
              Dashboard
            </h1>

            <p
              className="
                hidden sm:block
                text-sm

                text-gray-600
                dark:text-gray-400

                transition-colors duration-300
              "
            >
              Welcome back, Admin
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          

          {/* NOTIFICATION */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              relative

              h-11 w-11

              rounded-2xl

              

              bg-white
              dark:bg-[#111827]

              flex items-center justify-center

              text-[#F96B00]

              

              transition-all duration-300
            "
          >
            <Bell
              size={20}
              className="
                text-[#F96B00]
              "
            />

            <span
              className="
                absolute
                top-2 right-2

                h-2.5 w-2.5
                rounded-full

                bg-[#F96B00]
              "
            />
          </motion.button>

          {/* THEME TOGGLE */}
          <ThemeToggle />

        {/* PROFILE ICON */}
<motion.button
  whileHover={{
    scale: 1.05,
  }}
  whileTap={{
    scale: 0.95,
  }}
  className="
    h-11 w-11

    rounded-full

    bg-white
    dark:bg-[#111827]

    flex items-center justify-center

    text-[#F96B00]

    transition-all duration-300
  "
>
  <User size={20} />
</motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;