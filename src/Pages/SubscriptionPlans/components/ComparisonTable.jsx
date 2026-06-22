import {
  Check,
  Minus,
} from "lucide-react";

export default function ComparisonTable({ plans }) {
  const featureMatrix = [
    {
      feature: "Multi Branch Access",
      Basic: false,
      Standard: true,
      Premium: true,
      Elite: true,
    },
    {
      feature: "Group Classes",
      Basic: true,
      Standard: true,
      Premium: true,
      Elite: true,
    },
    {
      feature: "Personal Trainer",
      Basic: false,
      Standard: true,
      Premium: true,
      Elite: true,
    },
    {
      feature: "Nutrition Consultation",
      Basic: false,
      Standard: false,
      Premium: true,
      Elite: true,
    },
    {
      feature: "Pool & Spa Access",
      Basic: false,
      Standard: false,
      Premium: true,
      Elite: true,
    },
    {
      feature: "VIP Locker Room",
      Basic: false,
      Standard: false,
      Premium: true,
      Elite: true,
    },
    {
      feature: "Priority Booking",
      Basic: false,
      Standard: false,
      Premium: false,
      Elite: true,
    },
    {
      feature: "Guest Passes",
      Basic: false,
      Standard: false,
      Premium: false,
      Elite: true,
    },
    {
      feature: "Unlimited Classes",
      Basic: false,
      Standard: false,
      Premium: true,
      Elite: true,
    },
    {
      feature: "Dedicated Locker",
      Basic: false,
      Standard: false,
      Premium: false,
      Elite: true,
    },
  ];

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
                bg-gray-50
                dark:bg-[#060816]
                border-b
                border-gray-200
                dark:border-[#1B2440]
              "
            >
              <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">
                FEATURES
              </th>

              {plans.map((plan) => (
                <th
                  key={plan._id}
                  className="px-6 py-5 text-center"
                >
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>

                    <p className="mt-1 text-[#F96B00] font-semibold">
                      ₹{plan.amount}/{plan.durationDays}
                    </p>

                    {plan.popular && (
                      <span
                        className="
                          mt-2
                          px-3
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
                        Most Popular
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {featureMatrix.map((row, index) => (
              <tr
                key={index}
                className="
                  border-b
                  border-gray-100
                  dark:border-[#1B2440]
                  hover:bg-gray-50
                  dark:hover:bg-[#060816]
                  transition-all
                "
              >
                {/* Feature Name */}
                <td
                  className="
                    px-6
                    py-5
                    font-medium
                    text-gray-900
                    dark:text-white
                  "
                >
                  {row.feature}
                </td>

                {/* Basic */}
                <td className="px-6 py-5 text-center">
                  {row.Basic ? (
                    <Check
                      size={18}
                      className="mx-auto text-green-500"
                    />
                  ) : (
                    <Minus
                      size={18}
                      className="mx-auto text-gray-400"
                    />
                  )}
                </td>

                {/* Standard */}
                <td className="px-6 py-5 text-center">
                  {row.Standard ? (
                    <Check
                      size={18}
                      className="mx-auto text-green-500"
                    />
                  ) : (
                    <Minus
                      size={18}
                      className="mx-auto text-gray-400"
                    />
                  )}
                </td>

                {/* Premium */}
                <td className="px-6 py-5 text-center">
                  {row.Premium ? (
                    <Check
                      size={18}
                      className="mx-auto text-green-500"
                    />
                  ) : (
                    <Minus
                      size={18}
                      className="mx-auto text-gray-400"
                    />
                  )}
                </td>

                {/* Elite */}
                <td className="px-6 py-5 text-center">
                  {row.Elite ? (
                    <Check
                      size={18}
                      className="mx-auto text-green-500"
                    />
                  ) : (
                    <Minus
                      size={18}
                      className="mx-auto text-gray-400"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}