import BranchHeader from "./components/BranchHeader";
import BranchGrid from "./components/BranchGrid";
import BranchStats from "./components/BranchStats";

import useBranches from "./hooks/useBranches";

const BranchPage = () => {
  const { branches } = useBranches();

  return (
    <div
      className="
        min-h-screen
        p-6
        bg-[#F5F7FB]
        dark:bg-[#060816]
        transition-all duration-300
      "
    >
      <BranchHeader />

      <BranchStats branches={branches} />

      <BranchGrid branches={branches} />
    </div>
  );
};

export default BranchPage;