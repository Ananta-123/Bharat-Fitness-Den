import axiosInstance from "../Api/axios.js";

// Get All Users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users");

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// update user

export const updateUser = async (
  id,
  data
) => {
  try {
    const response =
      await axiosInstance.put(
        `/admin/users/${id}`,
        data
      );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error
    );
    throw error;
  }
};

//delete user

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/users/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error
    );

    throw error;
  }
};