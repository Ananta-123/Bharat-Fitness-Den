import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";

export default function ExerciseHeader({
  totalExercises,
  searchTerm,
  setSearchTerm,
  onCreate,
}) {
  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Exercise Library
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {totalExercises}{" "}
            {totalExercises === 1 ? "exercise" : "exercises"} available
          </p>
        </div>

        {/* Add Button */}
        <motion.button
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={onCreate}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-red-700
            to-orange-500
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            transition-all
            hover:shadow-orange-500/30
          "
        >
          <Plus size={18} />

          Create Exercise
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-white
            py-3
            pl-11
            pr-4
            text-sm
            text-gray-800
            shadow-sm
            outline-none
            transition-all
            placeholder:text-gray-400
            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-500/20

            dark:border-slate-700
            dark:bg-slate-900/70
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-orange-500
            dark:focus:ring-orange-500/20
          "
        />
      </div>
    </div>
  );
}