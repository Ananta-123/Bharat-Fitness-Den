import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function LoadingSkeleton() {
  const { theme } = useTheme();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Table Header */}
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
            ].map((item) => (
              <th
                key={item}
                className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest ${
                  theme === "dark"
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>

        {/* Skeleton Rows */}
        <tbody>
          {[...Array(6)].map((_, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.08,
              }}
              className={`border-b ${
                theme === "dark"
                  ? "border-white/5"
                  : "border-gray-100"
              }`}
            >
              {/* Member */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 animate-pulse rounded-full ${
                      theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  />

                  <div className="space-y-2">
                    <div
                      className={`h-4 w-32 animate-pulse rounded ${
                        theme === "dark"
                          ? "bg-gray-700"
                          : "bg-gray-200"
                      }`}
                    />

                    <div
                      className={`h-3 w-20 animate-pulse rounded ${
                        theme === "dark"
                          ? "bg-gray-800"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>
                </div>
              </td>

              {/* Product */}
              <td className="px-6 py-5">
                <div
                  className={`h-4 w-40 animate-pulse rounded ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                />
              </td>

              {/* Qty */}
              <td className="px-6 py-5">
                <div
                  className={`h-4 w-8 animate-pulse rounded ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                />
              </td>

              {/* Value */}
              <td className="px-6 py-5">
                <div
                  className={`h-4 w-20 animate-pulse rounded ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                />
              </td>

              {/* Date */}
              <td className="px-6 py-5">
                <div
                  className={`h-4 w-24 animate-pulse rounded ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                />
              </td>

              {/* Status */}
              <td className="px-6 py-5">
                <div
                  className={`h-8 w-24 animate-pulse rounded-full ${
                    theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                />
              </td>

              {/* Action */}
              <td className="px-6 py-5">
                <div className="flex gap-2">
                  <div
                    className={`h-9 w-20 animate-pulse rounded-lg ${
                      theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`h-9 w-20 animate-pulse rounded-lg ${
                      theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}