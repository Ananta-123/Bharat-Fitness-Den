import { useState } from "react";

export default function AssignClientModal({
  open,
  onClose,
  trainer,
  users,
  fetchTrainers,
}) {

    const [selectedUsers, setSelectedUsers] = useState([]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-[#050A1D] rounded-3xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Assign Clients
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto">

    {users.map((user) => (

        <div
            key={user._id}
            className="flex items-center justify-between p-3 rounded-xl border"
        >

            <div>
                <h4>{user.fullName}</h4>
                <p>{user.email}</p>
            </div>

            <input
  type="checkbox"
  onChange={(e) => {

    if (e.target.checked) {

      setSelectedUsers(prev => [
        ...prev,
        user._id,
      ]);

    } else {

      setSelectedUsers(prev =>
        prev.filter(id => id !== user._id)
      );

    }

  }}
/>


        </div>

    ))}

</div>

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          ✕
        </button>
        <button
    // onClick={handleAssignClients}
    className="w-full mt-6 h-12 rounded-xl bg-[#F96B00] text-white"
>
    Assign Selected Clients
</button>

      </div>
      

    </div>
  );
}