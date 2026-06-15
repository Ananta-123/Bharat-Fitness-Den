const StatusBadge = ({ status }) => {
  const styles = {
    active:
      "bg-green-500/10 text-green-400 border-green-500/20",

    maintenance:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  return (
    <div
      className={`
        px-4 py-1
        rounded-full
        text-sm
        border
        font-medium
        capitalize
        ${styles[status]}
      `}
    >
      {status}
    </div>
  );
};

export default StatusBadge;