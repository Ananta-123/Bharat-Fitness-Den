import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  TicketPercent,
  CalendarDays,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function EditOfferModal({
  isOpen,
  onClose,
  offer,
  onSubmit,
}) {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: true,
  });

  // ==========================
  // Load Offer Data
  // ==========================

  useEffect(() => {
    if (offer && isOpen) {
      setFormData({
        title: offer.title || "",
        description: offer.description || "",
        startDate: offer.startDate
          ? offer.startDate.split("T")[0]
          : "",
        endDate: offer.endDate
          ? offer.endDate.split("T")[0]
          : "",
        status: offer.status ?? true,
      });
    }
  }, [offer, isOpen]);

  // ==========================
  // Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit(formData);

      onClose();
    } catch (err) {
      console.error("Update Offer Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border
          ${
            theme === "dark"
              ? "bg-[#10131F] border-gray-800"
              : "bg-white border-gray-200"
          }`}
        >
          {/* ==========================================
              Header
          ========================================== */}

          <div className="bg-gradient-to-r from-[#8B0000] to-[#F96B00] p-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <TicketPercent
                  className="text-white"
                  size={24}
                />
              </div>

              <div>

                <h2 className="text-white text-xl font-bold">
                  Edit Offer
                </h2>

                <p className="text-orange-100 text-sm">
                  Update promotional offer details
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/20 transition"
            >
              <X
                size={20}
                className="text-white"
              />
            </button>

          </div>

          {/* ==========================================
              Form Starts Here
              (Continue with Part 2)
          ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
                        {/* ==========================================
                Offer Title
            ========================================== */}

            <div>
              <label className="block mb-2 font-medium">
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
                  placeholder="Enter offer title"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition
                  ${
                    theme === "dark"
                      ? "bg-[#161A2C] border-gray-700 text-white focus:border-orange-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                  }`}
                />
              </div>
            </div>

            {/* ==========================================
                Description
            ========================================== */}

            <div>
              <label className="block mb-2 font-medium">
                Description
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-3.5 text-orange-500"
                />

                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Offer description..."
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border resize-none outline-none transition
                  ${
                    theme === "dark"
                      ? "bg-[#161A2C] border-gray-700 text-white focus:border-orange-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                  }`}
                />
              </div>
            </div>

            {/* ==========================================
                Dates
            ========================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2 font-medium">
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
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition
                    ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white focus:border-orange-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
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
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition
                    ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white focus:border-orange-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500"
                    }`}
                  />
                </div>
              </div>

            </div>

            {/* ==========================================
                Status
            ========================================== */}

            <div
              className={`rounded-xl border p-4 flex items-center justify-between
              ${
                theme === "dark"
                  ? "border-gray-700 bg-[#161A2C]"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500" />

                <div>
                  <h4
                    className={`font-semibold
                    ${
                      theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    Active Offer
                  </h4>

                  <p
                    className={`text-sm
                    ${
                      theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    Enable or disable this offer.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="w-5 h-5 accent-orange-500 cursor-pointer"
              />
            </div>

            {/* ==========================================
                Footer Buttons
            ========================================== */}

            <div className="flex justify-end gap-3 pt-4">

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={onClose}
                className={`px-6 py-3 rounded-xl font-medium border transition
                ${
                  theme === "dark"
                    ? "border-gray-700 hover:bg-gray-800 text-white"
                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                }`}
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8B0000] to-[#F96B00] hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Offer"}
              </motion.button>

            </div>

          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}