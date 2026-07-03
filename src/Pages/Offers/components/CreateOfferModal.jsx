import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  TicketPercent,
  CalendarDays,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function CreateOfferModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const { theme } = useTheme();

  const initialState = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: true,
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.startDate ||
      !formData.endDate
    ) {
      return alert("Please fill all required fields.");
    }

    try {
      setLoading(true);

      await onSubmit(formData);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: .95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: .95, opacity: 0 }}
          transition={{ duration: .25 }}
          className={`w-full max-w-2xl rounded-2xl overflow-hidden border shadow-2xl
          ${
            theme === "dark"
              ? "bg-[#10131F] border-gray-800"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}

          <div className="bg-gradient-to-r from-[#8B0000] to-[#F96B00] p-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <TicketPercent className="text-white" />
              </div>

              <div>
                <h2 className="text-white text-xl font-bold">
                  Create Offer
                </h2>

                <p className="text-orange-100 text-sm">
                  Add a new promotional offer
                </p>
              </div>

            </div>

            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition"
            >
              <X size={20} />
            </button>

          </div>

          {/* Body */}

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Offer Title */}

            <div>

              <label className="font-medium mb-2 block">
                Offer Title
              </label>

              <div className="relative">

                <TicketPercent
                  size={18}
                  className="absolute left-4 top-3.5 text-orange-500"
                />

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="SUMMER30"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none
                  ${
                    theme === "dark"
                      ? "bg-[#161A2C] border-gray-700 text-white"
                      : "bg-gray-50 border-gray-300"
                  }`}
                />

              </div>

            </div>

            {/* Description */}

            <div>

              <label className="font-medium mb-2 block">
                Description
              </label>

              <div className="relative">

                <FileText
                  size={18}
                  className="absolute left-4 top-3.5 text-orange-500"
                />

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Min order ₹2,000 · Percentage"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border resize-none outline-none
                  ${
                    theme === "dark"
                      ? "bg-[#161A2C] border-gray-700 text-white"
                      : "bg-gray-50 border-gray-300"
                  }`}
                />

              </div>

            </div>

            {/* Dates */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="font-medium mb-2 block">
                  Start Date
                </label>

                <div className="relative">

                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-3.5 text-orange-500"
                  />

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none
                    ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  />

                </div>

              </div>

              <div>

                <label className="font-medium mb-2 block">
                  End Date
                </label>

                <div className="relative">

                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-3.5 text-orange-500"
                  />

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none
                    ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  />

                </div>

              </div>

            </div>

            {/* Status */}

            <div className="flex items-center justify-between rounded-xl border p-4 dark:border-gray-700">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-500" />

                <div>

                  <h3 className="font-semibold">
                    Active Offer
                  </h3>

                  <p className="text-sm text-gray-500">
                    Enable this offer immediately
                  </p>

                </div>

              </div>

              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="w-5 h-5 accent-orange-500"
              />

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 pt-2">

              <button
                type="button"
                onClick={onClose}
                className={`px-6 py-3 rounded-xl font-medium border
                ${
                  theme === "dark"
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: .97 }}
                whileHover={{ scale: 1.02 }}
                disabled={loading}
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8B0000] to-[#F96B00]"
              >
                {loading ? "Creating..." : "Create Offer"}
              </motion.button>

            </div>

          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}