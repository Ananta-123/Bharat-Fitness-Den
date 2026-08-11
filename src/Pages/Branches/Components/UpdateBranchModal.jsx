import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

import { updateBranch } from "../../../Api/branchApi.js";

const initialState = {
  branchName: "",
  address: "",
  phone: "",
  email: "",
  status: true,
};

const UpdateBranchModal = ({
  isOpen,
  onClose,
  branch,
  onUpdate,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // PREFILL BRANCH DATA
  // ==========================================

  useEffect(() => {
    if (branch && isOpen) {
      setFormData({
        branchName:
          branch.branchName || "",

        address:
          branch.address || "",

        phone:
          branch.phone || "",

        email:
          branch.email || "",

        status:
          branch.status ?? true,
      });

      setError("");
    }
  }, [branch, isOpen]);

  // ==========================================
  // HANDLE INPUT CHANGE
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
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==========================================
    // CHECK BRANCH ID
    // ==========================================

    if (!branch?._id) {
      setError("Branch ID is missing.");
      return;
    }

    // ==========================================
    // VALIDATION
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

    // Phone validation
    if (
      !/^[0-9+\-\s()]{7,20}$/.test(
        formData.phone
      )
    ) {
      setError(
        "Please enter a valid phone number."
      );
      return;
    }

    // Email validation
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // UPDATE API
      //
      // Do NOT send totalUsers or totalTrainers
      // because these are system-managed fields.
      // ==========================================

      const response =
        await updateBranch(
          branch._id,
          {
            branchName:
              formData.branchName.trim(),

            address:
              formData.address.trim(),

            phone:
              formData.phone.trim(),

            email:
              formData.email.trim(),

            status:
              formData.status,
          }
        );

      console.log(
        "Updated Branch:",
        response
      );

      // ==========================================
      // SEND UPDATED BRANCH TO PARENT
      // ==========================================

      if (onUpdate) {
        onUpdate(response.branch);
      }

      // ==========================================
      // CLOSE MODAL
      // ==========================================

      onClose();

      // ==========================================
      // RESET FORM
      // ==========================================

      setFormData(initialState);
      setError("");
    } catch (error) {
      console.error(
        "Update Branch Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update branch"
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
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
            p-4
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              w-full
              max-w-2xl
              max-h-[95vh]
              overflow-y-auto
              rounded-3xl
              bg-white
              dark:bg-[#050816]
              border
              border-gray-200
              dark:border-orange-500/20
              shadow-2xl
              overflow-hidden
            "
          >
            {/* ==========================================
                HEADER
            ========================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                px-6
                py-5
                bg-gradient-to-r
                from-[#8B0000]
                to-[#F96B00]
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-white/20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Building2
                    size={22}
                    className="text-white"
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    Update Branch
                  </h2>

                  <p
                    className="
                      text-sm
                      mt-1
                      text-orange-100
                    "
                  >
                    Update branch details
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  h-10
                  w-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
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
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >
                {/* ======================================
                    BRANCH NAME
                ====================================== */}

                <InputField
                  label="Branch Name"
                  name="branchName"
                  value={
                    formData.branchName
                  }
                  onChange={handleChange}
                  placeholder="Enter branch name"
                  icon={Building2}
                  required
                />

                {/* ======================================
                    PHONE
                ====================================== */}

                <InputField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={
                    formData.phone
                  }
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  icon={Phone}
                  required
                />

                {/* ======================================
                    EMAIL
                ====================================== */}

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={
                    formData.email
                  }
                  onChange={handleChange}
                  placeholder="Enter email address"
                  icon={Mail}
                />

                {/* ======================================
                    ADDRESS
                ====================================== */}

                <div className="md:col-span-2">
                  <label
                    className="
                      flex
                      items-center
                      gap-1
                      text-sm
                      font-medium
                      mb-2
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
                      rows={4}
                      name="address"
                      value={
                        formData.address
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter complete branch address"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-gray-300
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
                        resize-none
                        transition
                        focus:border-orange-500
                        focus:ring-2
                        focus:ring-orange-500/20
                      "
                    />
                  </div>
                </div>
              </div>

              {/* ==========================================
                  BRANCH STATISTICS
              ========================================== */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-blue-500/20
                  bg-blue-500/5
                  px-4
                  py-4
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-500/10
                      flex
                      items-center
                      justify-center
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
                        leading-5
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Total users and trainers
                      are system-managed and
                      cannot be edited from this
                      form.
                    </p>

                    <div className="flex gap-5 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">
                          Total Users
                        </p>

                        <p
                          className="
                            text-sm
                            font-bold
                            text-gray-900
                            dark:text-white
                            mt-1
                          "
                        >
                          {branch?.totalUsers ?? 0}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Total Trainers
                        </p>

                        <p
                          className="
                            text-sm
                            font-bold
                            text-gray-900
                            dark:text-white
                            mt-1
                          "
                        >
                          {branch?.totalTrainers ?? 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==========================================
                  STATUS
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
                  px-4
                  py-4
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-green-500/10
                      flex
                      items-center
                      justify-center
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
                        mt-1
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Enable or disable this
                      branch.
                    </p>
                  </div>
                </div>

                {/* Toggle */}

                <label
                  className="
                    relative
                    inline-flex
                    items-center
                    cursor-pointer
                  "
                >
                  <input
                    type="checkbox"
                    name="status"
                    checked={
                      formData.status
                    }
                    onChange={
                      handleChange
                    }
                    className="
                      sr-only
                      peer
                    "
                  />

                  <div
                    className="
                      w-11
                      h-6
                      bg-gray-300
                      dark:bg-gray-700
                      rounded-full
                      peer
                      peer-focus:ring-4
                      peer-focus:ring-orange-500/20
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
                  ERROR
              ========================================== */}

              {error && (
                <div
                  className="
                    mt-5
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-500
                  "
                >
                  {error}
                </div>
              )}

              {/* ==========================================
                  FOOTER
              ========================================== */}

              <div
                className="
                  flex
                  justify-end
                  gap-3
                  mt-8
                "
              >
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="
                    px-5
                    py-3
                    rounded-2xl
                    border
                    border-gray-300
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
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  type="submit"
                  disabled={loading}
                  className="
                    px-6
                    py-3
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
                    ? "Updating..."
                    : "Update Branch"}
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
// REUSABLE INPUT FIELD
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
          flex
          items-center
          gap-1
          text-sm
          font-medium
          mb-2
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
              top-1/2
              -translate-y-1/2
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
            border
            border-gray-300
            dark:border-white/10
            bg-white
            dark:bg-[#060816]
            px-4
            py-3
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

export default UpdateBranchModal;

