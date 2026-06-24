// Components/AddCategoryModal.jsx

import { useState } from "react";

const AddCategoryModal = ({
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <form
        onSubmit={handleSubmit}
        className="
        w-full
        max-w-md
        p-6
        rounded-2xl
        bg-white
        dark:bg-[#0B1120]
      "
      >
        <h2 className="text-xl font-bold mb-5">
          Add Category
        </h2>

        <input
          type="text"
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full p-3 border rounded-lg mb-4"
        />

        <textarea
          placeholder="Description"
          value={
            formData.description
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              description:
                e.target.value,
            })
          }
          className="w-full p-3 border rounded-lg mb-4"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-orange-500 text-white py-3 rounded-lg"
          >
            Create
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryModal;