import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// import { createProduct } from "../../../../Api/supplementApi.jsx"

const AddProductModal = ({
  open,
  onClose,
  onSubmit,
  categories = [],
}) => {
  const initialState = {
    name: "",
    categoryId: "",
    brand: "",
    description: "",
    price: "",
    salePrice: "",
    stock: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (open) {
      setForm(initialState);
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      price: Number(form.price),
      salePrice: Number(form.salePrice),
      stock: Number(form.stock),
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

          <motion.div
            initial={{ scale: .9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: .9, opacity: 0 }}
            className="bg-white dark:bg-[#0B1120] w-full max-w-2xl rounded-3xl p-6"
          >
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Add Product
              </h2>

              <button onClick={onClose}>
                <X />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  name="brand"
                  placeholder="Brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="input"
                />

              </div>

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="input"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>

              <textarea
                rows="4"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="input"
              />

              <div className="grid grid-cols-3 gap-4">

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="number"
                  name="salePrice"
                  placeholder="Sale Price"
                  value={form.salePrice}
                  onChange={handleChange}
                  className="input"
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="input"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl border"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-[#F96B00] to-orange-500"
                >
                  Add Product
                </button>

              </div>

            </form>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;