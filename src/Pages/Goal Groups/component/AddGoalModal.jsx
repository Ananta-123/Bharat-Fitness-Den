import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Target } from "lucide-react";

export default function AddGoalModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const initialForm = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Goal name is required");
      return;
    }

    try {
      setLoading(true);

      await onSubmit(formData);

      setFormData(initialForm);
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
          }}
          transition={{ duration: 0.25 }}
          className="
            w-full
            max-w-xl
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl

            dark:bg-slate-900
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-200
              px-6
              py-5

              dark:border-slate-700
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-[#C11200]
                  to-[#F96B00]
                  text-white
                "
              >
                <Target size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create Goal Group
                </h2>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Add a new fitness goal category
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                rounded-lg
                p-2
                text-gray-500
                transition

                hover:bg-gray-100

                dark:hover:bg-slate-800
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >
            {/* Goal Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Goal Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter goal name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition

                  focus:border-[#F96B00]

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition

                  focus:border-[#F96B00]

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>

            {/* Future Fields */}

            {/*
                Status Switch

                Icon Picker

                Color Picker

                Priority

                Trainer Assignment

                Default Diet Plan
            */}

            {/* Buttons */}

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-5
                  py-2.5
                  font-medium
                  text-gray-700
                  transition

                  hover:bg-gray-100

                  dark:border-slate-700
                  dark:text-gray-300
                  dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                disabled={loading}
                type="submit"
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-[#C11200]
                  to-[#F96B00]
                  px-6
                  py-2.5
                  font-semibold
                  text-white
                  shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Creating..." : "Create Goal"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}