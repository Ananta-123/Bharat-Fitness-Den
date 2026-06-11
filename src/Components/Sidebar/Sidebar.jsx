import { motion, AnimatePresence } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import { sidebarData } from "./sidebarData";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="
          md:hidden
          fixed top-4 left-4 z-50

          p-2
          rounded-xl

          bg-lightCard
          dark:bg-darkCard

          border
          border-orange-300
          dark:border-orange-500/20

          text-lightText
          dark:text-darkText

          shadow-lg
          shadow-black/5
          dark:shadow-black/30

          transition-all duration-300
        "
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="
              fixed inset-0 z-40 md:hidden

              bg-black/60
              backdrop-blur-sm
            "
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        animate={{
          width: collapsed ? 90 : 280,
        }}
        transition={{
          duration: 0.3,
        }}
        className={`
          fixed top-0 left-0 z-50
          will-change-transform

          h-screen

          bg-lightBg
          dark:bg-darkBg

          border-r
          border-lightBorder
          dark:border-darkBorder

          flex flex-col

          shadow-xl
          shadow-black/5
          dark:shadow-black/40

          transition-colors duration-300

          md:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* TOP SECTION */}
        <div
          className="
            h-20

            flex items-center justify-between

            px-5

            border-b
            border-lightBorder
            dark:border-darkBorder

            transition-colors duration-300
          "
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dl58sdjnk/image/upload/v1781027063/ChatGPT_Image_Jun_9_2026_11_13_48_PM_cpas14.png"
              alt="logo"
              className="w-12 h-12 object-contain shrink-0"
            />

            {!collapsed && (
              <div>
                <h2
                  className="
                    text-lightText
                    dark:text-darkText

                    font-bold
                    text-lg

                    whitespace-nowrap

                    transition-colors duration-300
                  "
                >
                  FITNESS DEN
                </h2>

                <p
                  className="
                    text-lightTextSoft
                    dark:text-darkTextSoft

                    text-xs

                    transition-colors duration-300
                  "
                >
                  Admin Panel
                </p>
              </div>
            )}
          </div>

          {/* DESKTOP COLLAPSE BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              hidden md:flex

              items-center justify-center

              p-2
              rounded-full

              bg-gradient-to-r
              from-[#8B0000]
              to-[#F96B00]

              text-white

              shadow-lg
              shadow-orange-500/20

              hover:scale-105

              transition-all duration-300
            "
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setMobileOpen(false)}
            className="
              md:hidden

              text-lightText
              dark:text-darkText

              transition-colors duration-300
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* MENU */}
        <div
          className="
            flex-1
            overflow-y-auto

            sidebar-scroll

            px-3 py-5
            space-y-2
          "
        >
          {sidebarData.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </div>

        {/* BOTTOM CARD */}
        <div className="p-4">
          <div
            className="
              rounded-2xl

              bg-gradient-to-r
              from-[#8B0000]/20
              to-[#F96B00]/20

              border
              border-orange-500/20

              p-4

              transition-all duration-300
            "
          >
            <h3
              className="
                text-lightText
                dark:text-darkText

                font-semibold

                transition-colors duration-300
              "
            >
              PRO PLAN ACTIVE
            </h3>

            {!collapsed && (
              <p
                className="
                  mt-1
                  text-sm

                  text-lightTextSoft
                  dark:text-darkTextSoft

                  transition-colors duration-300
                "
              >
                All premium features unlocked
              </p>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;