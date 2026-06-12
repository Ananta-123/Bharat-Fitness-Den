import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./Components/Layout/DashboardLayout.jsx";

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
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;