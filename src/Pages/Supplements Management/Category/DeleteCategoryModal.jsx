const DeleteCategoryModal = ({
  category,
  onClose,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-[#0B1120]">

        <h2 className="text-xl font-bold mb-3 text-red-500">
          Delete Category
        </h2>

        <p className="mb-6">
          Are you sure you want to delete
          <strong>
            {" "}
            {category?.name}
          </strong>
          ?
        </p>

        <div className="flex gap-3">
          <button
            onClick={() =>
              onDelete(category._id)
            }
            className="flex-1 py-3 rounded-xl bg-red-500 text-white"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-300"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteCategoryModal;