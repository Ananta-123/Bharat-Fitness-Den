import { motion } from "framer-motion";

const tabs = [
  {
    id: "pricing",
    label: "Pricing Cards",
  },
  
  {
    id: "management",
    label: "Plan Management",
  },
];

export default function SubscriptionTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div
      className="
        inline-flex
        p-1
        rounded-2xl
        bg-white
        dark:bg-[#0B1120]
        border
        border-gray-200
        dark:border-[#1B2440]
        mb-8
      "
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="
            relative
            px-5
            py-3
            rounded-xl
            text-sm
            font-medium
          "
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeSubscriptionTab"
              className="
                absolute
                inset-0
                rounded-xl
                bg-[#F96B00]
              "
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}

          <span
            className={`relative z-10 ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}