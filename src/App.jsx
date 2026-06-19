import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./Components/Layout/DashboardLayout.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ProfilePage from "./Pages/AdminProfile/ProfilePage.jsx";
import UsersPage from "./Pages/Users/UserPage.jsx";
import BranchPage from "./Pages/Branches/BranchPage.jsx";
import TrainerPage from "./Pages/Trainer/TrainerPage.jsx";
import SubscriptionPage from "./Pages/SubscriptionPlans/SubscriptionPage.jsx";

const Dashboard = () => {
  return (
    <div className="text-lightText dark:text-darkText">
      Dashboard Page
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
            element={<UsersPage />}
          />

          <Route
          path="branches"
          element={<BranchPage />}
        />

        <Route 
        path="trainers"
        element={<TrainerPage />}
        />

        <Route
  path="subscriptions"
  element={<SubscriptionPage />}
/>

          <Route
          
          
  path="profile"
  element={<ProfilePage />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;