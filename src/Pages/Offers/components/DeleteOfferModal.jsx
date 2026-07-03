import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  AlertTriangle,
  Trash2,
  X,
  TicketPercent,
} from "lucide-react";

export default function DeleteOfferModal({
  isOpen,
  onClose,
  offer,
  onConfirm,
  loading = false,
}) {
  const { theme } = useTheme();

  if (!isOpen || !offer) return null;

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
            y: 20,
          }}
          transition={{ duration: 0.25 }}
          className={`w-full max-w-md rounded-2xl overflow-hidden border shadow-2xl
          ${
            theme === "dark"
              ? "bg-[#10131F] border-gray-800"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}

          <div className="bg-gradient-to-r from-red-600 to-red-500 p-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <AlertTriangle
                  className="text-white"
                  size={24}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Delete Offer
                </h2>

                <p className="text-red-100 text-sm">
                  This action cannot be undone
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

          {/* Body */}

          <div className="p-6">

            <div className="flex justify-center mb-6">

              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2
                  size={40}
                  className="text-red-500"
                />
              </div>

            </div>

            <h3
              className={`text-xl font-bold text-center
              ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              Delete this Offer?
            </h3>

            <p
              className={`text-center mt-3 text-sm leading-6
              ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              You are about to permanently delete this promotional
              offer.
            </p>

            {/* Offer Preview */}

            <div
              className={`mt-6 rounded-xl border p-4
              ${
                theme === "dark"
                  ? "bg-[#161A2C] border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center">
                  <TicketPercent
                    className="text-orange-500"
                    size={22}
                  />
                </div>

                <div>

                  <h4
                    className={`font-semibold
                    ${
                      theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {offer.title}
                  </h4>

                  <p
                    className={`text-sm mt-1
                    ${
                      theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {offer.description}
                  </p>

                </div>

              </div>
            </div>

            {/* Warning */}

            <div
              className={`mt-6 rounded-xl p-4
              ${
                theme === "dark"
                  ? "bg-red-500/10 border border-red-500/30"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">

                <AlertTriangle
                  size={20}
                  className="text-red-500 mt-0.5"
                />

                <div>

                  <p className="font-semibold text-red-500">
                    Warning
                  </p>

                  <p
                    className={`text-sm mt-1
                    ${
                      theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    Once deleted, this offer cannot be recovered.
                  </p>

                </div>

              </div>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 mt-8">

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className={`px-5 py-3 rounded-xl border font-medium transition
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
                onClick={onConfirm}
                className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition disabled:opacity-60"
              >
                {loading
                  ? "Deleting..."
                  : "Delete Offer"}
              </motion.button>

            </div>

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}