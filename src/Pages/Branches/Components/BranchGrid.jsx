import BranchCard from "./BranchCard";

const BranchGrid = ({ branches, onBranchUpdate, onBranchDelete }) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      "
    >
      {branches.map((branch) => (
  <BranchCard
    key={branch._id}
    branch={branch}
    onBranchUpdate={onBranchUpdate}
    onBranchDelete={onBranchDelete}
  />
))}
    </div>
  );
};

export default BranchGrid;