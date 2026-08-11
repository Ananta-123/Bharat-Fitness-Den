import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Plus,
  Salad,
  Pencil,
  Trash2,
  CalendarDays,
  UtensilsCrossed,
  Utensils,
  Apple,
  Target,
  ChevronDown,
} from "lucide-react";

import { getAllDiets } from "../../Api/dietApi.js";

import CreateDietModal from "./modals/CreateDietModal.jsx";
import EditDietModal from "./modals/EditDietModal.jsx";
import DeleteDietModal from "./modals/DeleteDietModal.jsx";

export default function DietPage() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  // ==========================================
  // State
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  const [diets, setDiets] = useState([]);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedDiet, setSelectedDiet] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [expandedDiet, setExpandedDiet] =
    useState(null);

  // ==========================================
  // Fetch Diets
  // ==========================================

  const fetchDiets = async () => {
    try {
      setLoading(true);

      const res = await getAllDiets();

      setDiets(res?.diets || []);
    } catch (err) {
      console.error(
        "Failed to fetch diets:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    fetchDiets();
  }, []);

  // ==========================================
  // Format Date
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // Format Meal Type
  // ==========================================

  const formatMealType = (mealType) => {
    if (!mealType) return "Meal";

    return mealType
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  // ==========================================
  // Toggle Meal Details
  // ==========================================

  const toggleDiet = (dietId) => {
    setExpandedDiet((prev) =>
      prev === dietId ? null : dietId
    );
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="w-full">
      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Diet Plans
          </h1>

          <p
            className={`
              mt-2
              ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            Manage diet plans for different
            fitness goals.
          </p>
        </div>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            setShowCreateModal(true)
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#C11200]
            to-[#F96B00]
            px-5
            py-3
            font-medium
            text-white
            shadow-lg
            transition
          "
        >
          <Plus size={18} />

          Create Diet
        </motion.button>
      </div>

      {/* ====================================== */}
      {/* LOADING */}
      {/* ====================================== */}

      {loading ? (
        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className={`
                  h-[500px]
                  animate-pulse
                  rounded-2xl
                  ${
                    isDark
                      ? "bg-[#0F172A]"
                      : "bg-gray-200"
                  }
                `}
              />
            )
          )}
        </div>
      ) : diets.length === 0 ? (
        /* ====================================== */
        /* EMPTY STATE */
        /* ====================================== */

        <div
          className={`
            flex
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            py-20
            ${
              isDark
                ? "border-white/10 bg-[#0B1020]"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <Salad
            className="mb-5 text-orange-500"
            size={60}
          />

          <h2
            className="
              mb-2
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            No Diet Plans
          </h2>

          <p
            className="
              mb-8
              text-gray-500
              dark:text-gray-400
            "
          >
            Create your first diet plan.
          </p>

          <button
            onClick={() =>
              setShowCreateModal(true)
            }
            className="
              rounded-xl
              bg-gradient-to-r
              from-[#C11200]
              to-[#F96B00]
              px-6
              py-3
              font-medium
              text-white
              shadow-lg
              transition
            "
          >
            Create Diet
          </button>
        </div>
      ) : (
        /* ====================================== */
        /* DIET GRID */
        /* ====================================== */

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {diets.map((diet) => {
            const isExpanded =
              expandedDiet === diet._id;

            const totalFoods =
              diet.meals?.reduce(
                (total, meal) =>
                  total +
                  (meal.foods?.length || 0),
                0
              ) || 0;

            return (
              <motion.div
                key={diet._id}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
                transition={{
                  duration: 0.25,
                }}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  shadow-md
                  transition-all

                  ${
                    isDark
                      ? "border-white/10 bg-[#0B1020] hover:border-orange-500/30"
                      : "border-gray-200 bg-white hover:shadow-xl"
                  }
                `}
              >
                {/* ================================== */}
                {/* CARD HEADER */}
                {/* ================================== */}

                <div
                  className="
                    border-b
                    border-gray-200
                    p-6
                    dark:border-white/10
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-green-500/10
                      "
                    >
                      <Salad
                        className="text-green-500"
                        size={28}
                      />
                    </div>

                    {/* Goal Group */}

                    <span
                      className="
                        max-w-[150px]
                        truncate
                        rounded-full
                        bg-orange-500/10
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-orange-500
                      "
                    >
                      {diet.goalGroupId?.name ||
                        "No Goal Group"}
                    </span>
                  </div>

                  {/* Title */}

                  <h2
                    className="
                      mt-5
                      text-xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {diet.title ||
                      "Untitled Diet"}
                  </h2>

                  {/* Goal */}

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-gray-500
                      dark:text-slate-400
                    "
                  >
                    <Target size={15} />

                    <span>
                      Goal:{" "}
                      <span className="font-medium">
                        {diet.goalGroupId
                          ?.name || "--"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* ================================== */}
                {/* CARD BODY */}
                {/* ================================== */}

                <div className="space-y-5 p-6">
                  {/* Stats */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >
                    {/* Meals */}

                    <div
                      className={`
                        rounded-xl
                        p-4
                        ${
                          isDark
                            ? "bg-white/5"
                            : "bg-gray-100"
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        <UtensilsCrossed
                          size={16}
                        />

                        Meals
                      </div>

                      <h3
                        className="
                          mt-2
                          text-2xl
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {diet.meals?.length ||
                          0}
                      </h3>
                    </div>

                    {/* Foods */}

                    <div
                      className={`
                        rounded-xl
                        p-4
                        ${
                          isDark
                            ? "bg-white/5"
                            : "bg-gray-100"
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        <Apple
                          size={16}
                        />

                        Foods
                      </div>

                      <h3
                        className="
                          mt-2
                          text-2xl
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {totalFoods}
                      </h3>
                    </div>
                  </div>

                  {/* ================================= */}
                  {/* MEAL PREVIEW */}
                  {/* ================================= */}

                  <div>
                    <div
                      className="
                        mb-3
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <h3
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        <Utensils
                          size={16}
                          className="text-orange-500"
                        />

                        Meal Plan
                      </h3>

                      {diet.meals?.length >
                        0 && (
                        <button
                          type="button"
                          onClick={() =>
                            toggleDiet(
                              diet._id
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            font-semibold
                            text-orange-500
                            transition
                            hover:text-orange-600
                          "
                        >
                          {isExpanded
                            ? "Hide"
                            : "View"}

                          <ChevronDown
                            size={15}
                            className={`
                              transition-transform
                              ${
                                isExpanded
                                  ? "rotate-180"
                                  : ""
                              }
                            `}
                          />
                        </button>
                      )}
                    </div>

                    {!diet.meals ||
                    diet.meals.length ===
                      0 ? (
                      <div
                        className={`
                          rounded-xl
                          border
                          border-dashed
                          p-4
                          text-center
                          text-sm
                          text-gray-500
                          ${
                            isDark
                              ? "border-slate-700"
                              : "border-gray-300"
                          }
                        `}
                      >
                        No meals added.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {diet.meals
                          .slice(
                            0,
                            isExpanded
                              ? diet.meals
                                  .length
                              : 2
                          )
                          .map(
                            (
                              meal,
                              mealIndex
                            ) => (
                              <div
                                key={
                                  mealIndex
                                }
                                className={`
                                  rounded-xl
                                  border
                                  p-4
                                  ${
                                    isDark
                                      ? "border-slate-700 bg-slate-900/60"
                                      : "border-gray-200 bg-gray-50"
                                  }
                                `}
                              >
                                {/* Meal Type */}

                                <div
                                  className="
                                    mb-2
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                  "
                                >
                                  <span
                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      text-sm
                                      font-bold
                                      text-gray-900
                                      dark:text-white
                                    "
                                  >
                                    <span
                                      className="
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-orange-500/10
                                        text-xs
                                        font-bold
                                        text-orange-500
                                      "
                                    >
                                      {mealIndex +
                                        1}
                                    </span>

                                    {formatMealType(
                                      meal.mealType
                                    )}
                                  </span>

                                  <span
                                    className="
                                      text-xs
                                      text-gray-500
                                      dark:text-slate-400
                                    "
                                  >
                                    {meal
                                      .foods
                                      ?.length ||
                                      0}{" "}
                                    food
                                    {meal
                                      .foods
                                      ?.length ===
                                    1
                                      ? ""
                                      : "s"}
                                  </span>
                                </div>

                                {/* Foods */}

                                <div
                                  className="
                                    flex
                                    flex-wrap
                                    gap-2
                                  "
                                >
                                  {meal.foods
                                    ?.slice(
                                      0,
                                      isExpanded
                                        ? meal
                                            .foods
                                            .length
                                        : 4
                                    )
                                    .map(
                                      (
                                        food,
                                        foodIndex
                                      ) => (
                                        <span
                                          key={
                                            foodIndex
                                          }
                                          className="
                                            rounded-lg
                                            bg-green-500/10
                                            px-2.5
                                            py-1
                                            text-xs
                                            font-medium
                                            text-green-600
                                            dark:text-green-400
                                          "
                                        >
                                          {food}
                                        </span>
                                      )
                                    )}

                                  {!isExpanded &&
                                    meal.foods
                                      ?.length >
                                      4 && (
                                      <span
                                        className="
                                          rounded-lg
                                          bg-gray-200
                                          px-2.5
                                          py-1
                                          text-xs
                                          font-medium
                                          text-gray-600
                                          dark:bg-slate-700
                                          dark:text-gray-300
                                        "
                                      >
                                        +
                                        {meal
                                          .foods
                                          .length -
                                          4}{" "}
                                        more
                                      </span>
                                    )}
                                </div>
                              </div>
                            )
                          )}

                        {/* More Meals */}

                        {!isExpanded &&
                          diet.meals.length >
                            2 && (
                            <button
                              type="button"
                              onClick={() =>
                                toggleDiet(
                                  diet._id
                                )
                              }
                              className="
                                w-full
                                rounded-xl
                                border
                                border-dashed
                                border-orange-500/40
                                py-2.5
                                text-xs
                                font-semibold
                                text-orange-500
                                transition
                                hover:bg-orange-500/5
                              "
                            >
                              View{" "}
                              {diet.meals
                                .length -
                                2}{" "}
                              more meal
                              {diet.meals
                                .length -
                                2 ===
                              1
                                ? ""
                                : "s"}
                            </button>
                          )}
                      </div>
                    )}
                  </div>

                  {/* ================================= */}
                  {/* CREATED DATE */}
                  {/* ================================= */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-gray-200
                      pt-4
                      dark:border-slate-700
                    "
                  >
                    <span
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-500
                        dark:text-slate-400
                      "
                    >
                      <CalendarDays
                        size={16}
                      />

                      Created
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {formatDate(
                        diet.createdAt
                      )}
                    </span>
                  </div>
                </div>

                {/* ================================== */}
                {/* FOOTER */}
                {/* ================================== */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-200
                    px-6
                    py-4
                    dark:border-white/10
                  "
                >
                  {/* Edit */}

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => {
                      setSelectedDiet(
                        diet
                      );
                      setShowEditModal(
                        true
                      );
                    }}
                    className="
                      flex
                      items-center
                      gap-2
                      font-medium
                      text-blue-500
                      transition
                      hover:text-blue-600
                    "
                  >
                    <Pencil size={17} />

                    Edit
                  </motion.button>

                  {/* Delete */}

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => {
                      setSelectedDiet(
                        diet
                      );
                      setShowDeleteModal(
                        true
                      );
                    }}
                    className="
                      flex
                      items-center
                      gap-2
                      font-medium
                      text-red-500
                      transition
                      hover:text-red-600
                    "
                  >
                    <Trash2 size={17} />

                    Delete
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ====================================== */}
      {/* CREATE MODAL */}
      {/* ====================================== */}

      <CreateDietModal
        isOpen={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        fetchDiets={fetchDiets}
      />

      {/* ====================================== */}
      {/* EDIT MODAL */}
      {/* ====================================== */}

      <EditDietModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedDiet(null);
        }}
        diet={selectedDiet}
        fetchDiets={fetchDiets}
      />

      {/* ====================================== */}
      {/* DELETE MODAL */}
      {/* ====================================== */}

      <DeleteDietModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedDiet(null);
        }}
        diet={selectedDiet}
        fetchDiets={fetchDiets}
      />
    </div>
  );
}