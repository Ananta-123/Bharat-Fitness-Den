import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

import StatusBadge from "./StatusBadge";

const UserRow = ({ user }) => {
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
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
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
              {user.name}
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
              {user.gender}, {user.age} yrs
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
            {user.phone}
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
          {user.plan}
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
        {user.branch}
      </td>

      {/* WORKOUTS */}
      <td className="px-6 py-2">
        <div className="flex items-center gap-2">
          {/* BAR */}
          <div
            className="
              w-24 h-1.5 rounded-full
              overflow-hidden
              bg-gray-200
              dark:bg-white/10
            "
          >
            <div
              className="
                h-full rounded-full
                bg-gradient-to-r
                from-orange-500 to-amber-400
                transition-all duration-500
              "
              style={{
                width: `${Math.min(
                  user.workouts / 3,
                  100
                )}%`,
              }}
            />
          </div>

          <span
            className="
              text-sm font-medium
              text-gray-800
              dark:text-white
              transition-colors duration-300
            "
          >
            {user.workouts}
          </span>
        </div>
      </td>

      {/* JOINED */}
      <td
        className="
          px-6 py-2 text-sm
          text-gray-600
          dark:text-gray-400
          transition-colors duration-300
        "
      >
        {user.joined}
      </td>

      {/* STATUS */}
      <td className="px-6 py-2">
        <StatusBadge
          status={user.status}
        />
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-2">
        <div className="flex gap-2">
          {/* VIEW */}
          <button
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
          </button>

          {/* EDIT */}
          <button
            className="
              p-1.5 rounded-full
              border
              border-gray-300
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