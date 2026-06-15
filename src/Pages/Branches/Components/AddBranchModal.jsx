// src/Pages/Branches/components/AddBranchModal.jsx

import { motion, AnimatePresence } from "framer-motion";
import { X, Building2 } from "lucide-react";
import { useState } from "react";

import { createBranch } from "../../../Api/branchApi.js";

const AddBranchModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] =
    useState({
      branchName: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      email: "",
    });

    const [loading, setLoading] =
  useState(false);

const [error, setError] =
  useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    // API CALL
    const data =
      await createBranch(formData);

    console.log(
      "Created Branch:",
      data
    );

    // parent callback
    if (onSubmit) {
      onSubmit(data.branch);
    }

    // close modal
    onClose();

    // reset form
    setFormData({
      branchName: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      email: "",
    });
  } catch (error) {
    console.log(error);

    setError(
      error.response?.data?.message ||
        "Failed to create branch"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/60
            backdrop-blur-sm
            px-4
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
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
            transition={{
              duration: 0.25,
            }}
            className="
              relative
              w-full max-w-2xl
              rounded-3xl
              border border-gray-200/60
              dark:border-white/10
              bg-white
              dark:bg-[#0B1120]
              shadow-2xl
              overflow-hidden
            "
          >
            {/* HEADER */}
            <div
              className="
                flex items-center justify-between
                px-6 py-5
                border-b border-gray-200
                dark:border-white/10
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    p-3 rounded-2xl
                    bg-orange-500/10
                    text-orange-500
                  "
                >
                  <Building2 size={22} />
                </div>

                <div>
                  <h2
                    className="
                      text-xl font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Add New Branch
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Create a new branch profile
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="
                  p-2 rounded-xl
                  text-gray-500
                  hover:bg-gray-100
                  dark:hover:bg-white/10
                  transition
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Branch Name */}
                <InputField
                  label="Branch Name"
                  name="branchName"
                  placeholder="Enter branch name"
                  value={formData.branchName}
                  onChange={handleChange}
                />

                {/* Phone */}
                <InputField
                  label="Phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {/* Email */}
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

                {/* City */}
                <InputField
                  label="City"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                />

                {/* State */}
                <InputField
                  label="State"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                />

                {/* Address */}
                <div className="md:col-span-2">
                  <label
                    className="
                      block mb-2
                      text-sm font-medium
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Address
                  </label>

                  <textarea
                    name="address"
                    rows="4"
                    placeholder="Enter branch address"
                    value={formData.address}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-2xl
                      border border-gray-300
                      dark:border-white/10
                      bg-white
                      dark:bg-[#060816]
                      px-4 py-3
                      text-gray-900
                      dark:text-white
                      outline-none
                      transition
                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-500/20
                      resize-none
                    "
                  />
                </div>
              </div>

              {error && (
  <div
    className="
      mt-5
      rounded-2xl
      border border-red-500/20
      bg-red-500/10
      px-4 py-3
      text-sm
      text-red-500
    "
  >
    {error}
  </div>
)}

              {/* BUTTONS */}
              <div
                className="
                  flex justify-end gap-3
                  mt-8
                "
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    px-5 py-3
                    rounded-2xl
                    border border-gray-300
                    dark:border-white/10
                    text-gray-700
                    dark:text-gray-300
                    hover:bg-gray-100
                    dark:hover:bg-white/10
                    transition
                  "
                >
                  Cancel
                </button>

                <motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.96 }}
  type="submit"
  disabled={loading}
  className="
    px-6 py-3
    rounded-2xl
    bg-gradient-to-r
    from-orange-500
    to-orange-400
    text-white
    font-semibold
    shadow-[0_0_30px_rgba(249,107,0,0.25)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {loading
    ? "Creating..."
    : "Create Branch"}
</motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div>
      <label
        className="
          block mb-2
          text-sm font-medium
          text-gray-700
          dark:text-gray-300
        "
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border border-gray-300
          dark:border-white/10
          bg-white
          dark:bg-[#060816]
          px-4 py-3
          text-gray-900
          dark:text-white
          outline-none
          transition
          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-500/20
        "
      />
    </div>
  );
};

export default AddBranchModal;