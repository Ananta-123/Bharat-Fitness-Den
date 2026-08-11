import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  Image,
  Upload,
  Save,
} from "lucide-react";

import { updateBanner } from "../../../Api/bannerApi.js";

export default function EditBannerModal({
  isOpen,
  onClose,
  banner,
  fetchBanners,
}) {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    title: "",
    status: true,
  });

  // Actual selected image file
  const [imageFile, setImageFile] = useState(null);

  // Image shown in preview
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || "",
        status: banner.status ?? true,
      });

      setImageFile(null);

      // Existing banner image
      if (banner.image) {
        setImagePreview(
          banner.image.startsWith("http")
            ? banner.image
            : `http://localhost:5000${banner.image}`
        );
      } else {
        setImagePreview("");
      }
    }
  }, [banner]);

  // Normal inputs
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // IMAGE INPUT
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Optional 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    // Store actual File
    setImageFile(file);

    // Create preview
    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      status: true,
    });

    setImageFile(null);
    setImagePreview("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Banner title is required.");
      return;
    }

    try {
      setLoading(true);

      // Create multipart form
      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "status",
        formData.status
      );

      // Only send image if user selected a new one
      if (imageFile) {
        data.append(
          "image",
          imageFile
        );
      }

      console.log(
        "Banner image:",
        imageFile
      );

      await updateBanner(
        banner._id,
        data
      );

      await fetchBanners();

      handleClose();
    } catch (err) {
      console.error(
        "Failed to update banner:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !banner) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/60
          backdrop-blur-sm
          p-5
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
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
          }}
          transition={{
            duration: 0.25,
          }}
          className={`w-full max-w-xl overflow-hidden rounded-2xl border ${
            theme === "dark"
              ? "border-white/10 bg-[#0B1020]"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* HEADER */}

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
                  Edit Banner
                </h2>

                <p
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Update banner details
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg p-2 transition hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>

          {/* BODY */}

          <div className="space-y-5 p-6">

            {/* TITLE */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Banner Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter banner title"
                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500 ${
                  theme === "dark"
                    ? "border-white/10 bg-[#111827]"
                    : "border-gray-300 bg-gray-50"
                }`}
              />
            </div>

            {/* IMAGE */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Banner Image
              </label>

              <div className="relative">
                <Upload
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  className={`w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-orange-500 ${
                    theme === "dark"
                      ? "border-white/10 bg-[#111827]"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG or WebP. Maximum 5MB.
              </p>
            </div>

            {/* PREVIEW */}

            {imagePreview && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Preview
                </label>

                <img
                  src={imagePreview}
                  alt="Banner Preview"
                  className="
                    h-52
                    w-full
                    rounded-xl
                    border
                    object-cover
                  "
                />
              </div>
            )}

            {/* STATUS */}

            <div className="flex items-center gap-3">
              <input
                id="status"
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-5 w-5 accent-orange-600"
              />

              <label
                htmlFor="status"
                className="font-medium"
              >
                Active Banner
              </label>
            </div>
          </div>

          {/* FOOTER */}

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
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-orange-600
                px-5
                py-2
                text-white
                transition
                hover:bg-orange-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Save size={18} />

              {loading
                ? "Updating..."
                : "Update Banner"}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}