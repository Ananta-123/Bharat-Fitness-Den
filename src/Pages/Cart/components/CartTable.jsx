import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ShoppingCart,
  RotateCcw,
  Eye,
  Package,
} from "lucide-react";

export default function CartTable({ carts }) {
  const { theme } = useTheme();

  const getStatusBadge = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-amber-500/15 text-amber-500 border border-amber-500/20";

      case "completed":
        return "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20";

      case "abandoned":
        return "bg-red-500/15 text-red-500 border border-red-500/20";

      default:
        return theme === "dark"
          ? "bg-slate-700 text-slate-300 border border-slate-600"
          : "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Header */}
        <thead
          className={
            theme === "dark"
              ? "bg-[#111827]"
              : "bg-gray-50"
          }
        >
          <tr
            className={`border-b ${
              theme === "dark"
                ? "border-white/10"
                : "border-gray-200"
            }`}
          >
            {[
              "Member",
              "Product",
              "Qty",
              "Value",
              "Added Date",
              "Status",
              "Action",
            ].map((head) => (
              <th
                key={head}
                className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {carts.map((cart, index) => {
            const member =
              cart.memberName ||
              cart.user?.name ||
              cart.member ||
              "-";

            const product =
              cart.productName ||
              cart.product?.name ||
              cart.product ||
              "-";

            const qty =
              cart.quantity ||
              cart.qty ||
              0;

            const value =
              cart.total ||
              cart.totalAmount ||
              cart.value ||
              0;

            const status =
              cart.status || "Pending";

            const date = cart.createdAt
              ? new Date(cart.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "-";

            return (
              <motion.tr
                key={cart._id || index}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(249,107,0,.05)"
                      : "rgba(249,107,0,.08)",
                }}
                className={`transition-colors border-b ${
                  theme === "dark"
                    ? "border-white/5"
                    : "border-gray-100"
                }`}
              >
                {/* Member */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#C11200] to-[#F96B00] text-white">
                      <ShoppingCart size={18} />
                    </div>

                    <div>
                      <h3
                        className={`font-semibold ${
                          theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {member}
                      </h3>

                      <p
                        className={`text-xs ${
                          theme === "dark"
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
                        Customer
                      </p>
                    </div>
                  </div>
                </td>

                {/* Product */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Package
                      size={16}
                      className="text-[#F96B00]"
                    />

                    <span
                      className={
                        theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-700"
                      }
                    >
                      {product}
                    </span>
                  </div>
                </td>

                {/* Qty */}
                <td
                  className={`px-6 py-5 font-semibold ${
                    theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {qty}
                </td>

                {/* Value */}
                <td className="px-6 py-5 font-semibold text-[#F96B00]">
                  ₹{Number(value).toLocaleString("en-IN")}
                </td>

                {/* Date */}
                <td
                  className={`px-6 py-5 ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {date}
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-5">
                  {status.toLowerCase() === "abandoned" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-500 transition"
                    >
                      <RotateCcw size={16} />
                      Recover
                    </motion.button>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 rounded-lg bg-[#F96B00]/10 px-3 py-2 text-sm font-medium text-[#F96B00] transition"
                      >
                        <Eye size={16} />
                        View
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-green-500/10 px-3 py-2 text-sm font-medium text-green-500 transition"
                      >
                        Convert
                      </motion.button>
                    </div>
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}