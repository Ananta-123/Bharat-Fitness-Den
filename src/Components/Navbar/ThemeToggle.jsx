import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="
          h-11 w-11
          rounded-2xl
          
          bg-white
          dark:bg-[#111827]
        "
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      
      whileTap={{ scale: 0.9 }}
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="
        h-11 w-11
        rounded-2xl
        
        bg-white
        dark:bg-[#111827]
        flex items-center justify-center
        shadow-lg
        shadow-black/5
        dark:shadow-black/30
       
        transition-all duration-300
      "
    >
      {isDark ? (
        <Sun
          size={20}
          strokeWidth={2.5}
          className="text-orange-500"
        />
      ) : (
        <Moon
          size={20}
          strokeWidth={2.5}
          className="text-gray-900"
        />
      )}
    </motion.button>
  );
};

export default ThemeToggle;