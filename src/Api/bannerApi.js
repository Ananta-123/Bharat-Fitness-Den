import axiosInstance from "../Api/axios.js";


// ======================================
// Get All Banners
// GET /api/banners
// ======================================
export const getAllBanners = async () => {
  const res = await axiosInstance.get("/banners");
  return res.data;
};

// ======================================
// Get Banner By ID
// GET /api/banners/:id
// ======================================
export const getBannerById = async (id) => {
  const res = await axiosInstance.get(`/banners/${id}`);
  return res.data;
};

// ======================================
// Create Banner
// POST /api/banners
// ======================================
export const createBanner = async (data) => {
  const res = await axiosInstance.post("/banners", data);
  return res.data;
};

// ======================================
// Update Banner
// PUT /api/banners/:id
// ======================================
export const updateBanner = async (id, data) => {
  const res = await axiosInstance.put(`/banners/${id}`, data);
  return res.data;
};

// ======================================
// Delete Banner
// DELETE /api/banners/:id
// ======================================
export const deleteBanner = async (id) => {
  const res = await axiosInstance.delete(`/banners/${id}`);
  return res.data;
};