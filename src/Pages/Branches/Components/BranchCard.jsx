import { motion } from "framer-motion";

import {
  Building2,
  MapPin,
  Users,
  Activity,
  DollarSign,
  Phone,
  Clock3,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import BranchMiniChart from "./BranchMiniChart";

const BranchCard = ({ branch }) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        rounded-3xl
        p-6

        bg-white
        dark:bg-[#050816]

        border
        border-gray-200
        dark:border-orange-500/20

        shadow-sm
        dark:shadow-none

        transition-all
      "
    >
      {/* TOP */}

      <div
        className="
          flex items-start
          justify-between
          gap-4
        "
      >
        <div className="flex gap-4">
          <div
            className="
              h-14 w-14
              rounded-2xl
              flex items-center justify-center

              bg-orange-100
              dark:bg-orange-500/10
            "
          >
            <Building2
              className="
                text-orange-500
              "
            />
          </div>

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {branch.name}
            </h2>

            <div
              className="
                flex items-center gap-2
                mt-1
                text-gray-500
                dark:text-gray-400
              "
            >
              <MapPin size={15} />
              {branch.location}
            </div>
          </div>
        </div>

        <StatusBadge
          status={branch.status}
        />
      </div>

      {/* STATS */}

      <div
        className="
          grid grid-cols-3
          gap-4
          mt-6
        "
      >
        <div
          className="
            rounded-2xl
            p-4
            bg-gray-100
            dark:bg-[#0B1023]
          "
        >
          <Users
            size={18}
            className="text-lime-400 mb-2"
          />

          <h3
            className="
              text-2xl
              font-bold
              dark:text-white
            "
          >
            {branch.members}
          </h3>

          <p className="text-gray-400 text-sm">
            Members
          </p>
        </div>

        <div
          className="
            rounded-2xl
            p-4
            bg-gray-100
            dark:bg-[#0B1023]
          "
        >
          <Activity
            size={18}
            className="text-orange-400 mb-2"
          />

          <h3
            className="
              text-2xl
              font-bold
              dark:text-white
            "
          >
            {branch.trainers}
          </h3>

          <p className="text-gray-400 text-sm">
            Trainers
          </p>
        </div>

        <div
          className="
            rounded-2xl
            p-4
            bg-gray-100
            dark:bg-[#0B1023]
          "
        >
          <DollarSign
            size={18}
            className="text-green-400 mb-2"
          />

          <h3
            className="
              text-2xl
              font-bold
              dark:text-white
            "
          >
            ${branch.revenue}
          </h3>

          <p className="text-gray-400 text-sm">
            Revenue
          </p>
        </div>
      </div>

      {/* CAPACITY */}

      <div className="mt-6">
        <div
          className="
            flex items-center
            justify-between
            mb-2
          "
        >
          <p
            className="
              text-gray-500
              dark:text-gray-400
            "
          >
            Capacity Usage
          </p>

          <p
            className="
              font-semibold
              text-orange-500
            "
          >
            {branch.capacity}%
          </p>
        </div>

        <div
          className="
            h-2
            rounded-full
            bg-gray-200
            dark:bg-white/10
            overflow-hidden
          "
        >
          <div
            style={{
              width: `${branch.capacity}%`,
            }}
            className="
              h-full
              rounded-full
              bg-orange-500
            "
          />
        </div>
      </div>

      <BranchMiniChart
        chartData={branch.chartData}
      />

      {/* FOOTER */}

      <div
        className="
          mt-8
          pt-5
          border-t
          border-gray-200
          dark:border-white/10
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          <div className="flex items-center gap-2">
            <Phone size={15} />
            {branch.phone}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={15} />
            {branch.timing}
          </div>
        </div>

        <div
          className="
            flex gap-4
            mt-5
          "
        >
          <button
            className="
              flex-1
              py-3
              rounded-2xl
              font-semibold
              text-white

              bg-gradient-to-r
              from-orange-500
              to-orange-400

              hover:scale-[1.01]
              transition-all
            "
          >
            Manage
          </button>

          <button
            className="
              px-6
              rounded-2xl
              border
              border-gray-200
              dark:border-orange-500/20

              bg-gray-100
              dark:bg-[#0B1023]

              font-semibold
              dark:text-white
            "
          >
            Analytics
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BranchCard;