import { useEffect, useState } from "react";

import BannerHeader from "./components/BannerHeader";
import BannerGrid from "./components/BannerGrid";

import CreateBannerModal from "./modals/CreateBannerModal";
import EditBannerModal from "./modals/EditBannerModal";
import DeleteBannerModal from "./modals/DeleteBannerModal";

import {
  getAllBanners,
} from "../../Api/bannerApi";

export default function BannerPage() {
  const [loading, setLoading] = useState(true);

  const [banners, setBanners] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedBanner, setSelectedBanner] = useState(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await getAllBanners();

      setBanners(res?.banners || []);
    } catch (err) {
      console.error("Failed to fetch banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setShowEditModal(true);
  };

  const handleDelete = (banner) => {
    setSelectedBanner(banner);
    setShowDeleteModal(true);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}

      <BannerHeader onCreateBanner={handleCreate} />

      {/* Banner Grid */}

      <BannerGrid
        banners={banners}
        loading={loading}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create */}

      <CreateBannerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        fetchBanners={fetchBanners}
      />

      {/* Edit */}

      <EditBannerModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedBanner(null);
        }}
        banner={selectedBanner}
        fetchBanners={fetchBanners}
      />

      {/* Delete */}

      <DeleteBannerModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedBanner(null);
        }}
        banner={selectedBanner}
        fetchBanners={fetchBanners}
      />
    </div>
  );
}