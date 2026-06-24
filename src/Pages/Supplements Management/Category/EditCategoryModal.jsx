import { useEffect, useState } from "react";

const EditCategoryModal = ({
  category,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
    });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description:
          category.description || "",
      });
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(
      category._id,
      formData
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#0B1120]">

        <h2 className="text-xl font-bold mb-5">
          Edit Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl border"
          />

          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target.value,
              })
            }
            className="w-full p-3 rounded-xl border"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-orange-500 text-white"
            >
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditCategoryModal;