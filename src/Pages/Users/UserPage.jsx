import { motion } from "framer-motion";

import {
  Plus,
  
} from "lucide-react";

import UserTable from "./components/UserTable.jsx";

import dummyUsers from "./Data/dummyUsers.js";
import SearchBar from "./components/SearchBar.jsx";

const UsersPage = () => {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Members Directory
          </h1>

          <p className="text-gray-400 mt-1">
            {dummyUsers.length} total members registered
          </p>
        </div>

        <motion.button
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
        </motion.button>
      </div>

      {/* SEARCH */}
  <SearchBar/>

      {/* TABLE */}
      <UserTable users={dummyUsers} />
    </div>
  );
};

export default UsersPage;