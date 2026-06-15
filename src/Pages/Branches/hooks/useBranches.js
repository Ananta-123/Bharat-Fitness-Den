import { useEffect, useState } from "react";
import { dummyBranches } from "../data/dummyBranches";
// import { getAllBranches } from "../services/branchApi";

const useBranches = () => {
  const [branches, setBranches] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);

        // FUTURE API
        // const data = await getAllBranches();
        // setBranches(data);

        setBranches(dummyBranches);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return {
    branches,
    loading,
  };
};

export default useBranches;