import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // IF USER NOT LOGGED IN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // IF LOGGED IN
  return children;
};

export default ProtectedRoute;