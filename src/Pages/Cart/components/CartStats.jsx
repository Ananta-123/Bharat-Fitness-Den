import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ShoppingCart,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

export default function CartStats({ stats }) {
  const { theme } = useTheme();

  const cards = [
    {
      title: "Pending Carts",
      value: stats.pending,
      subtitle: "Awaiting checkout",
      icon: ShoppingCart,
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-500",
    },
    {
      title: "Pending Value",
      value: `₹${Number(stats.value || 0).toLocaleString("en-IN")}`,
      subtitle: "Potential revenue",
      icon: IndianRupee,
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-500",
    },
    {
      title: "Abandoned",
      value: stats.abandoned,
      subtitle: "Recovery opportunity",
      icon: AlertTriangle,
      iconBg: "bg-red-500/15",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.1,
            }}
            whileHover={{
              y: -5,
              scale: 1.01,
            }}
            className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
              theme === "dark"
                ? "border-white/10 bg-[#0F172A]/70 hover:border-[#F96B00]/40"
                : "border-gray-200 bg-white hover:border-[#F96B00]/40 shadow-sm hover:shadow-lg"
            }`}
          >
            {/* Top Section */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.25em] ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {card.title}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon className={card.iconColor} size={22} />
              </div>
            </div>

            {/* Value */}
            <h2
              className={`text-4xl font-bold ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {card.value}
            </h2>

            {/* Subtitle */}
            <p
              className={`mt-2 text-sm ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {card.subtitle}
            </p>

            {/* Decorative Gradient */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-[#F96B00]/10 to-[#C11200]/10 blur-3xl" />
          </motion.div>
        );
      })}
    </div>
  );
}