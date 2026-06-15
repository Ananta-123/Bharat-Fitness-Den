const statusStyles = {
  active:
    "bg-green-500/10 text-green-400 border border-green-500/20",

  inactive:
    "bg-gray-500/10 text-gray-400 border border-gray-500/20",

  pending:
    "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
};

const StatusBadge = ({ status }) => {
  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium w-fit capitalize ${statusStyles[status]}`}
    >
      {status}
    </div>
  );
};

export default StatusBadge;