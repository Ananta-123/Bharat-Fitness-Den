import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Building2,
  MapPin,
  Map,
  Phone,
  Mail,
} from "lucide-react";

const UpdateBranchModal = ({
  isOpen,
  onClose,
  branch,
  onUpdate,
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

  // PREFILL DATA

  useEffect(() => {
    if (branch) {
      setFormData({
        branchName:
          branch.branchName || "",

        address:
          branch.address || "",

        city: branch.city || "",

        state:
          branch.state || "",

        phone:
          branch.phone || "",

        email:
          branch.email || "",
      });
    }
  }, [branch]);

  // HANDLE CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();

    // FUTURE API CONNECTION

    console.log(formData);

    if (onUpdate) {
      onUpdate(formData);
    }

    onClose();
  };

  const inputClass = `
    w-full
    rounded-2xl
    px-4 py-3

    bg-gray-100
    dark:bg-[#0B1023]

    border
    border-gray-200
    dark:border-orange-500/10

    text-gray-900
    dark:text-white

    placeholder:text-gray-400

    outline-none

    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20

    transition-all
  `;

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
            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between

                px-6 py-5

                border-b
                border-gray-200
                dark:border-white/10
              "
            >
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold

                    text-gray-900
                    dark:text-white
                  "
                >
                  Update Branch
                </h2>

                <p
                  className="
                    text-sm
                    mt-1

                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Update branch details
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  h-11 w-11
                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  bg-gray-100
                  dark:bg-[#0B1023]

                  text-gray-700
                  dark:text-white

                  hover:scale-105

                  transition-all
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
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >
                {/* BRANCH NAME */}

                <div>
                  <label
                    className="
                      text-sm
                      font-medium
                      mb-2
                      block

                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Branch Name
                  </label>

                  <div className="relative">
                    <Building2
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
                      type="text"
                      name="branchName"
                      value={
                        formData.branchName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Branch name"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* PHONE */}

                <div>
                  <label
                    className="
                      text-sm
                      font-medium
                      mb-2
                      block

                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Phone
                  </label>

                  <div className="relative">
                    <Phone
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
                      type="text"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Phone number"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* ADDRESS */}

                <div className="md:col-span-2">
                  <label
                    className="
                      text-sm
                      font-medium
                      mb-2
                      block

                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Address
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="
                        absolute
                        left-4
                        top-4

                        text-gray-400
                      "
                    />

                    <textarea
                      rows={3}
                      name="address"
                      value={
                        formData.address
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Branch address"
                      className={`${inputClass} pl-11 resize-none`}
                    />
                  </div>
                </div>

                {/* CITY */}

                <div>
                  <label
                    className="
                      text-sm
                      font-medium
                      mb-2
                      block

                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    City
                  </label>

                  <div className="relative">
                    <Map
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
                      type="text"
                      name="city"
                      value={
                        formData.city
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="City"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* STATE */}

                <div>
                  <label
                    className="
                      text-sm
                      font-medium
                      mb-2
                      block

                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    State
                  </label>

                  <div className="relative">
                    <Map
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
                      type="text"
                      name="state"
                      value={
                        formData.state
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="State"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* EMAIL */}

                <div className="md:col-span-2">
                  <label
                    className="
                      text-sm
                      font-medium
                      mb-2
                      block

                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail
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
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Email address"
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
                  flex
                  justify-end
                  gap-4

                  mt-8
                "
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    px-6 py-3
                    rounded-2xl

                    bg-gray-100
                    dark:bg-[#0B1023]

                    border
                    border-gray-200
                    dark:border-orange-500/10

                    text-gray-700
                    dark:text-white

                    font-semibold

                    hover:scale-[1.02]

                    transition-all
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    px-7 py-3
                    rounded-2xl

                    font-semibold
                    text-white

                    bg-gradient-to-r
                    from-orange-500
                    to-orange-400

                    hover:scale-[1.02]

                    transition-all
                  "
                >
                  Update Branch
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateBranchModal;