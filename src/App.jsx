import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./Pages/Dashboard/DashboardPage.jsx"
import DashboardLayout from "./Components/Layout/DashboardLayout.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import ProfilePage from "./Pages/AdminProfile/ProfilePage.jsx";
import UsersPage from "./Pages/Users/UserPage.jsx";
import BranchPage from "./Pages/Branches/BranchPage.jsx";
import TrainerPage from "./Pages/Trainer/TrainerPage.jsx";
import SubscriptionPage from "./Pages/SubscriptionPlans/SubscriptionPage.jsx";
import SupplementManagement from "./Pages/Supplements Management/SuplementManagement.jsx";
import CategoryPage from "./Pages/Supplements Management/Category/Category.jsx";
import SupplementStorePage from "./Pages/Supplements Management/Supplements/SupplementStorePage.jsx";
import GoalGroupPage from "./Pages/Goal Groups/GoalGroupPage.jsx";
import WorkoutPage from "./Pages/Workout/WorkoutPage.jsx";
import DietPage from "./Pages/Diet Plan/DietPage.jsx";
import BannerPage from "./Pages/Banners/BannerPage.jsx";
import ReportsPage from "./Pages/Reports/ReportsPage.jsx"
import OffersPage from "./Pages/Offers/OffersPage.jsx";
import CartPage from "./Pages/Cart/CartPage.jsx";
import ExercisePage from "./Pages/Exercise/ExercisePage.jsx"





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
            element={<DashboardPage />}
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
          <Route path="supplements" element={<SupplementManagement />}>
            <Route index element={<CategoryPage />} />
            <Route path="store" element={<SupplementStorePage />} />
          </Route>

          <Route


            path="profile"
            element={<ProfilePage />}
          />
          <Route path="goalgroups" element={<GoalGroupPage />} />
          <Route path="workouts" element={<WorkoutPage />} />
          <Route path="diet-plans" element={<DietPage />} />
          <Route path="banners" element={<BannerPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="carts" element={<CartPage />} />
          <Route path="exercise" element={<ExercisePage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;