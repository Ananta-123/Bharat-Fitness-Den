import axiosInstance from "../Api/axios.js";

// ==============================
// Get All Diet Plans
// GET /api/diets
// ==============================
export const getAllDiets = async () => {
  const res = await axiosInstance.get("/diets");
  return res.data;
};

// ==============================
// Get Diet By ID
// GET /api/diets/:id
// ==============================
export const getDietById = async (id) => {
  const res = await axiosInstance.get(`/diets/${id}`);
  return res.data;
};

// ==============================
// Create Diet
// POST /api/diets
// ==============================
export const createDiet = async (data) => {
  const res = await axiosInstance.post("/diets", data);
  return res.data;
};

// ==============================
// Update Diet
// PUT /api/diets/:id
// ==============================
export const updateDiet = async (id, data) => {
  const res = await axiosInstance.put(`/diets/${id}`, data);
  return res.data;
};

// ==============================
// Delete Diet
// DELETE /api/diets/:id
// ==============================
export const deleteDiet = async (id) => {
  const res = await axiosInstance.delete(`/diets/${id}`);
  return res.data;
};