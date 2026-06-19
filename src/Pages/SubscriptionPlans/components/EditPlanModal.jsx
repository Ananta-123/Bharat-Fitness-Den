import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function EditPlanModal({
  isOpen,
  onClose,
  plan,
  onSubmit,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    }
  }, [plan]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen || !plan) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="
            w-full
            max-w-2xl
            rounded-3xl
            bg-white
            dark:bg-[#0B1120]
            border
            border-gray-200
            dark:border-[#1B2440]
            p-6
          "
        >
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold dark:text-white">
              Edit Plan
            </h2>

            <button onClick={onClose}>
              <X className="dark:text-white" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            className="space-y-4"
          >
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            />

            <input
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            />

            <textarea
              rows="4"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  px-5 py-2
                  rounded-xl
                  bg-[#F96B00]
                  text-white
                "
              >
                Update Plan
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}