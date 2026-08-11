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
      {/* <button
        onClick={() => setMobileOpen(true)}
        className="
          md:hidden
          fixed top-4 left-4 z-50

          p-2
          rounded-xl

          bg-lightCard
          dark:bg-darkCard

          

          text-lightText
          dark:text-darkText

          

          transition-all duration-300
        "
      >
        <Menu size={22} />
      </button> */}

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

          

          flex flex-col

          

          transition-colors duration-300

          md:translate-x-0

          ${mobileOpen
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

            

            transition-colors duration-300
          "
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 overflow-hidden">
            {/* LOGO */}
            <div
              className="
      flex items-center justify-center
      shrink-0
    "
            >
              <img
                src="https://res.cloudinary.com/dl58sdjnk/image/upload/v1781975759/ChatGPT_Image_Jun_20_2026_10_45_43_PM_yvuejo.png"
                alt="logo"
                className="
        w-14 h-14
        object-contain

        scale-125

        transition-all duration-300
      "
              />
            </div>

            {/* BRAND TEXT */}
            {!collapsed && (
              <div className="leading-none">
                {/* BHARAT */}
                <h1
                  className="
          text-xl
    font-extrabold
    tracking-[0.32em]
    uppercase

    bg-gradient-to-r
    from-[#8B0000]
    to-[#F96B00]

    bg-clip-text
    text-transparent

    
        "
                >
                  BHARAT
                </h1>

                {/* FITNESS DEN */}
                <h2
                  className="
          mt-1

          text-sm
          font-semibold
          tracking-[0.2em]

          text-lightText
          dark:text-darkText

          transition-colors duration-300
        "
                >
                  FITNESS DEN
                </h2>

                
              </div>
            )}
          </div>

          {/* DESKTOP COLLAPSE BUTTON */}
          <button
  onClick={() => setCollapsed(!collapsed)}
  className={`
  hidden md:flex

  absolute
  top-1/2
  right-[-16px]
  -translate-y-1/2

  items-center justify-center

  rounded-full

  bg-gradient-to-r
  from-[#8B0000]
  to-[#F96B00]

  text-white

  

  

  hover:scale-105

  transition-all duration-300

  z-50

  ${
    collapsed
      ? "h-8 w-8"
      : "h-10 w-10"
  }
`}
>
            {collapsed ? (
  <ChevronRight size={14} />
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

              

              p-4

              transition-all duration-300
            "
          >
            {collapsed ? (
  <div
    className="
      flex flex-col
      items-center
      justify-center

      leading-none
      text-center
    "
  >
    <span
      className="
        text-sm
        font-extrabold

        bg-gradient-to-r
        from-[#8B0000]
        to-[#F96B00]

        bg-clip-text
        text-transparent

        uppercase
      "
    >
      PRO
    </span>

    <span
      className="
        mt-1

        text-sm
        font-extrabold

        bg-gradient-to-r
        from-[#8B0000]
        to-[#F96B00]

        bg-clip-text
        text-transparent

        uppercase
      "
    >
      PLAN
    </span>
  </div>
) : (
  <>
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
  </>
)}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;