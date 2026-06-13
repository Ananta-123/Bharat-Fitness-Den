// Navbar.jsx

import {
  Bell,
  User,
  Menu,
  LogOut,
} from "lucide-react";

import { motion } from "framer-motion";

import ThemeToggle from "./ThemeToggle";

import { useNavigate } from "react-router-dom";

const Navbar = ({ setMobileOpen }) => {
  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");

    navigate("/login");
  };

  return (
    <header
      className="
        sticky top-0 z-30
        h-20

        bg-white/95
        dark:bg-[#060816]/95

        border-b
        border-gray-200
        dark:border-white/5

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

              h-11 w-11
              rounded-xl

              border
              border-gray-200
              dark:border-white/10

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
              className="text-[#F96B00]"
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
          <ThemeToggle size={18}  />

          {/* PROFILE BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              navigate("/profile")
            }
            className="
              h-11

              px-3

              rounded-2xl

              

              bg-white
              dark:bg-[#111827]

              flex items-center gap-3

              transition-all duration-300
            "
          >
            {/* AVATAR */}
            <User size={18} className="text-[#F96B00]" />

            
          </motion.button>

          {/* LOGOUT BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleLogout}
            className="
              h-11

              px-4

              rounded-2xl

              

              bg-red-50
              dark:bg-red-500/10

              flex items-center gap-2

              text-red-500

              transition-all duration-300
            "
          >
            <LogOut size={18} />

            
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;