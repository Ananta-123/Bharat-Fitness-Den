import {
  Search,
  ChevronDown,
  Filter,
} from "lucide-react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedPlan,
  setSelectedPlan,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div
      className="
        p-4 rounded-3xl

        border border-gray-200
        dark:border-white/10

        bg-white
        dark:bg-[#070B1A]

        shadow-sm
        dark:shadow-none

        transition-all duration-300
      "
    >
      <div
        className="
          flex flex-col lg:flex-row
          gap-3
          items-stretch lg:items-center
        "
      >
        {/* SEARCH INPUT */}
        <div
          className="
            flex-1
            flex items-center gap-3

            px-4 py-3 rounded-2xl

            bg-gray-100
            dark:bg-[#02045D]/40

            border border-gray-200
            dark:border-white/10

            transition-all duration-300

            focus-within:border-orange-500
            focus-within:ring-2
            focus-within:ring-orange-500/20
          "
        >
          <Search
            className="
              text-gray-500
              dark:text-gray-400
            "
            size={20}
          />

          <input
  type="text"
  placeholder="Search members..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="
    bg-transparent
    outline-none
    w-full

    text-sm

    text-gray-800
    dark:text-white

    placeholder:text-gray-500
    dark:placeholder:text-gray-400
  "
/>
        </div>

        {/* FILTER ICON */}
        <button
          className="
            h-12 w-12 shrink-0

            rounded-2xl

            border border-gray-200
            dark:border-white/10

            bg-gray-100
            dark:bg-[#02045D]/40

            flex items-center justify-center

            text-gray-600
            dark:text-gray-300

            hover:border-orange-500
            hover:text-orange-500

            transition-all duration-300
          "
        >
          <Filter size={18} />
        </button>

        {/* PLAN DROPDOWN */}
        <div className="relative">
          <select
  value={selectedPlan}
  onChange={(e) =>
    setSelectedPlan(e.target.value)
  }
  className="
    appearance-none
    h-12
    min-w-[150px]
    px-5 pr-10
    rounded-2xl
    border border-gray-200
    dark:border-white/10
    bg-gray-100
    dark:bg-[#02045D]/40
    text-sm font-medium
    text-gray-800
    dark:text-white
    outline-none
    hover:border-orange-500
    focus:border-orange-500
    transition-all duration-300
    cursor-pointer
  "
>
          
            <option>All Plans</option>
            <option>Elite</option>
            <option>Premium</option>
            <option>Standard</option>
            <option>Basic</option>
          </select>

          <ChevronDown
            size={16}
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              pointer-events-none

              text-gray-600
              dark:text-gray-300
            "
          />
        </div>

        {/* STATUS DROPDOWN */}
        <div className="relative">
          <select
  value={selectedStatus}
  onChange={(e) =>
    setSelectedStatus(e.target.value)
  }
  className="
    appearance-none
    h-12
    min-w-[150px]
    px-5 pr-10
    rounded-2xl
    border border-gray-200
    dark:border-white/10
    bg-gray-100
    dark:bg-[#02045D]/40
    text-sm font-medium
    text-gray-800
    dark:text-white
    outline-none
    hover:border-orange-500
    focus:border-orange-500
    transition-all duration-300
    cursor-pointer
  "
>
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>

          <ChevronDown
            size={16}
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              pointer-events-none

              text-gray-600
              dark:text-gray-300
            "
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;