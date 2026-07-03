import { motion, AnimatePresence } from "framer-motion";
import OfferCard from "./OfferCard";

export default function OfferGrid({
  offers = [],
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-6
      "
    >
      <AnimatePresence>
        {offers.map((offer, index) => (
          <motion.div
            key={offer._id}
            layout
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.35,
              delay: index * 0.05,
            }}
          >
            <OfferCard
              offer={offer}
              onEdit={() => onEdit(offer)}
              onDelete={() => onDelete(offer)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}