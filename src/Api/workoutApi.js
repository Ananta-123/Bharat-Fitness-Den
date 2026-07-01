import axiosInstance from "../Api/axios.js";

// ==============================
// Get All Workouts
// ==============================

export const getAllWorkouts = async () => {
  const res = await axiosInstance.get("/workouts");
  return res.data;
};

// ==============================
// Get Single Workout
// ==============================

export const getWorkoutById = async (id) => {
  const res = await axiosInstance.get(`/workouts/${id}`);
  return res.data;
};

// ==============================
// Create Workout
// ==============================

export const createWorkout = async (data) => {
  const res = await axiosInstance.post("/workouts", data);
  return res.data;
};

// ==============================
// Update Workout
// ==============================

export const updateWorkout = async (id, data) => {
  const res = await axiosInstance.put(`/workouts/${id}`, data);
  return res.data;
};

// ==============================
// Delete Workout
// ==============================

export const deleteWorkout = async (id) => {
  const res = await axiosInstance.delete(`/workouts/${id}`);
  return res.data;
};