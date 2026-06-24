import { NavLink, Outlet } from "react-router-dom";

const SupplementManagement = () => {
  return (
    <div className="p-6">
      <div className="flex gap-2 mb-6">
        <NavLink
          to="/supplements"
          end
          className={({ isActive }) =>
            isActive
              ? "px-4 py-2 bg-orange-500 text-white rounded-lg"
              : "px-4 py-2 bg-gray-200 rounded-lg"
          }
        >
          Categories
        </NavLink>

        <NavLink
          to="/supplements/store"
          className={({ isActive }) =>
            isActive
              ? "px-4 py-2 bg-orange-500 text-white rounded-lg"
              : "px-4 py-2 bg-gray-200 rounded-lg"
          }
        >
          Supplement Store
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default SupplementManagement;