import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, User, Mail, Phone, Building2, Award, Briefcase, Image } from "lucide-react";
import { createTrainer } from "../../Api/trainerApi.js";
import { getAllBranches } from "../../Api/branchApi.js";

export default function TrainerModal({
  isOpen,
  onClose,
  onSubmit,
  fetchTrainers,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branchId: "",
    specialization: "",
    experience: "",
    profileImage: "",
  });


  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [branches, setBranches] = useState([]);
useEffect(() => {
  fetchBranches();
}, []);

const fetchBranches =
  async () => {
    try {
      const data =
        await getAllBranches();

      console.log(
        "Branches:",
        data
      );

      setBranches(
        data.branches || []
      );
    } catch (error) {
      console.error(
        "Failed to fetch branches:",
        error
      );
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const trainerData = {
      ...formData,
      experience: Number(formData.experience),
    };

    const response =
  await createTrainer(
    trainerData
  );

await fetchTrainers();

onClose();

    console.log(response);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      branchId: "",
      specialization: "",
      experience: "",
      profileImage: "",
    });

    onClose();

  } catch (error) {
    console.error(error);

    setError(
      error.response?.data?.message ||
      "Failed to create trainer"
    );
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Add Trainer
              </h2>
              <p className="text-sm text-zinc-400">
                Create a new trainer profile
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Trainer Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter trainer name"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />

                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Branch
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />

                  <select
                    name="branchId"
                    required
                    value={formData.branchId}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none focus:border-orange-500"
                  >
                    <option value="">
                      Select Branch
                    </option>

                    {branches.map((branch) => (
                      <option
                        key={branch._id}
                        value={branch._id}
                      >
                        {branch.branchName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Specialization
                </label>

                <div className="relative">
                  <Award
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />

                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Weight Training"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Experience (Years)
                </label>

                <div className="relative">
                  <Briefcase
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />

                  <input
                    type="number"
                    min="0"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-zinc-300">
                  Profile Image URL
                </label>

                <div className="relative">
                  <Image
                    size={18}
                    className="absolute left-3 top-3 text-zinc-500"
                  />

                  <input
                    type="text"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    placeholder="https://example.com/profile.jpg"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none focus:border-orange-500"
                  />
                </div>

                {formData.profileImage && (
                  <img
                    src={formData.profileImage}
                    alt="Preview"
                    className="mt-4 h-24 w-24 rounded-full border border-zinc-700 object-cover"
                  />
                )}
              </div>
            </div>

            {
  error && (
    <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">
      {error}
    </div>
  )
}

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
  type="submit"
  disabled={loading}
  className="rounded-xl bg-gradient-to-r from-red-700 to-orange-500 px-6 py-3 font-semibold text-white disabled:opacity-50"
>
  {loading
    ? "Creating..."
    : "Create Trainer"}
</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}