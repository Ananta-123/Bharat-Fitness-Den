import PlanCard from "./PlanCard";

export default function PricingCards({
  plans,
  onEdit,
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >
      {plans.map((plan) => (
        <PlanCard
          key={plan._id}
          plan={plan}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}