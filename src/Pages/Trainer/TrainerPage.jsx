import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Star,
  Target,
  MapPin,
  Trash2,
  Plus,
} from "lucide-react";

import TrainerModal from "./TrainerModal.jsx";
import ViewProfileModal from "./ViewProfileModal.jsx";
import {
  getAllTrainers,
  deleteTrainer
} from "../../Api/trainerApi.js";

export default function TrainerPage() {
  const [openModal, setOpenModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const [trainers, setTrainers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchTrainers();
  }, []);
  // console.log(data.trainers);

  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const data =
        await getAllTrainers();

      console.log(data);

      setTrainers(
        data.trainers || []
      );
    } catch (error) {
      console.error(error);
      setError(
        "Failed to load trainers"
      );
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Trainers",
      value: "6",
      icon: <Award size={20} />,
      valueColor: "text-[#F96B00]",
    },
    {
      title: "Active Clients",
      value: "120",
      icon: <Users size={20} />,
      valueColor: "text-green-500",
    },
    {
      title: "Avg Rating",
      value: "4.8",
      icon: <Star size={20} />,
      valueColor: "text-[#F96B00]",
    },
    {
      title: "Avg Experience",
      value: "8y",
      icon: <Target size={20} />,
      valueColor: "text-red-500",
    },
  ];

  const handleDeleteTrainer =
  async (trainerId) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this trainer?"
      );

    if (!confirmDelete) return;

    try {
      await deleteTrainer(
        trainerId
      );

      await fetchTrainers();

      alert(
        "Trainer deleted successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete trainer"
      );
    }
  };

  return (
    <div className="p-6 text-[14px]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trainers Team
          </h1>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            5 active trainers · 120 total clients
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="
            flex items-center gap-2
            px-6 py-3
            rounded-2xl
            bg-[#F96B00]
            hover:bg-[#ff7b1f]
            text-white
            font-semibold
            shadow-lg shadow-orange-500/20
            transition-all
          "
        >
          <Plus size={18} />
          Add Trainer
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((item) => (
          <div
            key={item.title}
            className="
              rounded-3xl
              p-6
              bg-white
              dark:bg-[#050A1D]
              border
              border-gray-200
              dark:border-orange-900/30
            "
          >
            <div className="text-[#F96B00] mb-3">{item.icon}</div>

            <h2 className={`text-3xl font-bold ${item.valueColor}`}>
              {trainers.length}
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* TRAINERS GRID */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {trainers.map((trainer) => {
          // const percentage =
          //   (trainer.capacity / trainer.maxCapacity) * 100;
          const percentage = 0;

          return (
            <motion.div
              key={trainer._id}
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                rounded-3xl
                p-6
                bg-white
                dark:bg-[#050A1D]
                border
                border-gray-200
                dark:border-orange-900/30
              "
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div
  className="
    h-16 w-16
    rounded-2xl
    overflow-hidden
    flex items-center justify-center
    font-bold text-xl
    border
    border-orange-500/30
    bg-orange-500/10
    text-[#F96B00]
  "
>
  {trainer.profileImage ? (
    <img
      src={trainer.profileImage}
      alt={trainer.name || "Trainer"}
      className="h-full w-full object-cover"
    />
  ) : (
    trainer.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  )}
</div>

                  <div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                      {trainer.name}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400">
                      {trainer.specialization}
                    </p>
                  </div>
                </div>

                <span
                  className="
                    px-4 py-1
                    rounded-full
                    bg-green-500/10
                    text-green-500
                    text-xs
                    font-medium
                  "
                >
                  {trainer.status ? "● Active" : "● Inactive"}
                </span>
              </div>

              {/* METRICS */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="rounded-2xl p-4 text-center bg-gray-100 dark:bg-[#090D24]">
                  <h4 className="text-2xl font-bold text-[#F96B00]">
                    {trainer.experience}
                  </h4>

                  <p className="text-gray-500 dark:text-gray-400">
                    Exp
                  </p>
                </div>

                <div className="rounded-2xl p-4 text-center bg-gray-100 dark:bg-[#090D24]">
                  <h4 className="text-2xl font-bold text-green-500">
                    {0}
                  </h4>

                  <p className="text-gray-500 dark:text-gray-400">
                    Clients
                  </p>
                </div>

                {/* <div className="rounded-2xl p-4 text-center bg-gray-100 dark:bg-[#090D24]">
                  <h4 className="text-2xl font-bold text-green-500">
                    {"N/A"}
                  </h4>

                  <p className="text-gray-500 dark:text-gray-400">
                    Rating
                  </p>
                </div> */}
              </div>

              {/* CERTIFICATIONS */}
              {/* <div className="flex flex-wrap gap-2 mt-5">
                {trainer.certificates.map((cert) => (
                  <span
                    key={cert}
                    className="
                      px-3 py-1
                      rounded-full
                      border
                      border-orange-500/20
                      text-[#F96B00]
                      text-xs
                    "
                  >
                    {cert}
                  </span>
                ))}
              </div> */}

              {/* LOCATION + SALARY */}
              {/* <div className="flex justify-between mt-5">
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <MapPin size={14} />
                  {trainer.location}
                </div>

                <span className="font-semibold text-green-500">
                  {trainer.salary}
                </span>
              </div> */}

              {/* CAPACITY */}
              {/* <div className="mt-5">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500 dark:text-gray-400">
                    Client Capacity
                  </span>

                  <span className="font-semibold text-gray-900 dark:text-white">
                    {trainer.capacity}/{trainer.maxCapacity}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-gray-200 dark:bg-[#1A1F3A]">
                  <div
                    className={`h-full rounded-full ${
                      trainer.progressColor === "green"
                        ? "bg-green-500"
                        : "bg-[#F96B00]"
                    }`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div> */}

              {/* FOOTER */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedTrainer(trainer);
                    setOpenProfileModal(true);
                  }}
                  className="
    flex-1
    py-3
    rounded-2xl
    border
    border-orange-500/20
    bg-orange-500/5
    text-[#F96B00]
    font-semibold
  "
                >
                  View Profile
                </button>

                <button
  onClick={() =>
    handleDeleteTrainer(
      trainer._id
    )
  }
  className="
    h-12 w-12
    rounded-2xl
    border
    border-red-500/20
    flex items-center justify-center
    text-red-500
    hover:bg-red-500/10
    transition-all
  "
>
  <Trash2 size={18} />
</button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <TrainerModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        fetchTrainers={
          fetchTrainers
        }
      />
      <ViewProfileModal
  isOpen={
    openProfileModal
  }
  onClose={() =>
    setOpenProfileModal(false)
  }
  trainer={
    selectedTrainer
  }
  fetchTrainers={
    fetchTrainers
  }
/>
    </div>
  );
}