import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  TicketPercent,
  BadgeCheck,
  Clock3,
  CalendarDays,
  TrendingUp,
  Percent,
} from "lucide-react";

export default function OfferStats({
  totalOffers = 0,
  activeOffers = 0,
  expiredOffers = 0,
  upcomingOffers = 0,
}) {
  const { theme } = useTheme();

  const stats = [
    {
      title: "Total Offers",
      value: totalOffers,
      subtitle: "All promotional offers",
      icon: TicketPercent,
      color: "orange",
    },
    {
      title: "Active Offers",
      value: activeOffers,
      subtitle: "Currently running",
      icon: BadgeCheck,
      color: "green",
    },
    {
      title: "Expired",
      value: expiredOffers,
      subtitle: "Needs review",
      icon: Clock3,
      color: "red",
    },
    {
      title: "Upcoming",
      value: upcomingOffers,
      subtitle: "Scheduled offers",
      icon: CalendarDays,
      color: "blue",
    },
  ];

  const getIconClasses = (color) => {
    switch (color) {
      case "orange":
        return {
          bg: "bg-orange-500/15",
          text: "text-orange-500",
          glow: "bg-orange-500",
        };

      case "green":
        return {
          bg: "bg-green-500/15",
          text: "text-green-500",
          glow: "bg-green-500",
        };

      case "red":
        return {
          bg: "bg-red-500/15",
          text: "text-red-500",
          glow: "bg-red-500",
        };

      case "blue":
        return {
          bg: "bg-blue-500/15",
          text: "text-blue-500",
          glow: "bg-blue-500",
        };

      default:
        return {
          bg: "bg-orange-500/15",
          text: "text-orange-500",
          glow: "bg-orange-500",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        const colors = getIconClasses(item.color);

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300
            ${
              theme === "dark"
                ? "bg-[#10131F]/90 border-gray-800 hover:border-orange-500/40"
                : "bg-white border-gray-200 hover:border-orange-300"
            }
            shadow-sm hover:shadow-xl`}
          >
            {/* Glow */}

            <div
              className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-20 ${colors.glow}`}
            />

            {/* Header */}

            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-xs uppercase tracking-[0.18em] font-semibold
                  ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {item.title}
                </p>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg}`}
              >
                <Icon
                  className={`${colors.text}`}
                  size={22}
                />
              </div>
            </div>

            {/* Value */}

            <div className="mt-6">
              <h2
                className={`text-4xl font-bold
                ${
                  theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {item.value}
              </h2>

              <div className="flex items-center gap-2 mt-3">
                <TrendingUp
                  size={16}
                  className="text-green-500"
                />

                <span
                  className={`text-sm
                  ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {item.subtitle}
                </span>
              </div>
            </div>

            {/* Footer */}

            <div
              className={`mt-6 pt-4 border-t flex items-center justify-between
              ${
                theme === "dark"
                  ? "border-gray-800"
                  : "border-gray-100"
              }`}
            >
              <span
                className={`text-xs font-medium
                ${
                  theme === "dark"
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                Updated Today
              </span>

              <div className="flex items-center gap-1 text-orange-500">
                <Percent size={14} />
                <span className="text-xs font-semibold">
                  Offers
                </span>
              </div>
            </div>

            {/* Accent Line */}

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-[#F96B00] to-orange-400" />
          </motion.div>
        );
      })}
    </div>
  );
}