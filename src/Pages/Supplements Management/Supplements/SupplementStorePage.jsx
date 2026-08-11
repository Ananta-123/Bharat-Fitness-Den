import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../../Api/supplementApi";

import { getAllCategories } from "../../../Api/categoryApi";

import {
  Search,
  Package,
  AlertTriangle,
  DollarSign,
  ShoppingBag,
  Plus,
  Star,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Tag,
  Weight,
  Palette,
  CheckCircle,
  XCircle,
} from "lucide-react";

import AddProductModal from "./components/AddProductModal.jsx";
import EditProductModal from "./components/EditProductModal.jsx";

const SupplementStorePage = () => {
  const { theme } = useTheme();

  // ==========================================
  // State
  // ==========================================

  const [search, setSearch] = useState("");

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // ==========================================
  // Fetch Categories
  // ==========================================

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();

      setCategories(
        res?.categories || []
      );
    } catch (err) {
      console.error(
        "Error fetching categories:",
        err
      );
    }
  };

  // ==========================================
  // Fetch Products
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res =
        await getAllProducts();

      console.log(
        "Products API:",
        res
      );

      setProducts(
        res?.products || []
      );
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ==========================================
  // Create Product
  // ==========================================

  const handleCreateProduct = async (
    data
  ) => {
    try {
      const res =
        await createProduct(data);

      console.log(
        "Create API Response:",
        res
      );

      await fetchProducts();

      setShowAddModal(false);
    } catch (err) {
      console.error(
        "Create product error:",
        err
      );
    }
  };

  // ==========================================
  // Update Product
  // ==========================================

  const handleUpdateProduct = async (
    data
  ) => {
    if (!selectedProduct?._id) {
      return;
    }

    try {
      const res =
        await updateProduct(
          selectedProduct._id,
          data
        );

      console.log(
        "Update API Response:",
        res
      );

      await fetchProducts();

      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error(
        "Update product error:",
        err
      );
    }
  };

  // ==========================================
  // Delete Product
  // ==========================================

  const handleDeleteProduct = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      await fetchProducts();
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );
    }
  };

  // ==========================================
  // Search
  // ==========================================

  const filteredProducts =
    products.filter((product) => {
      const searchText =
        search.toLowerCase();

      return (
        product.name
          ?.toLowerCase()
          .includes(searchText) ||

        product.brand
          ?.toLowerCase()
          .includes(searchText) ||

        product.categoryId?.name
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  // ==========================================
  // Statistics
  // ==========================================

  const totalProducts =
    products.length;

  const totalRevenue =
    products.reduce(
      (total, product) => {
        return (
          total +
          Number(product.price || 0)
        );
      },
      0
    );

  const lowStockCount =
    products.filter(
      (product) =>
        Number(product.stock || 0) > 0 &&
        Number(product.stock || 0) < 25
    ).length;

  const outOfStockCount =
    products.filter(
      (product) =>
        Number(product.stock || 0) === 0
    ).length;

  /*
    Your Product model does not contain
    sold quantity.

    Therefore we cannot calculate actual
    "Items Sold" from the current model.
  */

  const totalSold = 0;

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="mb-8">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-[#1B2440]" />

          <div className="mt-3 h-4 w-80 animate-pulse rounded-lg bg-gray-200 dark:bg-[#1B2440]" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="
                  h-32
                  animate-pulse
                  rounded-2xl
                  bg-gray-200
                  dark:bg-[#0B1120]
                "
              />
            )
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className="
                  h-[500px]
                  animate-pulse
                  rounded-3xl
                  bg-gray-200
                  dark:bg-[#0B1120]
                "
              />
            )
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="min-h-screen p-6">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Supplement Store
          </h1>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Manage inventory and supplement
            products.
          </p>
        </div>

        <motion.button
          onClick={() =>
            setShowAddModal(true)
          }
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#C11200]
            to-[#F96B00]
            px-5
            py-3
            font-semibold
            text-white
            shadow-lg
          "
        >
          <Plus size={18} />

          Add Product
        </motion.button>
      </div>

      {/* ====================================== */}
      {/* STATISTICS */}
      {/* ====================================== */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={<Package size={22} />}
          title="Total Products"
          value={totalProducts}
          color="text-orange-500"
        />

        <StatCard
          icon={<DollarSign size={22} />}
          title="Product Value"
          value={`₹${totalRevenue.toLocaleString(
            "en-IN"
          )}`}
          color="text-green-500"
        />

        <StatCard
          icon={<ShoppingBag size={22} />}
          title="Items Sold"
          value={totalSold}
          color="text-yellow-500"
        />

        <StatCard
          icon={<AlertTriangle size={22} />}
          title="Low Stock"
          value={lowStockCount}
          color="text-red-500"
        />
      </div>

      {/* ====================================== */}
      {/* SEARCH */}
      {/* ====================================== */}

      <div
        className="
          mb-8
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          dark:border-[#1B2440]
          dark:bg-[#0B1120]
        "
      >
        <Search
          size={18}
          className="text-gray-500"
        />

        <input
          type="text"
          placeholder="Search products, brands or categories..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            bg-transparent
            text-gray-900
            outline-none
            dark:text-white
          "
        />
      </div>

      {/* ====================================== */}
      {/* EMPTY SEARCH */}
      {/* ====================================== */}

      {filteredProducts.length === 0 ? (
        <div
          className="
            flex
            min-h-[400px]
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-gray-200
            bg-white
            dark:border-[#1B2440]
            dark:bg-[#0B1120]
          "
        >
          <Package
            size={60}
            className="mb-5 text-orange-500"
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {search
              ? "No Products Found"
              : "No Products Available"}
          </h2>

          <p className="mt-2 text-gray-500">
            {search
              ? "Try a different search."
              : "Add your first product to the store."}
          </p>

          {!search && (
            <button
              onClick={() =>
                setShowAddModal(true)
              }
              className="
                mt-6
                rounded-xl
                bg-gradient-to-r
                from-[#C11200]
                to-[#F96B00]
                px-6
                py-3
                font-semibold
                text-white
              "
            >
              Add Product
            </button>
          )}
        </div>
      ) : (
        /* ==================================== */
        /* PRODUCT GRID */
        /* ==================================== */

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredProducts.map(
            (product) => {
              const stock =
                Number(
                  product.stock || 0
                );

              const price =
                Number(
                  product.price || 0
                );

              const salePrice =
                Number(
                  product.salePrice || 0
                );

              const hasSalePrice =
                salePrice > 0 &&
                salePrice < price;

              const stockPercentage =
                Math.min(
                  stock,
                  100
                );

              return (
                <motion.div
                  key={product._id}
                  whileHover={{
                    y: -5,
                    scale: 1.01,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-200
                    bg-white
                    shadow-lg
                    dark:border-[#1B2440]
                    dark:bg-[#0B1120]
                    dark:shadow-[0_0_25px_rgba(249,107,0,0.08)]
                  "
                >

                  {/* ================================= */}
                  {/* PRODUCT IMAGE */}
                  {/* ================================= */}

                  <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-[#060816]">

                    {product.images?.length >
                      0 ? (
                      <img
                        src={
                          product.images[0]
                        }
                        alt={
                          product.name
                        }
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          hover:scale-105
                        "
                        onError={(
                          e
                        ) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          flex-col
                          items-center
                          justify-center
                          text-gray-400
                        "
                      >
                        <ImageIcon
                          size={45}
                        />

                        <span className="mt-2 text-sm">
                          No Image
                        </span>
                      </div>
                    )}

                    {/* Status */}

                    <div className="absolute right-4 top-4">
                      <StatusBadge
                        status={
                          !product.status
                            ? "inactive"
                            : stock === 0
                              ? "out-stock"
                              : stock < 25
                                ? "low-stock"
                                : "in-stock"
                        }
                      />
                    </div>

                    {/* Image Count */}

                    {product.images
                      ?.length >
                      1 && (
                      <div
                        className="
                          absolute
                          bottom-3
                          right-3
                          rounded-lg
                          bg-black/70
                          px-2
                          py-1
                          text-xs
                          font-semibold
                          text-white
                          backdrop-blur-sm
                        "
                      >
                        +{product.images.length - 1}{" "}
                        images
                      </div>
                    )}
                  </div>

                  {/* ================================= */}
                  {/* PRODUCT CONTENT */}
                  {/* ================================= */}

                  <div className="p-5">

                    {/* Name + Brand */}

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {product.brand ||
                          "No Brand"}
                      </p>
                    </div>

                    {/* Category + Status */}

                    <div className="mb-5 flex items-center justify-between gap-3">

                      <span
                        className="
                          flex
                          max-w-[65%]
                          items-center
                          gap-1.5
                          truncate
                          rounded-full
                          bg-gray-100
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-gray-700
                          dark:bg-[#060816]
                          dark:text-gray-300
                        "
                      >
                        <Tag size={13} />

                        {product
                          .categoryId
                          ?.name ||
                          "No Category"}
                      </span>

                      
                    </div>

                    {/* Description */}

                    {product.description && (
                      <p
                        className="
                          mb-5
                          line-clamp-2
                          text-sm
                          leading-5
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        {
                          product.description
                        }
                      </p>
                    )}

                    {/* ================================= */}
                    {/* PRICE / STOCK / WEIGHT */}
                    {/* ================================= */}

                    <div className="mb-5 grid grid-cols-3 gap-3">

                      {/* Price */}

                      <InfoBox
                        title="Price"
                        value={
                          hasSalePrice ? (
                            <div>
                              <div className="font-bold text-green-500">
                                ₹
                                {salePrice}
                              </div>

                              <div className="text-[10px] text-gray-400 line-through">
                                ₹{price}
                              </div>
                            </div>
                          ) : (
                            `₹${price}`
                          )
                        }
                      />

                      {/* Stock */}

                      <InfoBox
                        title="Stock"
                        value={stock}
                      />

                      {/* Weight */}

                      <InfoBox
                        title="Weight"
                        value={
                          product.weight ||
                          "--"
                        }
                      />
                    </div>

                    {/* ================================= */}
                    {/* STOCK PROGRESS */}
                    {/* ================================= */}

                    <div className="mb-5">

                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-gray-500">
                          Stock Level
                        </span>

                        <span
                          className={
                            stock === 0
                              ? "font-semibold text-red-500"
                              : stock < 25
                                ? "font-semibold text-yellow-500"
                                : "font-semibold text-green-500"
                          }
                        >
                          {stock === 0
                            ? "EMPTY"
                            : stock < 25
                              ? "LOW"
                              : "OK"}
                        </span>
                      </div>

                      <div
                        className="
                          h-2
                          overflow-hidden
                          rounded-full
                          bg-gray-200
                          dark:bg-[#1B2440]
                        "
                      >
                        <div
                          className={`
                            h-full
                            rounded-full
                            transition-all
                            ${
                              stock === 0
                                ? "bg-red-500"
                                : stock < 25
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }
                          `}
                          style={{
                            width: `${stockPercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* ================================= */}
                    {/* FLAVORS */}
                    {/* ================================= */}

                    {product.flavors
                      ?.length >
                      0 && (
                      <div className="mb-5">

                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                          <Palette
                            size={14}
                          />

                          Flavors
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {product.flavors
                            .slice(
                              0,
                              4
                            )
                            .map(
                              (
                                flavor,
                                index
                              ) => (
                                <span
                                  key={
                                    `${product._id}-${index}`
                                  }
                                  className="
                                    rounded-lg
                                    bg-orange-500/10
                                    px-2.5
                                    py-1
                                    text-xs
                                    font-medium
                                    text-orange-600
                                    dark:text-orange-400
                                  "
                                >
                                  {
                                    flavor
                                  }
                                </span>
                              )
                            )}

                          {product.flavors
                            .length >
                            4 && (
                            <span
                              className="
                                rounded-lg
                                bg-gray-100
                                px-2.5
                                py-1
                                text-xs
                                text-gray-500
                                dark:bg-[#060816]
                              "
                            >
                              +
                              {product.flavors
                                .length -
                                4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Product ID */}

                    <p className="mb-5 text-xs text-gray-400">
                      Product ID:{" "}
                      {product._id?.slice(
                        -8
                      )}
                    </p>

                    {/* ================================= */}
                    {/* ACTIONS */}
                    {/* ================================= */}

                    <div className="flex gap-3">

                      <button
                        onClick={() => {
                          setSelectedProduct(
                            product
                          );

                          setShowEditModal(
                            true
                          );
                        }}
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-blue-500
                          py-3
                          font-semibold
                          text-blue-500
                          transition
                          hover:bg-blue-500
                          hover:text-white
                        "
                      >
                        <Pencil
                          size={17}
                        />

                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteProduct(
                            product._id
                          )
                        }
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-red-500
                          py-3
                          font-semibold
                          text-red-500
                          transition
                          hover:bg-red-500
                          hover:text-white
                        "
                      >
                        <Trash2
                          size={17}
                        />

                        Delete
                      </button>
                    </div>

                    {/* Restock */}

                    {stock === 0 && (
                      <button
                        className="
                          mt-3
                          w-full
                          rounded-xl
                          bg-red-600
                          py-3
                          font-semibold
                          text-white
                          transition
                          hover:bg-red-700
                        "
                      >
                        Restock Product
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      )}

      {/* ====================================== */}
      {/* CREATE MODAL */}
      {/* ====================================== */}

      <AddProductModal
        open={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
        categories={categories}
        onSubmit={
          handleCreateProduct
        }
      />

      {/* ====================================== */}
      {/* EDIT MODAL */}
      {/* ====================================== */}

      <EditProductModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        categories={categories}
        onSubmit={
          handleUpdateProduct
        }
      />
    </div>
  );
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({
  icon,
  title,
  value,
  color,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        dark:border-[#1B2440]
        dark:bg-[#0B1120]
      "
    >
      <div
        className={`${color} mb-3`}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </h3>

      <p className="text-sm text-gray-500">
        {title}
      </p>
    </motion.div>
  );
};

// ==========================================
// INFO BOX
// ==========================================

const InfoBox = ({
  title,
  value,
}) => {
  return (
    <div
      className="
        min-w-0
        rounded-xl
        bg-gray-50
        p-3
        text-center
        dark:bg-[#060816]
      "
    >
      <div className="truncate text-sm font-bold text-gray-900 dark:text-white">
        {value}
      </div>

      <p className="mt-1 text-xs text-gray-500">
        {title}
      </p>
    </div>
  );
};

// ==========================================
// STATUS BADGE
// ==========================================

const StatusBadge = ({
  status,
}) => {
  if (status === "in-stock") {
    return (
      <span
        className="
          flex
          items-center
          gap-1
          rounded-full
          bg-green-500/20
          px-3
          py-1
          text-xs
          font-semibold
          text-green-500
          backdrop-blur-sm
        "
      >
        <CheckCircle size={13} />
        In Stock
      </span>
    );
  }

  if (status === "low-stock") {
    return (
      <span
        className="
          flex
          items-center
          gap-1
          rounded-full
          bg-yellow-500/20
          px-3
          py-1
          text-xs
          font-semibold
          text-yellow-500
          backdrop-blur-sm
        "
      >
        <AlertTriangle
          size={13}
        />
        Low Stock
      </span>
    );
  }

  if (status === "inactive") {
    return (
      <span
        className="
          flex
          items-center
          gap-1
          rounded-full
          bg-gray-500/20
          px-3
          py-1
          text-xs
          font-semibold
          text-gray-500
          backdrop-blur-sm
        "
      >
        <XCircle size={13} />
        Inactive
      </span>
    );
  }

  return (
    <span
      className="
        flex
        items-center
        gap-1
        rounded-full
        bg-red-500/20
        px-3
        py-1
        text-xs
        font-semibold
        text-red-500
        backdrop-blur-sm
      "
    >
      <XCircle size={13} />
      Out Stock
    </span>
  );
};

export default SupplementStorePage;