import { useState } from "react";

import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-lightBg dark:bg-darkBg min-h-screen">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300
          ${
            collapsed
              ? "md:ml-[90px]"
              : "md:ml-[280px]"
          }
        `}
      >
        {/* Navbar */}
        <Navbar setMobileOpen={setMobileOpen} />

        {/* Page Content */}
        <main
          className="
            p-4 md:p-6
            pt-6
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;