import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  Image,
  Upload,
} from "lucide-react";

import { createBanner } from "../../../Api/bannerApi.js";

export default function CreateBannerModal({
  isOpen,
  onClose,
  fetchBanners,
}) {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);

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

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      status: true,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    if (!formData.image.trim()) return;

    try {
      setLoading(true);

      await createBanner(formData);

      await fetchBanners();

      handleClose();
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          transition={{ duration: 0.25 }}
          className={`w-full max-w-xl overflow-hidden rounded-2xl border ${
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
                <Image
                  size={24}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Create Banner
                </h2>

                <p
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Add a promotional banner.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg p-2 hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="space-y-5 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Banner Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter banner title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#111827]"
                    : "border-gray-300 bg-gray-50"
                }`}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Banner Image URL
              </label>

              <div className="relative">
                <Upload
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/banner.jpg"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-orange-500 ${
                    theme === "dark"
                      ? "border-white/10 bg-[#111827]"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              </div>
            </div>

            {formData.image && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Preview
                </label>

                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-48 w-full rounded-xl border object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <input
                id="status"
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-5 w-5 accent-orange-600"
              />

              <label htmlFor="status">
                Active Banner
              </label>
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
              className={`rounded-xl border px-5 py-2 ${
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
              className="rounded-xl bg-orange-600 px-5 py-2 text-white hover:bg-orange-700 disabled:opacity-60"
            >
              {loading
                ? "Creating..."
                : "Create Banner"}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}