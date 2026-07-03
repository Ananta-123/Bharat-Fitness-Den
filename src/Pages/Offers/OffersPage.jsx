import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import OfferHeader from "./components/OfferHeader";
import OfferStats from "./components/OfferStats";
import OfferGrid from "./components/OfferGrid";
import LoadingSkeleton from "./components/LoadingSkeleton";
import EmptyState from "./components/EmptyState";

import CreateOfferModal from "./components/CreateOfferModal";
import EditOfferModal from "./components/EditOfferModal";
import DeleteOfferModal from "./components/DeleteOfferModal";

import {
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../../Api/offerApi.js";

// Uncomment while developing without backend
// import { dummyOffers } from "./data/dummyOffers";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);

      const res = await getAllOffers();

      setOffers(res.offers || []);

      // For Dummy Data
      // setOffers(dummyOffers);

    } catch (err) {
      console.error("Failed to fetch offers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // ============================
  // Create
  // ============================

  const handleCreateOffer = async (data) => {
    try {
      await createOffer(data);

      setShowCreateModal(false);

      fetchOffers();
    } catch (err) {
      console.error(err);
    }
  };

  // ============================
  // Edit
  // ============================

  const handleEditOffer = async (data) => {
    try {
      await updateOffer(selectedOffer._id, data);

      setShowEditModal(false);

      setSelectedOffer(null);

      fetchOffers();
    } catch (err) {
      console.error(err);
    }
  };

  // ============================
  // Delete
  // ============================

  const handleDeleteOffer = async () => {
    try {
      await deleteOffer(selectedOffer._id);

      setShowDeleteModal(false);

      setSelectedOffer(null);

      fetchOffers();
    } catch (err) {
      console.error(err);
    }
  };

  // ============================
  // Stats
  // ============================

  const today = new Date();

  const activeOffers = offers.filter((offer) => {
    return (
      offer.status &&
      new Date(offer.endDate) >= today
    );
  });

  const expiredOffers = offers.filter((offer) => {
    return new Date(offer.endDate) < today;
  });

  const upcomingOffers = offers.filter((offer) => {
    return new Date(offer.startDate) > today;
  });

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <OfferHeader
        onCreate={() => setShowCreateModal(true)}
      />

      {/* Stats */}

      <OfferStats
        totalOffers={offers.length}
        activeOffers={activeOffers.length}
        expiredOffers={expiredOffers.length}
        upcomingOffers={upcomingOffers.length}
      />

      {/* Grid */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {offers.length > 0 ? (
          <OfferGrid
            offers={offers}
            onEdit={(offer) => {
              setSelectedOffer(offer);
              setShowEditModal(true);
            }}
            onDelete={(offer) => {
              setSelectedOffer(offer);
              setShowDeleteModal(true);
            }}
          />
        ) : (
          <EmptyState
            title="No Offers Found"
            description="Create your first promotional offer."
            buttonText="Create Offer"
            onClick={() => setShowCreateModal(true)}
          />
        )}
      </motion.div>

      {/* Create */}

      <CreateOfferModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateOffer}
      />

      {/* Edit */}

      <EditOfferModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedOffer(null);
        }}
        offer={selectedOffer}
        onSubmit={handleEditOffer}
      />

      {/* Delete */}

      <DeleteOfferModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedOffer(null);
        }}
        offer={selectedOffer}
        onConfirm={handleDeleteOffer}
      />

    </div>
  );
}