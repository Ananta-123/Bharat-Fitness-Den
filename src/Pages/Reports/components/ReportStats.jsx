import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  IndianRupee,
  Users,
  UserCheck,
  Building2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function ReportStats({
  revenue = 0,
  totalUsers = 0,
  activeMembers = 0,
  expiredMembers = 0,
  totalBranches = 0,
}) {
  const { theme } = useTheme();

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${Number(revenue).toLocaleString("en-IN")}`,
      subtitle: "Overall revenue",
      icon: IndianRupee,
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-500",
      trend: "up",
    },
    {
      title: "Total Users",
      value: totalUsers,
      subtitle: "Registered users",
      icon: Users,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-500",
      trend: "up",
    },
    {
      title: "Active Members",
      value: activeMembers,
      subtitle: `${expiredMembers} expired`,
      icon: UserCheck,
      iconBg: "bg-green-500/15",
      iconColor: "text-green-500",
      trend: "up",
    },
    {
      title: "Branches",
      value: totalBranches,
      subtitle: "Gym branches",
      icon: Building2,
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-500",
      trend: "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
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
            className={`
              relative overflow-hidden rounded-2xl border p-6
              transition-all duration-300
              ${
                theme === "dark"
                  ? "bg-[#10131F]/90 border-gray-800 hover:border-orange-500/40"
                  : "bg-white border-gray-200 hover:border-orange-300"
              }
              shadow-sm hover:shadow-xl
            `}
          >
            {/* Glow */}
            <div
              className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-20
                ${
                  card.iconColor === "text-orange-500"
                    ? "bg-orange-500"
                    : card.iconColor === "text-blue-500"
                    ? "bg-blue-500"
                    : card.iconColor === "text-green-500"
                    ? "bg-green-500"
                    : "bg-purple-500"
                }
              `}
            />

            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-xs uppercase tracking-[0.2em] font-semibold ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {card.title}
                </p>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
              >
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>

            {/* Value */}
            <div className="mt-6">
              <h2
                className={`text-3xl font-bold ${
                  theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {card.value}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                {card.trend === "up" ? (
                  <TrendingUp
                    size={15}
                    className="text-green-500"
                  />
                ) : (
                  <TrendingDown
                    size={15}
                    className="text-red-500"
                  />
                )}

                <span
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  {card.subtitle}
                </span>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-400" />
          </motion.div>
        );
      })}
    </div>
  );
}