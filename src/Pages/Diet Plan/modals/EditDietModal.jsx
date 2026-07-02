import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { X, Salad, Save } from "lucide-react";

import { updateDiet } from "../../../Api/dietApi.js";
import { getAllGoals } from "../../../Api/goalGroupApi.js";

export default function EditDietModal({
  isOpen,
  onClose,
  diet,
  fetchDiets,
}) {
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [goalGroupId, setGoalGroupId] = useState("");
  const [goalGroups, setGoalGroups] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    loadGoalGroups();

    if (diet) {
      setTitle(diet.title || "");
      setGoalGroupId(diet.goalGroupId?._id || "");
    }
  }, [isOpen, diet]);

  const loadGoalGroups = async () => {
    try {
      const res = await getAllGoalGroups();
      setGoalGroups(res.goalGroups || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setTitle("");
    setGoalGroupId("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (!goalGroupId) return;

    try {
      setLoading(true);

      await updateDiet(diet._id, {
        title: title.trim(),
        goalGroupId,
      });

      await fetchDiets();

      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !diet) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className={`w-full max-w-lg overflow-hidden rounded-2xl border ${
            theme === "dark"
              ? "border-white/10 bg-[#0B1020]"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Header */}

          <div
            className={`flex items-center justify-between border-b px-6 py-5 ${
              theme === "dark"
                ? "border-white/10"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                <Salad
                  size={24}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Edit Diet Plan
                </h2>

                <p
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Update diet information
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg p-2 transition hover:bg-gray-500/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="space-y-5 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Diet Title
              </label>

              <input
                type="text"
                placeholder="Enter diet title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#111827]"
                    : "border-gray-300 bg-gray-50"
                }`}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Goal Group
              </label>

              <select
                value={goalGroupId}
                onChange={(e) =>
                  setGoalGroupId(e.target.value)
                }
                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#111827]"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <option value="">
                  Select Goal Group
                </option>

                {goalGroups.map((goal) => (
                  <option
                    key={goal._id}
                    value={goal._id}
                  >
                    {goal.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}

          <div
            className={`flex justify-end gap-3 border-t px-6 py-5 ${
              theme === "dark"
                ? "border-white/10"
                : "border-gray-200"
            }`}
          >
            <button
              type="button"
              onClick={handleClose}
              className={`rounded-xl border px-5 py-2 transition ${
                theme === "dark"
                  ? "border-white/10 hover:bg-white/5"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2 text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {loading ? "Updating..." : "Update Diet"}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}