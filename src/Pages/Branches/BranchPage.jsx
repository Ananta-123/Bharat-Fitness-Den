import {
  useEffect,
  useState,
} from "react";

import BranchHeader from "./components/BranchHeader";
import BranchGrid from "./components/BranchGrid";
import BranchStats from "./components/BranchStats";

import { getAllBranches } from "../../Api/branchApi";

const BranchPage = () => {
  const [branches, setBranches] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // FETCH BRANCHES

  const fetchBranches = async () => {
  try {
    setLoading(true);

    const data =
      await getAllBranches();

    console.log(data);

    setBranches(data.branches);

  } catch (error) {
    setError(
      error.message ||
        "Failed to fetch branches"
    );
  } finally {
    setLoading(false);
  }
};

// handle update
const handleBranchUpdate = (
  updatedBranch
) => {
  setBranches((prev) =>
    prev.map((branch) =>
      branch._id ===
      updatedBranch._id
        ? updatedBranch
        : branch
    )
  );
};

// handle delete
const handleBranchDelete = (
  branchId
) => {
  setBranches((prev) =>
    prev.filter(
      (branch) =>
        branch._id !== branchId
    )
  );
};

//create branch
const handleBranchCreate = (
  newBranch
) => {
  setBranches((prev) => [
    newBranch,
    ...prev,
  ]);
};

  // CALL API

  useEffect(() => {
    fetchBranches();
  }, []);

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
      <BranchHeader
  onBranchCreate={
    handleBranchCreate
  }
/>

      <BranchStats branches={branches} />

      {loading ? (
        <div
          className="
            mt-10
            text-center
            text-gray-600
            dark:text-gray-300
          "
        >
          Loading branches...
        </div>
      ) : error ? (
        <div
          className="
            mt-10
            text-center
            text-red-500
          "
        >
          {error}
        </div>
      ) : (
        <BranchGrid branches={branches} 
         onBranchUpdate={
    handleBranchUpdate
  } 
  onBranchDelete={
    handleBranchDelete
  }
  />
      )}
    </div>
  );
};

export default BranchPage;