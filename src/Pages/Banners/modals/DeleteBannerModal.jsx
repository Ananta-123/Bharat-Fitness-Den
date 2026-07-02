import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  TriangleAlert,
  Trash2,
  X,
  Image,
} from "lucide-react";

import { deleteBanner } from "../../../Api/bannerApi.js";

export default function DeleteBannerModal({
  isOpen,
  onClose,
  banner,
  fetchBanners,
}) {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);

  if (!isOpen || !banner) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteBanner(banner._id);

      await fetchBanners();

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`w-full max-w-md overflow-hidden rounded-2xl border ${
            theme === "dark"
              ? "bg-[#0B1020] border-white/10"
              : "bg-white border-gray-200"
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <TriangleAlert
                  size={24}
                  className="text-red-500"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Delete Banner
                </h2>

                <p
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-gray-500/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="space-y-5 p-6">
            {/* Banner Preview */}

            <div className="overflow-hidden rounded-xl border">
              {banner.image ? (
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-40 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x300?text=No+Image";
                  }}
                />
              ) : (
                <div className="flex h-40 items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <Image
                    size={40}
                    className="text-gray-400"
                  />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                {banner.title}
              </h3>

              <p
                className={`mt-3 leading-7 ${
                  theme === "dark"
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                Are you sure you want to permanently delete this
                banner?
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 ${
                theme === "dark"
                  ? "border-red-500/20 bg-red-500/5"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <p className="text-sm text-red-500">
                This action will permanently remove the banner
                from the system and cannot be undone.
              </p>
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
              onClick={onClose}
              disabled={loading}
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
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={18} />

              {loading
                ? "Deleting..."
                : "Delete Banner"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}