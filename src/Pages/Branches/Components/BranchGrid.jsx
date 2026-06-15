import BranchCard from "./BranchCard";

const BranchGrid = ({ branches }) => {
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
          key={branch.id}
          branch={branch}
        />
      ))}
    </div>
  );
};

export default BranchGrid;