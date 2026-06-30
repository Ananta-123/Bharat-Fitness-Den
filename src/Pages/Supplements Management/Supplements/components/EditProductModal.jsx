import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EditProductModal = ({
  open,
  onClose,
  onSubmit,
  product,
  categories = [],
}) => {

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    brand: "",
    description: "",
    price: "",
    salePrice: "",
    stock: "",
  });

  useEffect(() => {

    if (product) {

      setForm({
        name: product.name || "",
        categoryId: product.categoryId?._id || "",
        brand: product.brand || "",
        description: product.description || "",
        price: product.price || "",
        salePrice: product.salePrice || "",
        stock: product.stock || "",
      });

    }

  }, [product]);

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
             initial={{ opacity: 0, y: 30, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 30, scale: 0.96 }}
  transition={{ duration: 0.25 }}
  className="
    w-full
    max-w-4xl
    bg-white
    dark:bg-[#0B1120]
    rounded-3xl
    shadow-2xl
    border
    border-gray-200
    dark:border-[#1B2440]
    overflow-hidden
  "
          >

            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-[#1B2440]">
  <div>
    <h2 className="text-3xl font-bold">Edit Product</h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Update supplement details
    </p>
  </div>

  <button
    type="button"
    onClick={onClose}
    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#060816]"
  >
    <X size={24} />
  </button>
</div>
        <div className="p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block text-sm font-medium mb-2">
      Product Name
    </label>
    <input
      className=" w-full
    rounded-xl
    border
    border-gray-300
    dark:border-[#1B2440]
    bg-white
    dark:bg-[#060816]
    px-4
    py-3
    text-sm
    text-gray-900
    dark:text-white
    placeholder:text-gray-400
    outline-none
    transition-all
    duration-200
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Enter product name"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Brand
    </label>
    <input
      className=" w-full
    rounded-xl
    border
    border-gray-300
    dark:border-[#1B2440]
    bg-white
    dark:bg-[#060816]
    px-4
    py-3
    text-sm
    text-gray-900
    dark:text-white
    placeholder:text-gray-400
    outline-none
    transition-all
    duration-200
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20"
      name="brand"
      value={form.brand}
      onChange={handleChange}
      placeholder="Enter brand"
    />
  </div>
</div>

              <select
                className=" w-full
    rounded-xl
    border
    border-gray-300
    dark:border-[#1B2440]
    bg-white
    dark:bg-[#060816]
    px-4
    py-3
    text-sm
    text-gray-900
    dark:text-white
    placeholder:text-gray-400
    outline-none
    transition-all
    duration-200
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
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
                rows={4}
                className=" w-full
    rounded-xl
    border
    border-gray-300
    dark:border-[#1B2440]
    bg-white
    dark:bg-[#060816]
    px-4
    py-3
    text-sm
    text-gray-900
    dark:text-white
    placeholder:text-gray-400
    outline-none
    transition-all
    duration-200
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
              />

              <div className="grid grid-cols-3 gap-4">

                <input
                  className=" w-full
    rounded-xl
    border
    border-gray-300
    dark:border-[#1B2440]
    bg-white
    dark:bg-[#060816]
    px-4
    py-3
    text-sm
    text-gray-900
    dark:text-white
    placeholder:text-gray-400
    outline-none
    transition-all
    duration-200
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                />

                <input
                  className=" w-full
    rounded-xl
    border
    border-gray-300
    dark:border-[#1B2440]
    bg-white
    dark:bg-[#060816]
    px-4
    py-3
    text-sm
    text-gray-900
    dark:text-white
    placeholder:text-gray-400
    outline-none
    transition-all
    duration-200
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20"
                  type="number"
                  name="salePrice"
                  value={form.salePrice}
                  onChange={handleChange}
                  placeholder="Sale Price"
                />

                <input
                  className=" w-full
    rounded-xl
    border
    border-gray-300
    dark:border-[#1B2440]
    bg-white
    dark:bg-[#060816]
    px-4
    py-3
    text-sm
    text-gray-900
    dark:text-white
    placeholder:text-gray-400
    outline-none
    transition-all
    duration-200
    focus:border-orange-500
    focus:ring-2
    focus:ring-orange-500/20"
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                />

              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-[#1B2440]">
  <button
    type="button"
    onClick={onClose}
    className="
      px-6 py-3 rounded-xl
      border border-gray-300 dark:border-[#1B2440]
      hover:bg-gray-100 dark:hover:bg-[#060816]
      transition
    "
  >
    Cancel
  </button>

  <button
    type="submit"
    className="
      px-8 py-3 rounded-xl
      text-white font-semibold
      bg-gradient-to-r
      from-[#F96B00]
      to-orange-500
      hover:shadow-lg
      transition
    "
  >
    Update Product
  </button>
</div>

            </form>
        </div>

          </motion.div>

        </div>

      )}

    </AnimatePresence>
  );
};

export default EditProductModal;