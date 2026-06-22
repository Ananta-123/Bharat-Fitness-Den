import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";

export default function EditPlanModal({
  isOpen,
  onClose,
  plan,
  onUpdate,
  onDelete,
}) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    durationDays: "30",
    status: "active",
    description: "",
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || "",
        amount: plan.amount || "",
        durationDays: plan.durationDays || "30",
        status: plan.isActive
          ? "active"
          : "inactive",
        description: plan.description || "",
      });
    }
  }, [plan]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleUpdate = async (
    e
  ) => {
    e.preventDefault();

    if (onUpdate) {
      await onUpdate(
        plan._id,
        formData
      );
    }
  };

  if (!isOpen || !plan)
    return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            w-full
            max-w-2xl
            rounded-3xl
            bg-white
            dark:bg-[#0B1120]
            border
            border-gray-200
            dark:border-[#1B2440]
            shadow-2xl
            p-6
          "
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Plan
            </h2>

            <button
              onClick={onClose}
            >
              <X className="text-gray-700 dark:text-white" />
            </button>
          </div>

          <form
            onSubmit={
              handleUpdate
            }
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              placeholder="Plan Name"
              className="w-full p-3 rounded-xl border dark:bg-[#060816] dark:border-[#1B2440] dark:text-white"
            />

            <input
              type="number"
              name="amount"
              value={
                formData.amount
              }
              onChange={
                handleChange
              }
              placeholder="Price"
              className="w-full p-3 rounded-xl border dark:bg-[#060816] dark:border-[#1B2440] dark:text-white"
            />

            <select
              name="durationDays"
              value={
                formData.durationDays
              }
              onChange={
                handleChange
              }
              className="w-full p-3 rounded-xl border dark:bg-[#060816] dark:border-[#1B2440] dark:text-white"
            >
              <option value="30">
                1 Month
              </option>
              <option value="90">
                3 Months
              </option>
              <option value="180">
                6 Months
              </option>
              <option value="365">
                12 Months
              </option>
            </select>

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
              className="w-full p-3 rounded-xl border dark:bg-[#060816] dark:border-[#1B2440] dark:text-white"
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
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Description"
              className="w-full p-3 rounded-xl border dark:bg-[#060816] dark:border-[#1B2440] dark:text-white"
            />

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() =>
                  onDelete?.(
                    plan._id
                  )
                }
                className="
                  flex items-center gap-2
                  px-5 py-3
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                "
              >
                <Trash2
                  size={18}
                />
                Delete
              </button>

              <button
                type="submit"
                className="
                  px-6 py-3
                  rounded-xl
                  bg-[#F96B00]
                  hover:bg-orange-600
                  text-white
                  font-medium
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