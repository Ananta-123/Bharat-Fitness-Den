
// Navbar.jsx

import { useState, useRef, useEffect } from "react";

import {
  Bell,
  User,
  Menu,
  LogOut,
  MoreVertical,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import ThemeToggle from "./ThemeToggle";

import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../Api/authApi.js";

const Navbar = ({ setMobileOpen }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  // CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // LOGOUT HANDLER
const handleLogout = async () => {

  try {
    await logoutAdmin();
    localStorage.removeItem("token");
    localStorage.removeItem(
      "refreshToken"
    );
    localStorage.removeItem("user");
    localStorage.removeItem(
      "adminAuth"
    );
    navigate("/login");
  } catch (error) {
    console.log(error);
    alert("Logout failed");
  }
};

  return (
    <header
      className="
        sticky
        top-0
        z-30

        h-16
        sm:h-20

        border-b
        border-gray-200
        dark:border-white/5

        bg-white/95
        dark:bg-[#060816]/95

        backdrop-blur-xl

        transition-all
        duration-300
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between

          px-3
          sm:px-4
          md:px-6
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* MOBILE SIDEBAR BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              border
              border-gray-200
              dark:border-white/10

              bg-white
              dark:bg-[#111827]

              text-[#F96B00]

              transition-all
              duration-300

              lg:hidden
            "
          >
            <Menu size={20} />
          </button>

          {/* TITLE */}
          <div>
            <h1
              className="
                text-lg
                font-bold

                text-gray-900
                dark:text-white

                sm:text-2xl
              "
            >
              Dashboard
            </h1>

            <p
              className="
                hidden
                text-sm

                text-gray-600
                dark:text-gray-400

                sm:block
              "
            >
              Welcome back, Admin
            </p>
          </div>
        </div>

        {/* DESKTOP ACTIONS */}
        <div
          className="
            hidden
            items-center
            gap-3

            lg:flex
          "
        >
          {/* NOTIFICATION */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative

              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              bg-white
              dark:bg-[#111827]

              text-[#F96B00]
            "
          >
            <Bell size={20} />

            <span
              className="
                absolute
                right-2
                top-2

                h-2.5
                w-2.5

                rounded-full
                bg-[#F96B00]
              "
            />
          </motion.button>

          {/* THEME */}
          <ThemeToggle size={18} />

          {/* PROFILE */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/profile")
            }
            className="
              flex
              h-11
              items-center
              gap-2

              rounded-2xl

              bg-white
              dark:bg-[#111827]

              px-4

              transition-all
            "
          >
            <User
              size={18}
              className="text-[#F96B00]"
            />

            <span
              className="
                text-sm
                font-medium

                text-gray-700
                dark:text-gray-200
              "
            >
              Profile
            </span>
          </motion.button>

          {/* LOGOUT */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="
              flex
              h-11
              items-center
              gap-2

              rounded-2xl

              bg-red-50
              px-4

              text-red-500

              dark:bg-red-500/10
            "
          >
            <LogOut size={18} />

            <span className="text-sm font-medium">
              Logout
            </span>
          </motion.button>
        </div>

        {/* MOBILE/TABLET MENU */}
        <div
          className="
            relative

            lg:hidden
          "
          ref={dropdownRef}
        >
          {/* 3 DOT BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              border
              border-gray-200
              dark:border-white/10

              bg-white
              dark:bg-[#111827]

              text-gray-700
              dark:text-white

              transition-all
            "
          >
            <MoreVertical size={20} />
          </button>

          {/* DROPDOWN */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  absolute
                  right-0
                  top-14
                  z-50

                  w-60

                  overflow-hidden

                  rounded-2xl

                  border
                  border-gray-200
                  dark:border-white/10

                  bg-white
                  dark:bg-[#111827]

                  shadow-2xl
                "
              >
                {/* PROFILE */}
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3

                    px-4
                    py-4

                    text-left

                    text-gray-700
                    dark:text-white

                    transition-all

                    hover:bg-gray-100
                    dark:hover:bg-white/5
                  "
                >
                  <User
                    size={18}
                    className="text-[#F96B00]"
                  />

                  <span className="text-sm font-medium">
                    My Profile
                  </span>
                </button>

                {/* NOTIFICATIONS */}
                <button
                  className="
                    flex
                    w-full
                    items-center
                    gap-3

                    px-4
                    py-4

                    text-left

                    text-gray-700
                    dark:text-white

                    transition-all

                    hover:bg-gray-100
                    dark:hover:bg-white/5
                  "
                >
                  <Bell
                    size={18}
                    className="text-[#F96B00]"
                  />

                  <span className="text-sm font-medium">
                    Notifications
                  </span>
                </button>

                {/* THEME */}
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    px-4
                    py-4
                  "
                >
                  <span
                    className="
                      text-sm
                      font-medium

                      text-gray-700
                      dark:text-white
                    "
                  >
                    Theme
                  </span>

                  <ThemeToggle size={18} />
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3

                    border-t
                    border-gray-200
                    dark:border-white/10

                    px-4
                    py-4

                    text-left
                    text-red-500

                    transition-all

                    hover:bg-red-50
                    dark:hover:bg-red-500/10
                  "
                >
                  <LogOut size={18} />

                  <span className="text-sm font-medium">
                    Logout
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

