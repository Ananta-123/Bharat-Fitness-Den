import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { createBranch } from "../../../Api/branchApi.js";

const initialState = {
  branchName: "",
  address: "",
  phone: "",
  email: "",
  status: true,
};

const AddBranchModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // Reset Form When Modal Opens
  // ==========================================

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
      setError("");
    }
  }, [isOpen]);

  // ==========================================
  // Handle Input Change
  // ==========================================

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

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==========================================
    // Validation
    // ==========================================

    if (!formData.branchName.trim()) {
      setError("Please enter branch name.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Please enter branch address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter phone number.");
      return;
    }

    // Basic phone validation
    if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Email validation only if email is entered
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // API CALL
      // ==========================================

      const data = await createBranch({
        branchName: formData.branchName.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        status: formData.status,

        // These are initialized by the schema,
        // but we explicitly send 0 here as well.
        totalUsers: 0,
        totalTrainers: 0,
      });

      console.log(
        "Created Branch:",
        data
      );

      // ==========================================
      // Parent Callback
      // ==========================================

      if (onSubmit) {
        onSubmit(data.branch);
      }

      // ==========================================
      // Close Modal
      // ==========================================

      onClose();

      // ==========================================
      // Reset Form
      // ==========================================

      setFormData(initialState);
      setError("");
    } catch (error) {
      console.error(
        "Create Branch Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create branch"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
              max-h-[95vh]
              overflow-y-auto
              rounded-3xl
              border border-gray-200/60
              dark:border-white/10
              bg-white
              dark:bg-[#0B1120]
              shadow-2xl
              overflow-hidden
            "
          >
            {/* ==========================================
                HEADER
            ========================================== */}

            <div
              className="
                flex items-center justify-between
                px-6 py-5
                bg-gradient-to-r
                from-[#8B0000]
                to-[#F96B00]
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    p-3 rounded-2xl
                    bg-white/20
                    text-white
                  "
                >
                  <Building2 size={22} />
                </div>

                <div>
                  <h2
                    className="
                      text-xl font-bold
                      text-white
                    "
                  >
                    Add New Branch
                  </h2>

                  <p
                    className="
                      text-sm
                      text-orange-100
                    "
                  >
                    Create a new branch profile
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  p-2 rounded-xl
                  text-white
                  hover:bg-white/20
                  transition
                  disabled:opacity-50
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* ==========================================
                FORM
            ========================================== */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* ======================================
                    Branch Name
                ====================================== */}

                <InputField
                  label="Branch Name"
                  name="branchName"
                  placeholder="Enter branch name"
                  value={formData.branchName}
                  onChange={handleChange}
                  icon={Building2}
                  required
                />

                {/* ======================================
                    Phone
                ====================================== */}

                <InputField
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  required
                />

                {/* ======================================
                    Email
                ====================================== */}

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                />

                {/* ======================================
                    Address
                ====================================== */}

                <div className="md:col-span-2">
                  <label
                    className="
                      flex items-center gap-1
                      mb-2
                      text-sm font-medium
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Address

                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="
                        absolute
                        left-4
                        top-4
                        text-orange-500
                      "
                    />

                    <textarea
                      name="address"
                      rows="4"
                      placeholder="Enter complete branch address"
                      value={formData.address}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-2xl
                        border border-gray-300
                        dark:border-white/10
                        bg-white
                        dark:bg-[#060816]
                        pl-11
                        pr-4
                        py-3
                        text-gray-900
                        dark:text-white
                        placeholder-gray-400
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
              </div>

              {/* ==========================================
                  Branch Statistics
                  These are controlled by backend.
              ========================================== */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-blue-500/20
                  bg-blue-500/5
                  px-4 py-4
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-blue-500/10
                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <Building2
                      size={19}
                      className="text-blue-500"
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Branch Statistics
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        leading-5
                      "
                    >
                      Total users and trainers will
                      automatically start at 0 and can
                      be updated as users and trainers
                      are assigned to this branch.
                    </p>
                  </div>
                </div>
              </div>

              {/* ==========================================
                  Status
              ========================================== */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-gray-200
                  dark:border-white/10
                  bg-gray-50
                  dark:bg-[#060816]
                  px-4 py-4
                  flex items-center justify-between
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-green-500/10
                      flex items-center justify-center
                    "
                  >
                    <CheckCircle2
                      size={20}
                      className="text-green-500"
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Active Branch
                    </h3>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      "
                    >
                      Enable this branch immediately
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={handleChange}
                    className="sr-only peer"
                  />

                  <div
                    className="
                      w-11 h-6
                      bg-gray-300
                      peer-focus:outline-none
                      peer-focus:ring-4
                      peer-focus:ring-orange-500/20
                      rounded-full
                      peer
                      dark:bg-gray-700
                      peer-checked:bg-orange-500
                      after:content-['']
                      after:absolute
                      after:top-[2px]
                      after:left-[2px]
                      after:bg-white
                      after:border-gray-300
                      after:border
                      after:rounded-full
                      after:h-5
                      after:w-5
                      after:transition-all
                      peer-checked:after:translate-x-full
                      peer-checked:after:border-white
                    "
                  />
                </label>
              </div>

              {/* ==========================================
                  Error
              ========================================== */}

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

              {/* ==========================================
                  BUTTONS
              ========================================== */}

              <div
                className="
                  flex justify-end gap-3
                  mt-8
                "
              >
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
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
                    disabled:opacity-50
                    disabled:cursor-not-allowed
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
                    from-[#8B0000]
                    to-[#F96B00]
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

// ==========================================
// Reusable Input Field
// ==========================================

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  required = false,
}) => {
  return (
    <div>
      <label
        className="
          flex items-center gap-1
          mb-2
          text-sm font-medium
          text-gray-700
          dark:text-gray-300
        "
      >
        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="
              absolute
              left-4
              top-3.5
              text-orange-500
            "
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full
            rounded-2xl
            border border-gray-300
            dark:border-white/10
            bg-white
            dark:bg-[#060816]
            px-4 py-3
            ${Icon ? "pl-11" : ""}
            text-gray-900
            dark:text-white
            placeholder-gray-400
            outline-none
            transition
            focus:border-orange-500
            focus:ring-2
            focus:ring-orange-500/20
          `}
        />
      </div>
    </div>
  );
};

export default AddBranchModal;

