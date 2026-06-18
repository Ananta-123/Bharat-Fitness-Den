import axiosInstance from "../Api/axios.js";

// GET ALL TRAINERS
export const getAllTrainers = async () => {
  const response = await axiosInstance.get("/trainers");

  console.log(response.data);

  return response.data;
};

// CREATE TRAINER
export const createTrainer = async (trainerData) => {
  const response = await axiosInstance.post(
    "/trainers",
    trainerData
  );

  return response.data;
};

//update trainer
export const updateTrainer = async (
  trainerId,
  trainerData
) => {
  const response =
    await axiosInstance.put(
      `/trainers/${trainerId}`,
      trainerData
    );

  return response.data;
};

//Delete trainer

export const deleteTrainer = async (
  trainerId
) => {
  const response =
    await axiosInstance.delete(
      `/trainers/${trainerId}`
    );

  return response.data;
};