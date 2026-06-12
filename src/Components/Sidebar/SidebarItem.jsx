import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarItem = ({ item, collapsed }) => {
  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <motion.div
          whileHover={{
            scale: 1.02,
            x: 4,
          }}
          className={`
            relative flex items-center gap-4
            px-4 py-3 rounded-2xl
            transition-all duration-300
            cursor-pointer group overflow-hidden
            
            ${isActive
              ? "bg-gradient-to-r from-[#8B0000] to-[#F96B00] text-white shadow-lg shadow-orange-500/20"
              : `
      text-gray-400

      hover:bg-gradient-to-r
      hover:from-[#8B0000]/20
      hover:to-[#F96B00]/20

      hover:text-black
dark:hover:text-white
      
    `
            }
          `}
        >
          {/* Glow Effect */}
          {isActive && (
            <div className="absolute inset-0 bg-orange-500/10 blur-xl" />
          )}

          <item.icon
            size={22}
            className={`
              relative z-10
              ${isActive ? "text-white" : "text-gray-400"}
            `}
          />

          {!collapsed && (
            <span className="relative z-10 font-medium whitespace-nowrap">
              {item.title}
            </span>
          )}
        </motion.div>
      )}
    </NavLink>
  );
};

export default SidebarItem;