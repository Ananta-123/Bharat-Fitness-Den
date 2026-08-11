import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Package,
  Plus,
  Trash2,
  Image,
  Tag,
  DollarSign,
  Boxes,
  Weight,
  Palette,
} from "lucide-react";

const AddProductModal = ({
  open,
  onClose,
  onSubmit,
  categories = [],
}) => {
  // ==========================================
  // Initial Form
  // ==========================================

  const initialState = {
    name: "",
    categoryId: "",
    brand: "",
    description: "",
    price: "",
    salePrice: "",
    stock: "",
    images: [""],
    flavors: [""],
    weight: "",
    status: true,
  };

  const [form, setForm] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  // ==========================================
  // Reset Form
  // ==========================================

  useEffect(() => {
    if (open) {
      setForm(initialState);
      setErrors({});
      setLoading(false);
    }
  }, [open]);

  // ==========================================
  // Input Change
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================================
  // Image URL Change
  // ==========================================

  const handleImageChange = (
    index,
    value
  ) => {
    setForm((prev) => {
      const updatedImages = [
        ...prev.images,
      ];

      updatedImages[index] = value;

      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  // ==========================================
  // Add Image
  // ==========================================

  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        "",
      ],
    }));
  };

  // ==========================================
  // Remove Image
  // ==========================================

  const removeImage = (index) => {
    setForm((prev) => {
      if (prev.images.length === 1) {
        return prev;
      }

      return {
        ...prev,
        images: prev.images.filter(
          (_, i) => i !== index
        ),
      };
    });
  };

  // ==========================================
  // Flavor Change
  // ==========================================

  const handleFlavorChange = (
    index,
    value
  ) => {
    setForm((prev) => {
      const updatedFlavors = [
        ...prev.flavors,
      ];

      updatedFlavors[index] = value;

      return {
        ...prev,
        flavors: updatedFlavors,
      };
    });
  };

  // ==========================================
  // Add Flavor
  // ==========================================

  const addFlavor = () => {
    setForm((prev) => ({
      ...prev,
      flavors: [
        ...prev.flavors,
        "",
      ],
    }));
  };

  // ==========================================
  // Remove Flavor
  // ==========================================

  const removeFlavor = (index) => {
    setForm((prev) => {
      if (prev.flavors.length === 1) {
        return prev;
      }

      return {
        ...prev,
        flavors: prev.flavors.filter(
          (_, i) => i !== index
        ),
      };
    });
  };

  // ==========================================
  // Validation
  // ==========================================

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Product name is required";
    }

    if (!form.categoryId) {
      newErrors.categoryId =
        "Category is required";
    }

    if (!form.brand.trim()) {
      newErrors.brand =
        "Brand is required";
    }

    if (
      form.price === "" ||
      Number(form.price) < 0
    ) {
      newErrors.price =
        "Valid price is required";
    }

    if (
      form.salePrice !== "" &&
      Number(form.salePrice) < 0
    ) {
      newErrors.salePrice =
        "Sale price cannot be negative";
    }

    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {
      newErrors.stock =
        "Valid stock is required";
    }

    if (
      form.salePrice !== "" &&
      Number(form.salePrice) >
        Number(form.price)
    ) {
      newErrors.salePrice =
        "Sale price cannot be greater than price";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // Clean Images
      // ========================================

      const cleanedImages =
        form.images
          .map((image) =>
            image.trim()
          )
          .filter(
            (image) => image !== ""
          );

      // ========================================
      // Clean Flavors
      // ========================================

      const cleanedFlavors =
        form.flavors
          .map((flavor) =>
            flavor.trim()
          )
          .filter(
            (flavor) => flavor !== ""
          );

      // ========================================
      // Product Payload
      // ========================================

      const payload = {
        name: form.name.trim(),

        categoryId:
          form.categoryId,

        brand:
          form.brand.trim(),

        description:
          form.description.trim(),

        price:
          Number(form.price),

        salePrice:
          form.salePrice === ""
            ? 0
            : Number(form.salePrice),

        stock:
          form.stock === ""
            ? 0
            : Number(form.stock),

        images:
          cleanedImages,

        flavors:
          cleanedFlavors,

        weight:
          form.weight.trim(),

        status:
          form.status,
      };

      console.log(
        "CREATE PRODUCT PAYLOAD:",
        payload
      );

      await onSubmit(payload);

      onClose();
    } catch (err) {
      console.error(
        "Create product error:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Don't Render
  // ==========================================

  if (!open) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/60
          p-4
          backdrop-blur-sm
        "
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            flex
            max-h-[92vh]
            w-full
            max-w-4xl
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-2xl
            dark:border-slate-700
            dark:bg-[#0B1120]
          "
        >
          {/* ====================================== */}
          {/* HEADER */}
          {/* ====================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-gray-200
              px-8
              py-6
              dark:border-slate-700
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-[#C11200]
                  to-[#F96B00]
                  text-white
                "
              >
                <Package size={24} />
              </div>

              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Add Product
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-slate-400
                  "
                >
                  Add a new supplement
                  product to your store.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                p-2
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-red-500
                disabled:cursor-not-allowed
                dark:hover:bg-slate-800
              "
            >
              <X size={22} />
            </button>
          </div>

          {/* ====================================== */}
          {/* BODY */}
          {/* ====================================== */}

          <div
            className="
              flex-1
              space-y-6
              overflow-y-auto
              p-8
            "
          >
            {/* ================================== */}
            {/* BASIC INFORMATION */}
            {/* ================================== */}

            <div>
              <h3
                className="
                  mb-4
                  text-base
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Basic Information
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-2
                "
              >
                {/* Product Name */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Product Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Whey Protein"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Brand */}

                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    Brand *
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Optimum Nutrition"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  />

                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.brand}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================================== */}
            {/* CATEGORY + WEIGHT */}
            {/* ================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >
              {/* Category */}

              <div>
                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  <Tag size={16} />
                  Category *
                </label>

                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-orange-500
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={
                          category._id
                        }
                        value={
                          category._id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}
                </select>

                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-500">
                    {
                      errors.categoryId
                    }
                  </p>
                )}
              </div>

              {/* Weight */}

              <div>
                <label
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  <Weight size={16} />
                  Weight
                </label>

                <input
                  type="text"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="1 kg"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-orange-500
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* ================================== */}
            {/* DESCRIPTION */}
            {/* ================================== */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write product description..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-orange-500
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
              />
            </div>

            {/* ================================== */}
            {/* PRICE + STOCK */}
            {/* ================================== */}

            <div>
              <h3
                className="
                  mb-4
                  text-base
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Pricing & Stock
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  md:grid-cols-3
                "
              >
                {/* Price */}

                <div>
                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    <DollarSign
                      size={16}
                    />
                    Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="1999"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  />

                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Sale Price */}

                <div>
                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    <DollarSign
                      size={16}
                    />
                    Sale Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="salePrice"
                    value={
                      form.salePrice
                    }
                    onChange={handleChange}
                    placeholder="1499"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  />

                  {errors.salePrice && (
                    <p className="mt-1 text-sm text-red-500">
                      {
                        errors.salePrice
                      }
                    </p>
                  )}
                </div>

                {/* Stock */}

                <div>
                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    <Boxes size={16} />
                    Stock *
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="100"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-orange-500
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-white
                    "
                  />

                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.stock}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================================== */}
            {/* IMAGES */}
            {/* ================================== */}

            <div>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >
                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  <Image size={17} />
                  Product Images
                </label>

                <button
                  type="button"
                  onClick={addImage}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-orange-500
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-orange-600
                  "
                >
                  <Plus size={15} />
                  Add Image
                </button>
              </div>

              <div className="space-y-3">
                {form.images.map(
                  (image, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-orange-500/10
                          text-sm
                          font-bold
                          text-orange-500
                        "
                      >
                        {index + 1}
                      </div>

                      <input
                        type="url"
                        value={image}
                        onChange={(e) =>
                          handleImageChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="https://example.com/product-image.jpg"
                        className="
                          flex-1
                          rounded-xl
                          border
                          border-gray-300
                          bg-white
                          px-4
                          py-3
                          outline-none
                          transition
                          focus:border-orange-500
                          dark:border-slate-700
                          dark:bg-slate-900
                          dark:text-white
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            index
                          )
                        }
                        disabled={
                          form.images
                            .length ===
                          1
                        }
                        className="
                          rounded-xl
                          bg-red-500
                          px-4
                          text-white
                          transition
                          hover:bg-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ================================== */}
            {/* FLAVORS */}
            {/* ================================== */}

            <div>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >
                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  <Palette size={17} />
                  Flavors
                </label>

                <button
                  type="button"
                  onClick={addFlavor}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-orange-500
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-orange-600
                    transition
                    hover:bg-orange-500
                    hover:text-white
                    dark:text-orange-400
                  "
                >
                  <Plus size={15} />
                  Add Flavor
                </button>
              </div>

              <div className="space-y-3">
                {form.flavors.map(
                  (flavor, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <input
                        type="text"
                        value={flavor}
                        onChange={(e) =>
                          handleFlavorChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="e.g. Chocolate"
                        className="
                          flex-1
                          rounded-xl
                          border
                          border-gray-300
                          bg-white
                          px-4
                          py-3
                          outline-none
                          transition
                          focus:border-orange-500
                          dark:border-slate-700
                          dark:bg-slate-900
                          dark:text-white
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeFlavor(
                            index
                          )
                        }
                        disabled={
                          form.flavors
                            .length ===
                          1
                        }
                        className="
                          rounded-xl
                          bg-red-500
                          px-4
                          text-white
                          transition
                          hover:bg-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ================================== */}
            {/* STATUS */}
            {/* ================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-gray-200
                p-5
                dark:border-slate-700
              "
            >
              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                    dark:text-white
                  "
                >
                  Product Status
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-slate-400
                  "
                >
                  Enable or disable this
                  product.
                </p>
              </div>

              <label
                className="
                  relative
                  inline-flex
                  cursor-pointer
                  items-center
                "
              >
                <input
                  type="checkbox"
                  name="status"
                  checked={form.status}
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <div
                  className="
                    relative
                    h-7
                    w-12
                    rounded-full
                    bg-gray-300
                    transition-all
                    after:absolute
                    after:left-1
                    after:top-1
                    after:h-5
                    after:w-5
                    after:rounded-full
                    after:bg-white
                    after:transition-all
                    peer-checked:bg-orange-500
                    peer-checked:after:translate-x-5
                  "
                />
              </label>
            </div>
          </div>

          {/* ====================================== */}
          {/* FOOTER */}
          {/* ====================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-end
              gap-4
              border-t
              border-gray-200
              bg-gray-50
              px-8
              py-5
              dark:border-slate-700
              dark:bg-slate-900/40
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-gray-300
                px-6
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-600
                dark:text-gray-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              disabled={loading}
              type="submit"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#C11200]
                to-[#F96B00]
                px-8
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading
                ? "Adding..."
                : "Add Product"}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddProductModal;