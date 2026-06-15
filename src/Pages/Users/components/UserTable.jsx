import UserRow from "./UserRow";

const UserTable = ({ users }) => {
  return (
    <div
      className="
        overflow-x-auto
        rounded-3xl
        border

        border-gray-200
        dark:border-white/10

        bg-white
        dark:bg-[#070B1A]

        shadow-sm
        dark:shadow-none

        transition-all duration-300
      "
    >
      <table className="w-full border-collapse">
        {/* TABLE HEADER */}
        <thead
          className="
            border-b

            border-gray-200
            dark:border-white/10

            bg-gray-50
            dark:bg-[#070B1A]

            text-left

            text-gray-500
            dark:text-gray-400
          "
        >
          <tr>
            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              MEMBER
            </th>

            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              CONTACT
            </th>

            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              PLAN
            </th>

            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              BRANCH
            </th>

            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              WORKOUTS
            </th>

            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              JOINED
            </th>

            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              STATUS
            </th>

            <th
              className="
                px-6 py-4
                text-xs
                font-semibold
                tracking-wider
              "
            >
              ACTIONS
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody
          className="
            bg-white
            dark:bg-[#070B1A]

            text-gray-800
            dark:text-white

            transition-all duration-300
          "
        >
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;