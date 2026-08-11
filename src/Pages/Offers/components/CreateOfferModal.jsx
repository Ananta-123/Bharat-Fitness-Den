
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  TicketPercent,
  CalendarDays,
  FileText,
  CheckCircle2,
  Image as ImageIcon,
  Percent,
  IndianRupee,
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
    imageUrl: null,
    discountType: "percentage",
    discountValue: "",
    startDate: "",
    endDate: "",
    status: true,
  };

  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
      setImagePreview(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0];

      if (!file) return;

      setFormData((prev) => ({
        ...prev,
        imageUrl: file,
      }));

      setImagePreview(URL.createObjectURL(file));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return alert("Please enter offer title.");
    }

    if (!formData.description.trim()) {
      return alert("Please enter offer description.");
    }

    if (!formData.discountType) {
      return alert("Please select discount type.");
    }

    if (
      formData.discountValue === "" ||
      Number(formData.discountValue) <= 0
    ) {
      return alert("Please enter a valid discount value.");
    }

    if (!formData.startDate) {
      return alert("Please select start date.");
    }

    if (!formData.endDate) {
      return alert("Please select end date.");
    }

    if (
      new Date(formData.endDate) <
      new Date(formData.startDate)
    ) {
      return alert("End date cannot be before start date.");
    }

    if (
      formData.discountType === "percentage" &&
      Number(formData.discountValue) > 100
    ) {
      return alert("Percentage discount cannot be more than 100%.");
    }

    try {
      setLoading(true);

      // Send multipart/form-data
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      data.append(
        "discountType",
        formData.discountType
      );

      data.append(
        "discountValue",
        formData.discountValue
      );

      data.append(
        "startDate",
        formData.startDate
      );

      data.append(
        "endDate",
        formData.endDate
      );

      data.append(
        "status",
        formData.status
      );

      if (formData.imageUrl) {
        data.append(
          "image",
          formData.imageUrl
        );
      }

      await onSubmit(data);

      onClose();
    } catch (error) {
      console.error("Create offer error:", error);
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
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-2xl border shadow-2xl ${
            theme === "dark"
              ? "bg-[#10131F] border-gray-800 text-white"
              : "bg-white border-gray-200 text-gray-900"
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
              type="button"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {/* Title */}
            <div>
              <label className="font-medium mb-2 block">
                Offer Title *
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
                  placeholder="Summer Sale 30%"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none ${
                    theme === "dark"
                      ? "bg-[#161A2C] border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-medium mb-2 block">
                Description *
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
                  placeholder="Get 30% off on selected membership plans"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border resize-none outline-none ${
                    theme === "dark"
                      ? "bg-[#161A2C] border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="font-medium mb-2 block">
                Offer Image
              </label>

              <div
                className={`border-2 border-dashed rounded-xl p-4 ${
                  theme === "dark"
                    ? "border-gray-700 bg-[#161A2C]"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Offer preview"
                      className="w-full max-h-52 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <ImageIcon
                        size={28}
                        className="text-orange-500"
                      />
                    </div>
                  )}

                  <label className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#8B0000] to-[#F96B00] text-white font-medium">
                      <ImageIcon size={17} />
                      {imagePreview
                        ? "Change Image"
                        : "Choose Image"}
                    </span>

                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-xs text-gray-500">
                    JPG, PNG, WEBP supported
                  </p>
                </div>
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="font-medium mb-2 block">
                Discount *
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Discount Type */}
                <div className="relative">
                  {formData.discountType === "percentage" ? (
                    <Percent
                      size={18}
                      className="absolute left-4 top-3.5 text-orange-500"
                    />
                  ) : (
                    <IndianRupee
                      size={18}
                      className="absolute left-4 top-3.5 text-orange-500"
                    />
                  )}

                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none appearance-none ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <option value="percentage">
                      Percentage (%)
                    </option>

                    <option value="fixed">
                      Fixed Amount (₹)
                    </option>
                  </select>
                </div>

                {/* Discount Value */}
                <div className="relative">
                  {formData.discountType === "percentage" ? (
                    <Percent
                      size={18}
                      className="absolute left-4 top-3.5 text-orange-500"
                    />
                  ) : (
                    <IndianRupee
                      size={18}
                      className="absolute left-4 top-3.5 text-orange-500"
                    />
                  )}

                  <input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleChange}
                    min="0"
                    max={
                      formData.discountType ===
                      "percentage"
                        ? "100"
                        : undefined
                    }
                    step="0.01"
                    placeholder={
                      formData.discountType ===
                      "percentage"
                        ? "30"
                        : "500"
                    }
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Start Date */}
              <div>
                <label className="font-medium mb-2 block">
                  Start Date *
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
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="font-medium mb-2 block">
                  End Date *
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
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none ${
                      theme === "dark"
                        ? "bg-[#161A2C] border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              className={`flex items-center justify-between rounded-xl border p-4 ${
                theme === "dark"
                  ? "border-gray-700"
                  : "border-gray-300"
              }`}
            >
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
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-medium border ${
                  theme === "dark"
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                disabled={loading}
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8B0000] to-[#F96B00] disabled:opacity-60"
              >
                {loading
                  ? "Creating..."
                  : "Create Offer"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

