import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CreatePlanModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "1 Month",
    status: "active",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold dark:text-white">
              Create Subscription Plan
            </h2>

            <button onClick={onClose}>
              <X className="dark:text-white" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Plan Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            />

            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            >
              <option>1 Month</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>12 Months</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            >
              <option value="active">
                Active
              </option>
              <option value="inactive">
                Inactive
              </option>
            </select>

            <textarea
              rows="4"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border dark:bg-[#060816]"
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="
                  px-5 py-2
                  rounded-xl
                  border
                "
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
                Create Plan
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}