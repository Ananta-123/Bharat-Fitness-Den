import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

import StatusBadge from "./StatusBadge";

const UserRow = ({ user, onEdit, onDelete, }) => {
  return (
    <motion.tr
      whileHover={{
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        border-b
        border-gray-200/60
        dark:border-white/5

        transition-all
        duration-300

        hover:bg-gradient-to-r
        hover:from-[#8B0000]/20
        hover:to-[#F96B00]/20

        hover:text-black
        dark:hover:text-white
      "
    >
      {/* MEMBER */}
      <td className="px-6 py-2">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div
            className="
              h-8 w-8 rounded-full
              bg-gradient-to-br
              from-orange-500 to-red-600
              flex items-center justify-center
              font-semibold text-sm text-white
              shrink-0
              shadow-md
            "
          >
            {user.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2) || "NA"}
          </div>

          {/* NAME */}
          <div className="leading-tight">
            <h3
              className="
                font-semibold text-sm
                text-gray-900
                dark:text-white
                transition-colors duration-300
              "
            >
              {user.fullName}
            </h3>

            <p
              className="
                text-xs mt-1
                text-gray-500
                dark:text-gray-400

                group-hover:text-black
                dark:group-hover:text-white/80

                transition-colors duration-300
              "
            >
              {user.role}
            </p>
          </div>
        </div>
      </td>

      {/* CONTACT */}
      <td className="px-6 py-2">
        <div className="leading-tight">
          <p
            className="
              text-sm
              text-gray-800
              dark:text-gray-200
              transition-colors duration-300
            "
          >
            {user.email}
          </p>

          <p
            className="
              text-xs mt-1
              text-gray-500
              dark:text-gray-400
              transition-colors duration-300
            "
          >
            {user.mobile}
          </p>
        </div>
      </td>

      {/* PLAN */}
      <td className="px-6 py-2">
        <div
          className="
            px-3 py-1 rounded-full
            bg-orange-100
            dark:bg-orange-500/10

            text-orange-700
            dark:text-orange-400

            text-xs font-semibold
            w-fit

            border border-orange-200
            dark:border-orange-500/10

            transition-all duration-300
          "
        >
          {user.subscriptionPlanId?.name}
        </div>
      </td>

      {/* BRANCH */}
      <td
        className="
          px-6 py-2 text-sm
          text-gray-700
          dark:text-gray-300
          transition-colors duration-300
        "
      >
        {user.branchId?.branchName}
      </td>

      {/* WORKOUTS */}
     

      {/* JOINED */}
      <td
        className="
          px-6 py-2 text-sm
          text-gray-600
          dark:text-gray-400
          transition-colors duration-300
        "
      >
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      {/* STATUS */}
      <td className="px-6 py-2">
        <StatusBadge
  status={
    user.isActive
      ? "active"
      : "inactive"
  }
/>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-2">
        <div className="flex gap-2">
          {/* VIEW */}
          {/* <button
            className="
              p-1.5 rounded-full
              border
              border-gray-300
              dark:border-white/10

              text-gray-600
              dark:text-gray-300

              hover:border-orange-500
              hover:text-orange-500
              hover:scale-110

              transition-all duration-200
            "
          >
            <Eye size={16} />
          </button> */}

          {/* EDIT */}
          <button
  onClick={() => onEdit(user)}
  className="
    p-1.5 rounded-full
    border border-gray-300
    dark:border-white/10
    text-gray-600
    dark:text-gray-300
    hover:border-blue-500
    hover:text-blue-500
    hover:scale-110
    transition-all duration-200
  "
>
  <Pencil size={16} />
</button>

          {/* DELETE */}
          <button
  onClick={() =>
    onDelete(user._id)
  }
  className="
    p-1.5 rounded-full

    border
    border-gray-300
    dark:border-white/10

    text-gray-600
    dark:text-gray-300

    hover:border-red-500
    hover:text-red-500
    hover:scale-110

    transition-all duration-200
  "
>
  <Trash2 size={16} />
</button>
        </div>
      </td>
    </motion.tr>
  );
};

export default UserRow;