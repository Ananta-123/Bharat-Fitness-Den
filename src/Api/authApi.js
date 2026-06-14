import api from "./axios.js";

export const loginAdmin = async (loginData) => {
  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};


// LOGOUT
export const logoutAdmin = async () => {

  const refreshToken =
    localStorage.getItem(
      "refreshToken"
    );

  const response = await api.post(
    "/auth/logout",
    {
      refreshToken,
    }
  );

  return response.data;
};

// export const registerAdmin = async (data) => {
//   const response = await api.post(
//     "/auth/register",
//     data
//   );

//   return response.data;
// };