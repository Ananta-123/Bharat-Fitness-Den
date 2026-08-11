import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  Salad,
  Plus,
  Trash2,
  Utensils,
} from "lucide-react";

import { createDiet } from "../../../Api/dietApi.js";
import { getAllGoals } from "../../../Api/goalGroupApi.js";

const MEAL_TYPES = [
  "breakfast",
  "morning_snack",
  "lunch",
  "evening_snack",
  "dinner",
  "post_workout",
];

const createEmptyMeal = () => ({
  mealType: "breakfast",
  foods: [""],
});

export default function CreateDietModal({
  isOpen,
  onClose,
  fetchDiets,
}) {
  const { theme } = useTheme();

  // ==========================================
  // State
  // ==========================================

  const [title, setTitle] = useState("");

  const [goalGroupId, setGoalGroupId] =
    useState("");

  const [goals, setGoals] = useState([]);

  const [meals, setMeals] = useState([
    createEmptyMeal(),
  ]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // ==========================================
  // Load Goal Groups
  // ==========================================

  useEffect(() => {
    if (isOpen) {
      loadGoals();
    }
  }, [isOpen]);

  const loadGoals = async () => {
    try {
      const res = await getAllGoals();

      setGoals(res.goals || []);
    } catch (err) {
      console.error(
        "Failed to load goal groups:",
        err
      );
    }
  };

  // ==========================================
  // Reset Form
  // ==========================================

  const resetForm = () => {
    setTitle("");
    setGoalGroupId("");
    setMeals([createEmptyMeal()]);
    setErrors({});
  };

  // ==========================================
  // Close Modal
  // ==========================================

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  // ==========================================
  // Add Meal
  // ==========================================

  const addMeal = () => {
    setMeals((prev) => [
      ...prev,
      createEmptyMeal(),
    ]);
  };

  // ==========================================
  // Remove Meal
  // ==========================================

  const removeMeal = (mealIndex) => {
    if (meals.length === 1) {
      return;
    }

    setMeals((prev) =>
      prev.filter(
        (_, index) => index !== mealIndex
      )
    );
  };

  // ==========================================
  // Change Meal Type
  // ==========================================

  const handleMealTypeChange = (
    mealIndex,
    value
  ) => {
    setMeals((prev) =>
      prev.map((meal, index) =>
        index === mealIndex
          ? {
              ...meal,
              mealType: value,
            }
          : meal
      )
    );
  };

  // ==========================================
  // Add Food
  // ==========================================

  const addFood = (mealIndex) => {
    setMeals((prev) =>
      prev.map((meal, index) =>
        index === mealIndex
          ? {
              ...meal,
              foods: [
                ...meal.foods,
                "",
              ],
            }
          : meal
      )
    );
  };

  // ==========================================
  // Remove Food
  // ==========================================

  const removeFood = (
    mealIndex,
    foodIndex
  ) => {
    setMeals((prev) =>
      prev.map((meal, index) => {
        if (index !== mealIndex) {
          return meal;
        }

        if (meal.foods.length === 1) {
          return meal;
        }

        return {
          ...meal,
          foods: meal.foods.filter(
            (_, index) =>
              index !== foodIndex
          ),
        };
      })
    );
  };

  // ==========================================
  // Change Food
  // ==========================================

  const handleFoodChange = (
    mealIndex,
    foodIndex,
    value
  ) => {
    setMeals((prev) =>
      prev.map((meal, index) => {
        if (index !== mealIndex) {
          return meal;
        }

        const updatedFoods = [
          ...meal.foods,
        ];

        updatedFoods[foodIndex] = value;

        return {
          ...meal,
          foods: updatedFoods,
        };
      })
    );
  };

  // ==========================================
  // Validation
  // ==========================================

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title =
        "Diet title is required";
    }

    if (!goalGroupId) {
      newErrors.goalGroupId =
        "Goal Group is required";
    }

    if (meals.length === 0) {
      newErrors.meals =
        "Add at least one meal";
    }

    meals.forEach((meal, mealIndex) => {
      if (!meal.mealType) {
        newErrors[
          `meal-${mealIndex}`
        ] = "Meal type is required";
      }

      const hasFood = meal.foods.some(
        (food) => food.trim() !== ""
      );

      if (!hasFood) {
        newErrors[
          `foods-${mealIndex}`
        ] = "Add at least one food";
      }
    });

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // Clean foods before sending
      const cleanedMeals = meals.map(
        (meal) => ({
          mealType: meal.mealType,

          foods: meal.foods
            .map((food) => food.trim())
            .filter(
              (food) => food !== ""
            ),
        })
      );

      // ======================================
      // Exact payload according to model
      // ======================================

      const payload = {
        goalGroupId,
        title: title.trim(),
        meals: cleanedMeals,
      };

      console.log(
        "CREATE DIET PAYLOAD:",
        payload
      );

      await createDiet(payload);

      // Refresh diet list
      await fetchDiets();

      // Reset
      resetForm();

      // Close
      onClose();
    } catch (err) {
      console.error(
        "Create diet error:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Modal
  // ==========================================

  if (!isOpen) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
          p-4
          backdrop-blur-sm
        "
      >
        <motion.form
          initial={{
            scale: 0.95,
            opacity: 0,
            y: 20,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          onSubmit={handleSubmit}
          className={`
            flex
            max-h-[92vh]
            w-full
            max-w-4xl
            flex-col
            overflow-hidden
            rounded-2xl
            border
            shadow-2xl

            ${
              isDark
                ? "border-white/10 bg-[#0B1020]"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* ====================================== */}
          {/* HEADER */}
          {/* ====================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-gray-200
              px-6
              py-5
              dark:border-white/10
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-500/10
                "
              >
                <Salad
                  className="text-green-500"
                  size={24}
                />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Create Diet
                </h2>

                <p
                  className="
                    text-sm
                    text-gray-500
                    dark:text-slate-400
                  "
                >
                  Add a complete diet plan
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                rounded-xl
                p-2
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-red-500
                disabled:cursor-not-allowed
                dark:hover:bg-slate-800
              "
            >
              <X size={22} />
            </button>
          </div>

          {/* ====================================== */}
          {/* BODY */}
          {/* ====================================== */}

          <div
            className="
              flex-1
              space-y-6
              overflow-y-auto
              p-6
            "
          >
            {/* ================================== */}
            {/* BASIC INFORMATION */}
            {/* ================================== */}

            <div>
              <h3
                className="
                  mb-4
                  text-base
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Basic Information
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                "
              >
                {/* Diet Title */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Diet Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);

                      setErrors((prev) => ({
                        ...prev,
                        title: "",
                      }));
                    }}
                    placeholder="e.g. Weight Loss Diet Plan"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  />

                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Goal Group */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Goal Group
                  </label>

                  <select
                    value={goalGroupId}
                    onChange={(e) => {
                      setGoalGroupId(
                        e.target.value
                      );

                      setErrors((prev) => ({
                        ...prev,
                        goalGroupId: "",
                      }));
                    }}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  >
                    <option value="">
                      Select Goal Group
                    </option>

                    {goals.map((goal) => (
                      <option
                        key={goal._id}
                        value={goal._id}
                      >
                        {goal.name}
                      </option>
                    ))}
                  </select>

                  {errors.goalGroupId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.goalGroupId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================================== */}
            {/* MEALS */}
            {/* ================================== */}

            <div>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <h3
                    className="
                      text-base
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Meals
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-500
                      dark:text-slate-400
                    "
                  >
                    Add meals and the foods
                    included in each meal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addMeal}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-orange-500
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-orange-600
                  "
                >
                  <Plus size={17} />
                  Add Meal
                </button>
              </div>

              {errors.meals && (
                <p className="mb-3 text-sm text-red-500">
                  {errors.meals}
                </p>
              )}

              <div className="space-y-4">
                {meals.map(
                  (meal, mealIndex) => (
                    <div
                      key={mealIndex}
                      className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-gray-50
                        p-5
                        dark:border-slate-700
                        dark:bg-slate-900/60
                      "
                    >
                      {/* Meal Header */}

                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              bg-green-500/10
                            "
                          >
                            <Utensils
                              size={19}
                              className="text-green-500"
                            />
                          </div>

                          <div>
                            <h4
                              className="
                                text-sm
                                font-bold
                                text-gray-900
                                dark:text-white
                              "
                            >
                              Meal {mealIndex + 1}
                            </h4>

                            <p
                              className="
                                text-xs
                                text-gray-500
                                dark:text-slate-400
                              "
                            >
                              Select meal type
                              and add foods
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeMeal(
                              mealIndex
                            )
                          }
                          disabled={
                            meals.length === 1
                          }
                          className="
                            rounded-lg
                            p-2
                            text-red-500
                            transition
                            hover:bg-red-50
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            dark:hover:bg-red-950/20
                          "
                        >
                          <Trash2
                            size={18}
                          />
                        </button>
                      </div>

                      {/* Meal Type */}

                      <div className="mb-5">
                        <label
                          className="
                            mb-2
                            block
                            text-sm
                            font-semibold
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          Meal Type
                        </label>

                        <select
                          value={
                            meal.mealType
                          }
                          onChange={(e) =>
                            handleMealTypeChange(
                              mealIndex,
                              e.target.value
                            )
                          }
                          className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-4
                            py-3
                            capitalize
                            outline-none
                            transition
                            focus:border-orange-500
                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-white
                          "
                        >
                          {MEAL_TYPES.map(
                            (type) => (
                              <option
                                key={type}
                                value={type}
                              >
                                {type
                                  .replace(
                                    "_",
                                    " "
                                  )
                                  .replace(
                                    /\b\w/g,
                                    (char) =>
                                      char.toUpperCase()
                                  )}
                              </option>
                            )
                          )}
                        </select>

                        {errors[
                          `meal-${mealIndex}`
                        ] && (
                          <p className="mt-1 text-sm text-red-500">
                            {
                              errors[
                                `meal-${mealIndex}`
                              ]
                            }
                          </p>
                        )}
                      </div>

                      {/* Foods */}

                      <div>
                        <div
                          className="
                            mb-3
                            flex
                            items-center
                            justify-between
                          "
                        >
                          <label
                            className="
                              text-sm
                              font-semibold
                              text-gray-700
                              dark:text-gray-300
                            "
                          >
                            Foods
                          </label>

                          <button
                            type="button"
                            onClick={() =>
                              addFood(
                                mealIndex
                              )
                            }
                            className="
                              flex
                              items-center
                              gap-1.5
                              rounded-lg
                              border
                              border-orange-500
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              text-orange-600
                              transition
                              hover:bg-orange-500
                              hover:text-white
                              dark:text-orange-400
                            "
                          >
                            <Plus
                              size={14}
                            />
                            Add Food
                          </button>
                        </div>

                        <div className="space-y-3">
                          {meal.foods.map(
                            (
                              food,
                              foodIndex
                            ) => (
                              <div
                                key={
                                  foodIndex
                                }
                                className="flex gap-3"
                              >
                                <div
                                  className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-orange-100
                                    text-sm
                                    font-bold
                                    text-orange-600
                                    dark:bg-orange-500/10
                                    dark:text-orange-400
                                  "
                                >
                                  {foodIndex + 1}
                                </div>

                                <input
                                  type="text"
                                  value={
                                    food
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    handleFoodChange(
                                      mealIndex,
                                      foodIndex,
                                      e.target
                                        .value
                                    )
                                  }
                                  placeholder="e.g. Oatmeal, banana, almonds"
                                  className="
                                    flex-1
                                    rounded-xl
                                    border
                                    border-gray-300
                                    bg-white
                                    px-4
                                    py-3
                                    outline-none
                                    transition
                                    focus:border-orange-500
                                    dark:border-slate-700
                                    dark:bg-slate-800
                                    dark:text-white
                                  "
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeFood(
                                      mealIndex,
                                      foodIndex
                                    )
                                  }
                                  disabled={
                                    meal.foods
                                      .length ===
                                    1
                                  }
                                  className="
                                    rounded-xl
                                    bg-red-500
                                    px-4
                                    text-white
                                    transition
                                    hover:bg-red-600
                                    disabled:cursor-not-allowed
                                    disabled:opacity-30
                                  "
                                >
                                  <Trash2
                                    size={18}
                                  />
                                </button>
                              </div>
                            )
                          )}
                        </div>

                        {errors[
                          `foods-${mealIndex}`
                        ] && (
                          <p className="mt-2 text-sm text-red-500">
                            {
                              errors[
                                `foods-${mealIndex}`
                              ]
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ====================================== */}
          {/* FOOTER */}
          {/* ====================================== */}

          <div
            className="
              flex
              shrink-0
              justify-end
              gap-3
              border-t
              border-gray-200
              bg-gray-50
              px-6
              py-5
              dark:border-white/10
              dark:bg-slate-900/40
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-2.5
                font-medium
                text-gray-700
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:text-gray-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.95,
              }}
              disabled={loading}
              type="submit"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#C11200]
                to-[#F96B00]
                px-6
                py-2.5
                font-semibold
                text-white
                shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Salad size={18} />

              {loading
                ? "Creating..."
                : "Create Diet"}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}