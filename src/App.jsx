import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./Components/Layout/DashboardLayout.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const Dashboard = () => {
  return (
    <div className="text-lightText dark:text-darkText">
      Dashboard Page
    </div>
  );
};

const Users = () => {
  return (
    <div className="text-lightText dark:text-darkText">
      Users Page
    </div>
  );
};

function App() {
  return (
     <BrowserRouter>
      <Routes>
        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* CHILD ROUTES */}
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="users"
            element={<Users />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;