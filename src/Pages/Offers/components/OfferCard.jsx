import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  TicketPercent,
  BadgeCheck,
  XCircle,
  Timer,
} from "lucide-react";

export default function OfferCard({
  offer,
  onEdit,
  onDelete,
}) {
  const { theme } = useTheme();

  const today = new Date();
  const startDate = new Date(offer.startDate);
  const endDate = new Date(offer.endDate);

  const isUpcoming = startDate > today;
  const isExpired = endDate < today;

  const getStatus = () => {
    if (!offer.status || isExpired) {
      return {
        label: "Expired",
        color:
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
        icon: XCircle,
      };
    }

    if (isUpcoming) {
      return {
        label: "Upcoming",
        color:
          "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
        icon: Timer,
      };
    }

    return {
      label: "Active",
      color:
        "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
      icon: BadgeCheck,
    };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className={`relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300
      ${
        theme === "dark"
          ? "bg-[#10131F]/90 border-gray-800 hover:border-orange-500/40"
          : "bg-white border-gray-200 hover:border-orange-300"
      }`}
    >
      {/* Gradient */}

      <div className="h-2 bg-gradient-to-r from-[#8B0000] via-[#F96B00] to-orange-400" />

      {/* Body */}

      <div className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-xl bg-orange-500/15 flex items-center justify-center">
              <TicketPercent
                className="text-orange-500"
                size={28}
              />
            </div>

            <div>

              <h2
                className={`text-xl font-bold break-all
                ${
                  theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {offer.title}
              </h2>

              <p
                className={`text-sm mt-1
                ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Coupon Offer
              </p>

            </div>

          </div>

          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
          >
            <StatusIcon size={14} />
            {status.label}
          </span>

        </div>

        {/* Description */}

        <div
          className={`mt-6 rounded-xl p-4
          ${
            theme === "dark"
              ? "bg-[#161A2C]"
              : "bg-gray-50"
          }`}
        >
          <p
            className={`text-sm leading-6
            ${
              theme === "dark"
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            {offer.description}
          </p>
        </div>

        {/* Dates */}

        <div className="mt-6 space-y-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <CalendarDays
                size={17}
                className="text-orange-500"
              />

              <span
                className={`text-sm
                ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Start Date
              </span>
            </div>

            <span
              className={`text-sm font-semibold
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {formatDate(offer.startDate)}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <Clock3
                size={17}
                className="text-red-500"
              />

              <span
                className={`text-sm
                ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                End Date
              </span>
            </div>

            <span
              className={`text-sm font-semibold
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {formatDate(offer.endDate)}
            </span>

          </div>

        </div>

        {/* Footer */}

        <div
          className={`mt-6 pt-5 border-t
          ${
            theme === "dark"
              ? "border-gray-800"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">

            <div>
              <p
                className={`text-xs
                ${
                  theme === "dark"
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                Created
              </p>

              <p
                className={`font-medium text-sm mt-1
                ${
                  theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {formatDate(offer.createdAt)}
              </p>
            </div>

            <div className="flex gap-2">

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={onEdit}
                className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Pencil size={18} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={onDelete}
                className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
              </motion.button>

            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}