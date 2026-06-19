import { motion } from "framer-motion";
import {
  Shield,
  Star,
  Zap,
  Crown,
  Pencil,
  Trash2,
} from "lucide-react";

const icons = {
  Basic: Shield,
  Standard: Star,
  Premium: Zap,
  Elite: Crown,
};

export default function PlanManagementTable({
  plans,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        dark:border-[#1B2440]
        bg-white
        dark:bg-[#0B1120]
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          {/* Header */}
          <thead>
            <tr
              className="
                border-b
                border-gray-200
                dark:border-[#1B2440]
                bg-gray-50
                dark:bg-[#060816]
              "
            >
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                PLAN
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                PRICE
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                SUBSCRIBERS
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                REVENUE
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                STATUS
              </th>

              <th className="px-6 py-5 text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                ACTIONS
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {plans.map((plan) => {
              const Icon = icons[plan.name];

              return (
                <tr
                  key={plan._id}
                  className="
                    border-b
                    border-gray-100
                    dark:border-[#1B2440]
                    hover:bg-gray-50
                    dark:hover:bg-[#060816]
                    transition-all
                  "
                >
                  {/* PLAN */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          h-12
                          w-12
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          bg-orange-100
                          dark:bg-orange-500/10
                        "
                      >
                        <Icon
                          size={22}
                          className="text-[#F96B00]"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {plan.name}
                        </h3>

                        {plan.popular && (
                          <span
                            className="
                              inline-flex
                              mt-1
                              px-2
                              py-1
                              rounded-full
                              text-xs
                              font-medium
                              bg-orange-100
                              text-orange-700
                              dark:bg-orange-500/10
                              dark:text-orange-400
                            "
                          >
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-5">
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                      ${plan.price}
                      <span className="text-sm text-gray-500 font-normal">
                        /mo
                      </span>
                    </div>
                  </td>

                  {/* SUBSCRIBERS */}
                  <td className="px-6 py-5">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {plan.subscribers}
                    </span>
                  </td>

                  {/* REVENUE */}
                  <td className="px-6 py-5">
                    <span className="font-bold text-green-600 dark:text-green-400">
                      $
                      {plan.revenue.toLocaleString()}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        bg-green-100
                        text-green-700
                        dark:bg-green-500/10
                        dark:text-green-400
                      "
                    >
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Active
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-3">
                      
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() => onEdit(plan)}
                        className="
                          h-10
                          w-10
                          rounded-full
                          flex
                          items-center
                          justify-center
                          border
                          border-blue-200
                          dark:border-blue-500/20
                          text-blue-600
                          dark:text-blue-400
                        "
                      >
                        <Pencil size={16} />
                      </motion.button>

                      <motion.button
                        whileHover={{
                          scale: 1.1,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() => onDelete(plan)}
                        className="
                          h-10
                          w-10
                          rounded-full
                          flex
                          items-center
                          justify-center
                          border
                          border-red-200
                          dark:border-red-500/20
                          text-red-600
                          dark:text-red-400
                        "
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}