import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import SubscriptionHeader from "./components/SubscriptionHeader";
import SubscriptionTabs from "./components/SubscriptionTabs";
import PricingCards from "./components/PricingCards";
import ComparisonTable from "./components/ComparisonTable";
import PlanManagementTable from "./components/PlanManagementTable";
import CreatePlanModal from "./components/CreatePlanModal";
import EditPlanModal from "./components/EditPlanModal";
import DeletePlanModal from "./components/DeletePlanModal";

import {
  getAllPlans,
  updatePlan,
  deletePlan,
} from "../../Api/subscriptionApi";

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("pricing");

  const [plans, setPlans] = useState([]);

  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create Plan
  const handleCreatePlan = () => {
    setCreateModal(true);
  };

  // Open Edit Modal
  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setEditModal(true);
  };

  // Open Delete Modal
  const handleDeletePlan = (plan) => {
    setSelectedPlan(plan);
    setDeleteModal(true);
  };

  // Update Plan
  const handleUpdatePlan = async (
    planId,
    updatedData
  ) => {
    try {
      const payload = {
        ...updatedData,
        isActive:
          updatedData.status === "active",
      };

      delete payload.status;

      await updatePlan(planId, payload);

      alert("Plan Updated Successfully");

      await fetchPlans();

      setEditModal(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to update plan"
      );
    }
  };

  // Confirm Delete
  const confirmDeletePlan = async (
    planId
  ) => {
    try {
      await deletePlan(planId);

      alert("Plan Deleted Successfully");

      await fetchPlans();

      setDeleteModal(false);
      setEditModal(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to delete plan"
      );
    }
  };

  // Fetch Plans
  const fetchPlans = async () => {
    try {
      setLoading(true);

      const response =
        await getAllPlans();

      console.log(
        "Plans Response:",
        response
      );

      setPlans(response?.plans || []);
    } catch (error) {
      console.error(
        "Error fetching plans:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="min-h-screen p-6"
    >
      {/* Header */}
      <SubscriptionHeader
        onCreatePlan={
          handleCreatePlan
        }
      />

      {/* Tabs */}
      <SubscriptionTabs
        activeTab={activeTab}
        setActiveTab={
          setActiveTab
        }
      />

      {/* Content */}
      <div className="mt-6">
        {activeTab ===
          "pricing" && (
          <PricingCards
            plans={plans}
            onEdit={
              handleEditPlan
            }
          />
        )}

        {activeTab ===
          "comparison" && (
          <ComparisonTable
            plans={plans}
          />
        )}

        {activeTab ===
          "management" && (
          <PlanManagementTable
            plans={plans}
            onEdit={
              handleEditPlan
            }
            onDelete={
              handleDeletePlan
            }
          />
        )}
      </div>

      {/* Create Modal */}
      <CreatePlanModal
        isOpen={createModal}
        onClose={() =>
          setCreateModal(false)
        }
        onSubmit={fetchPlans}
      />

      {/* Edit Modal */}
      <EditPlanModal
        isOpen={editModal}
        onClose={() => {
          setEditModal(false);
          setSelectedPlan(
            null
          );
        }}
        plan={selectedPlan}
        onUpdate={
          handleUpdatePlan
        }
        onDelete={
          confirmDeletePlan
        }
      />

      {/* Delete Modal */}
      <DeletePlanModal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedPlan(
            null
          );
        }}
        plan={selectedPlan}
        onConfirm={() => confirmDeletePlan(selectedPlan?._id)}
      />
    </motion.div>
  );
}