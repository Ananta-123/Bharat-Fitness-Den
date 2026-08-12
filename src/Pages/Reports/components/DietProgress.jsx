import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import {
  Apple,
  Coffee,
  Utensils,
} from "lucide-react";

export default function DietProgress({
  data = [],
}) {
  const { theme } = useTheme();

  const diet = data?.[0] || {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
  };

  const breakfast = Number(
    diet.breakfast || 0
  );

  const lunch = Number(
    diet.lunch || 0
  );

  const dinner = Number(
    diet.dinner || 0
  );

  const maxValue = Math.max(
    breakfast,
    lunch,
    dinner,
    1
  );

  const meals = [
    {
      title: "Breakfast",
      value: breakfast,
      icon: Coffee,
      color: "bg-orange-500",
      text: "text-orange-500",
    },
    {
      title: "Lunch",
      value: lunch,
      icon: Utensils,
      color: "bg-green-500",
      text: "text-green-500",
    },
    {
      title: "Dinner",
      value: dinner,
      icon: Apple,
      color: "bg-purple-500",
      text: "text-purple-500",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`
        rounded-2xl
        border
        p-6

        ${
          theme === "dark"
            ? "bg-[#10131F]/90 border-gray-800"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* Header */}
      <div className="
        flex
        items-center
        justify-between
        mb-7
      ">
        <div>
          <h2
            className={`
              text-xl
              font-semibold
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            Diet Progress
          </h2>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Completed meals recorded
          </p>
        </div>

        <div className="
          w-12
          h-12
          rounded-xl
          bg-green-500/15
          flex
          items-center
          justify-center
        ">
          <Apple
            size={24}
            className="text-green-500"
          />
        </div>
      </div>

      {/* Meal Progress */}
      <div className="space-y-6">
        {meals.map((meal) => {
          const Icon = meal.icon;

          const percentage = Math.round(
            (meal.value / maxValue) * 100
          );

          return (
            <div key={meal.title}>
              <div className="
                flex
                items-center
                justify-between
                mb-2
              ">
                <div className="
                  flex
                  items-center
                  gap-3
                ">
                  <div
                    className={`
                      w-9
                      h-9
                      rounded-lg
                      ${meal.color}/15
                      flex
                      items-center
                      justify-center
                    `}
                  >
                    <Icon
                      size={18}
                      className={meal.text}
                    />
                  </div>

                  <div>
                    <p
                      className={`
                        text-sm
                        font-semibold
                        ${
                          theme === "dark"
                            ? "text-gray-200"
                            : "text-gray-700"
                        }
                      `}
                    >
                      {meal.title}
                    </p>

                    <p className="
                      text-xs
                      text-gray-500
                    ">
                      Completed
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    text-lg
                    font-bold
                    ${meal.text}
                  `}
                >
                  {meal.value.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div className="
                h-3
                w-full
                rounded-full
                bg-gray-200
                dark:bg-gray-800
                overflow-hidden
              ">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${percentage}%`,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  className={`
                    h-full
                    rounded-full
                    ${meal.color}
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <div
        className={`
          mt-7
          rounded-xl
          p-4
          text-sm
          ${
            theme === "dark"
              ? "bg-[#161A2C] text-gray-400"
              : "bg-gray-50 text-gray-500"
          }
        `}
      >
        The values represent the number of recorded
        meal completions, not percentages.
      </div>
    </motion.div>
  );
}