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
} from "lucide-react";

import { getAllDiets } from "../../Api/dietApi.js";

import CreateDietModal from "./modals/CreateDietModal.jsx";
import EditDietModal from "./modals/EditDietModal.jsx";
import DeleteDietModal from "./modals/DeleteDietModal.jsx";

export default function DietPage() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [diets, setDiets] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchDiets = async () => {
    try {
      setLoading(true);

      const res = await getAllDiets();

      setDiets(res?.diets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Diet Plans
          </h1>

          <p
            className={`mt-2 ${
              theme === "dark"
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Manage diet plans for different fitness goals.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: .95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={18} />
          Create Diet
        </motion.button>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[1,2,3,4,5,6].map((i)=>(
            <div
              key={i}
              className={`rounded-2xl h-72 animate-pulse ${
                theme==="dark"
                  ? "bg-[#0F172A]"
                  : "bg-gray-200"
              }`}
            />
          ))}

        </div>
      ) : diets.length === 0 ? (

        <div
          className={`rounded-2xl border py-20 flex flex-col items-center justify-center ${
            theme === "dark"
              ? "bg-[#0B1020] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <Salad
            className="text-orange-500 mb-5"
            size={60}
          />

          <h2 className="text-2xl font-bold mb-2">
            No Diet Plans
          </h2>

          <p className="text-gray-500 mb-8">
            Create your first diet plan.
          </p>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl"
          >
            Create Diet
          </button>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {diets.map((diet) => (

            <motion.div
              key={diet._id}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{
                duration: .25,
              }}
              className={`rounded-2xl border overflow-hidden ${
                theme === "dark"
                  ? "bg-[#0B1020] border-white/10"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >

              {/* Top */}

              <div className="p-6">

                <div className="flex items-start justify-between">

                  <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">

                    <Salad
                      className="text-green-500"
                      size={28}
                    />

                  </div>

                  <span className="px-3 py-1 rounded-full text-xs bg-orange-500/10 text-orange-500">
                    {diet.goalGroupId?.name || "Goal"}
                  </span>

                </div>

                <h2 className="text-xl font-bold mt-5">
                  {diet.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {diet.goalGroupId?.description}
                </p>

                {/* Stats */}

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div
                    className={`rounded-xl p-4 ${
                      theme==="dark"
                        ? "bg-white/5"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <UtensilsCrossed size={16}/>
                      Meals
                    </div>

                    <h3 className="mt-2 text-2xl font-bold">
                      {diet.meals?.length || 0}
                    </h3>
                  </div>

                  <div
                    className={`rounded-xl p-4 ${
                      theme==="dark"
                        ? "bg-white/5"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <CalendarDays size={16}/>
                      Created
                    </div>

                    <h3 className="mt-2 text-sm font-semibold">
                      {new Date(
                        diet.createdAt
                      ).toLocaleDateString()}
                    </h3>

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div
                className={`border-t px-6 py-4 flex justify-between ${
                  theme==="dark"
                    ? "border-white/10"
                    : "border-gray-200"
                }`}
              >

                <motion.button
                  whileHover={{ scale:1.05 }}
                  whileTap={{ scale:.95 }}
                  onClick={()=>{
                    setSelectedDiet(diet);
                    setShowEditModal(true);
                  }}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
                >
                  <Pencil size={18}/>
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale:1.05 }}
                  whileTap={{ scale:.95 }}
                  onClick={()=>{
                    setSelectedDiet(diet);
                    setShowDeleteModal(true);
                  }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                >
                  <Trash2 size={18}/>
                  Delete
                </motion.button>

              </div>

            </motion.div>

          ))}

        </div>

      )}

      {/* Modals */}

      <CreateDietModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        fetchDiets={fetchDiets}
      />

      <EditDietModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        diet={selectedDiet}
        fetchDiets={fetchDiets}
      />

      <DeleteDietModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        diet={selectedDiet}
        fetchDiets={fetchDiets}
      />

    </div>
  );
}