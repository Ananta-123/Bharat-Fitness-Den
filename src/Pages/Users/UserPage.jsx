import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../Api/userApi.js";

import { motion } from "framer-motion";


import {
  Plus,
  
} from "lucide-react";

import UserTable from "./components/UserTable.jsx";


import SearchBar from "./components/SearchBar.jsx";
import EditMemberModal from "./components/EditMemberModal.jsx";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
const [selectedPlan, setSelectedPlan] = useState("All Plans");
const [selectedStatus, setSelectedStatus] = useState("All Status");

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);

const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

const [deleteLoading, setDeleteLoading] = useState(false);

const handleEditUser = (user) => {
  setSelectedUser(user);
  setIsEditOpen(true);
};

const handleDeleteUser = async (
  userId
) => {
  const confirmed =
    window.confirm(
      "Are you sure you want to delete this member?"
    );

  if (!confirmed) return;

  try {
    setDeleteLoading(true);

    await deleteUser(userId);

    await fetchUsers();

    alert(
      "Member deleted successfully"
    );
  } catch (error) {
    console.error(error);

    alert(
      "Failed to delete member"
    );
  } finally {
    setDeleteLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    setLoading(true);

    const res = await getAllUsers();

    console.log("Users API Response:", res);

    setUsers(res.data || res.users || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const filteredUsers = users.filter((user) => {
  const matchesSearch =
  (user.fullName || "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  (user.email || "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  (user.mobile || "")
    .includes(searchTerm);

  const matchesPlan =
    selectedPlan === "All Plans" ||
    user.subscriptionPlanId?.name === selectedPlan

  const matchesStatus =
    selectedStatus === "All Status" ||
    (user.isActive ? "active" : "inactive") ===
      selectedStatus.toLowerCase();

  return (
    matchesSearch &&
    matchesPlan &&
    matchesStatus
  );
});

if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">
          Loading users...
        </p>
      </div>
    );
  }

  
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-400 mt-1">
            {users.length} total members registered
          </p>
        </div>

      {/* add user access later */}
        {/* <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            flex items-center gap-2
            px-6 py-3 rounded-2xl
            bg-gradient-to-r
            from-orange-500 to-amber-400
            text-white font-semibold
            shadow-lg shadow-orange-500/20
          "
        >
          <Plus size={18} />
          Add Member
        </motion.button> */}
      </div>

      {/* SEARCH */}
  <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedPlan={selectedPlan}
  setSelectedPlan={setSelectedPlan}
  selectedStatus={selectedStatus}
  setSelectedStatus={setSelectedStatus}
/>



      {/* TABLE */}
      <UserTable users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />

      <EditMemberModal
  isOpen={isEditOpen}
  onClose={() => {
    setIsEditOpen(false);
    setSelectedUser(null);
  }}
  user={selectedUser}
  onSuccess={fetchUsers}
/>
      
    </div>
    
  );
};

export default UsersPage;