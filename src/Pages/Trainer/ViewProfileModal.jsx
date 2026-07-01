import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import AssignClientModal from "./components/AssignClientModal.jsx";

import {
  updateTrainer,
} from "../../Api/trainerApi";

import { getAllUsers } from "../../Api/userApi";

export default function ViewProfileModal({
  isOpen,
  onClose,
  trainer,
  fetchTrainers,
}) {

  const [isEditing, setIsEditing] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
  try {
    const res = await getAllUsers();
    setUsers(res.users || []);
  } catch (err) {
    console.log(err);
  }
};
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
    });

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name || "",
        email: trainer.email || "",
        phone: trainer.phone || "",
        specialization:
          trainer.specialization || "",
        experience:
          trainer.experience || "",
      });
    }
  }, [trainer]);

  
  if (!isOpen || !trainer) return null;

  const handleUpdate = async () => {
    try {
      const response =
        await updateTrainer(
          trainer._id,
          formData
        );

      console.log(response);
      await fetchTrainers();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-[480px]
          mx-4
          rounded-3xl
          border
          border-gray-200
          dark:border-orange-900/30
          bg-white
          dark:bg-[#050A1D]
          shadow-2xl
          p-6
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            h-10
            w-10
            rounded-xl
            bg-gray-100
            dark:bg-[#11182F]
            flex
            items-center
            justify-center
            text-gray-500
          "
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex gap-4 items-start">
          <div
            className="
              h-16
              w-16
              rounded-2xl
              flex
              items-center
              justify-center
              font-bold
              text-2xl
              bg-orange-500/10
              border
              border-orange-500/30
              text-[#F96B00]
            "
          >
            {trainer.name
  ?.split(" ")
  .map((word) => word[0])
  .join("")}
          </div>

          <div>
            {isEditing ? (
  <input
    value={formData.name}
    onChange={(e) =>
      setFormData({
        ...formData,
        name: e.target.value,
      })
    }
    className="w-full border rounded-xl px-3 py-2"
  />
) : (
  <h2 className="text-2xl font-bold">
    {trainer.name}
  </h2>
)}

{isEditing ? (
  <input
    value={formData.email}
    onChange={(e) =>
      setFormData({
        ...formData,
        email: e.target.value,
      })
    }
    className="w-full border rounded-xl px-3 py-2 mt-2"
  />
) : (
  <p>{trainer.email}</p>
)}

{isEditing ? (
  <input
    value={formData.phone}
    onChange={(e) =>
      setFormData({
        ...formData,
        phone: e.target.value,
      })
    }
    className="w-full border rounded-xl px-3 py-2 mt-2"
  />
) : (
  <p>{trainer.phone}</p>
)}

{isEditing ? (
  <input
    value={formData.specialization}
    onChange={(e) =>
      setFormData({
        ...formData,
        specialization: e.target.value,
      })
    }
    className="w-full border rounded-xl px-3 py-2 mt-2"
  />
) : (
  <p>{trainer.specialization}</p>
)}

{isEditing ? (
  <input
    type="number"
    value={formData.experience}
    onChange={(e) =>
      setFormData({
        ...formData,
        experience: e.target.value,
      })
    }
    className="w-full border rounded-xl px-3 py-2 mt-2"
  />
) : (
  <p>{trainer.experience} Years</p>
)}

            <p className="text-gray-500 dark:text-gray-400">
              {trainer.specialization}
            </p>

            <span
              className="
                mt-2
                inline-flex
                items-center
                gap-1
                px-3
                py-1
                rounded-full
                bg-green-500/10
                text-green-500
                text-xs
                font-medium
              "
            >
              ● active
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card
  title="Experience"
  value={`${trainer.experience} Years`}
/>

          {/* <Card
            title="Active Clients"
            value={trainer.clients}
          />

          <Card
            title="Rating"
            value={
              <span className="flex items-center gap-1">
                <Star
                  size={16}
                  fill="currentColor"
                  className="text-yellow-500"
                />
                {trainer.rating}
              </span>
            }
          />

          <Card
            title="Branch"
            value={trainer.location}
          />

          <Card
            title="Monthly Salary"
            value={trainer.salary.replace("/mo", "")}
          />

          <Card
            title="Joined"
            value="Mar 2017"
          /> */}
          <Card
  title="Branch"
  value={
    trainer.branchId?.branchName ||
    "N/A"
  }
/>
        </div>

        {/* Certifications */}
        {/* <div className="mt-6">
          <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Certifications
          </h4>

          <div className="flex flex-wrap gap-2">
            {trainer.certificates.map((cert) => (
              <span
                key={cert}
                className="
                  px-3
                  py-1
                  rounded-full
                  border
                  border-orange-500/20
                  text-[#F96B00]
                  text-sm
                "
              >
                {cert}
              </span>
            ))}
          </div>
        </div> */}

        {/* Footer */}
        <div className="flex gap-3 mt-8">
          <button
  onClick={() => {
    if (isEditing) {
      handleUpdate();
    } else {
      setIsEditing(true);
    }
  }}
  className="
    flex-1
    h-12
    rounded-2xl
    bg-[#F96B00]
    text-white
    font-semibold
  "
>
  {isEditing
    ? "Save Changes"
    : "Edit Trainer"}
</button>

          <button
    onClick={() => {
        fetchUsers();
        setShowAssignModal(true);
    }}
    className="
      px-6
      rounded-2xl
      border
      border-orange-500/20
      text-gray-900
      dark:text-white
      font-semibold
    "
>
    Assign Client
</button>
        </div>
      </div>
      <AssignClientModal
    open={showAssignModal}
    onClose={() => setShowAssignModal(false)}
    trainer={trainer}
    users={users}
    fetchTrainers={fetchTrainers}
/>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      className="
        rounded-2xl
        p-4
        bg-gray-100
        dark:bg-[#090D24]
        border
        border-gray-200
        dark:border-transparent
      "
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <div className="mt-1 font-bold text-lg text-gray-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}