import { useState } from "react";
import { motion } from "framer-motion";

import SubscriptionHeader from "./components/SubscriptionHeader";
import SubscriptionTabs from "./components/SubscriptionTabs";
import PricingCards from "./components/PricingCards";
import ComparisonTable from "./components/ComparisonTable";
import PlanManagementTable from "./components/PlanManagementTable";
import CreatePlanModal from "./components/CreatePlanModal";
import EditPlanModal from "./components/EditPlanModal";
import DeletePlanModal from "./components/DeletePlanModal";

import { subscriptionMockData } from "./data/subscriptionMockData";

export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("pricing");

  const [plans, setPlans] = useState(subscriptionMockData);

  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleCreatePlan = () => {
    setCreateModal(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setEditModal(true);
  };

  const handleDeletePlan = (plan) => {
    setSelectedPlan(plan);
    setDeleteModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen p-6"
    >
      {/* Header */}
      <SubscriptionHeader onCreatePlan={handleCreatePlan} />

      {/* Tabs */}
      <SubscriptionTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Content */}
      <div className="mt-6">
        {activeTab === "pricing" && (
          <PricingCards plans={plans} />
        )}

        {activeTab === "comparison" && (
          <ComparisonTable plans={plans} />
        )}

        {activeTab === "management" && (
          <PlanManagementTable
            plans={plans}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
          />
        )}
      </div>

      <CreatePlanModal
  isOpen={createModal}
  onClose={() => setCreateModal(false)}
/>

<EditPlanModal
  isOpen={editModal}
  onClose={() => setEditModal(false)}
  plan={selectedPlan}
/>

<DeletePlanModal
  isOpen={deleteModal}
  onClose={() => setDeleteModal(false)}
  plan={selectedPlan}
/>
    </motion.div>
  );
}