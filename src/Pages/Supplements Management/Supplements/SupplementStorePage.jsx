import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";


import {
  getAllProducts,
  updateProduct,
  createProduct,
  deleteProduct
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
} from "lucide-react";
import AddProductModal from "./components/AddProductModal.jsx";
import EditProductModal from "./components/EditProductModal";

const SupplementStorePage = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.categories || []);
    } catch (err) {
      console.log(err);
    }
  };



  const handleCreateProduct = async (data) => {
    try {
      const res = await createProduct(data);

      console.log("Create API Response:", res);

      await fetchProducts();

      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      const res = await updateProduct(
        selectedProduct._id,
        data
      );

      console.log("Update API Response:", res);

      await fetchProducts();

      setShowEditModal(false);
      setSelectedProduct(null);

    } catch (err) {
      console.error(err);
    }
  };


  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getAllProducts();

      console.log("Products API:", res);

      setProducts(res.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }



  const handleDeleteProduct = async (id) => {
    try {

      await deleteProduct(id);

      await fetchProducts();

    } catch (error) {
      console.error(error);
    }
  };



  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = products.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const lowStockCount = products.filter(
    (item) => item.stock < 25
  ).length;

  const totalSold = 0;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Supplement Store
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage inventory & supplement products
          </p>
        </div>

        <div className="flex items-center gap-3">

          <motion.button
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
      flex items-center gap-2
      px-5 py-3
      rounded-xl
      text-white
      bg-gradient-to-r
      from-[#F96B00]
      to-orange-500
      shadow-lg
    "
          >
            <Plus size={18} />
            Add Product
          </motion.button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={<Package />}
          title="Total Products"
          value={products.length}
          color="text-orange-500"
        />

        <StatCard
          icon={<DollarSign />}
          title="Revenue"
          value={`$${Math.round(totalRevenue)}`}
          color="text-green-500"
        />

        <StatCard
          icon={<ShoppingBag />}
          title="Items Sold"
          value={totalSold}
          color="text-yellow-500"
        />

        <StatCard
          icon={<AlertTriangle />}
          title="Low Stock"
          value={lowStockCount}
          color="text-red-500"
        />
      </div>

      {/* Search */}

      <div
        className="
        flex items-center
        gap-3
        px-4 py-3
        rounded-2xl
        border
        mb-8

        bg-white
        border-gray-200

        dark:bg-[#0B1120]
        dark:border-[#1B2440]
        "
      >
        <Search size={18} />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
          w-full
          bg-transparent
          outline-none
          "
        />
      </div>

      {/* Product Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (

          <motion.div
            key={product._id}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            className="
            rounded-3xl
            p-5

            bg-white
            border border-gray-200

            dark:bg-[#0B1120]
            dark:border-[#1B2440]

            shadow-lg
            dark:shadow-[0_0_25px_rgba(249,107,0,0.08)]
            "
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-bold text-lg">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.brand}
                </p>
              </div>

              <StatusBadge
                status={
                  product.stock === 0
                    ? "out-stock"
                    : product.stock < 25
                      ? "low-stock"
                      : "in-stock"
                }
              />
            </div>

            <div className="flex justify-between items-center mb-5">
              <span
                className="
                px-3 py-1
                rounded-full
                text-xs

                bg-gray-100
                dark:bg-[#060816]
                "
              >
                {product.categoryId?.name}
              </span>

              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={15} fill="currentColor" />
                N/A
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <InfoBox
                title="Price"
                value={`₹${product.price}`}
              />
              <InfoBox
                title="Stock"
                value={product.stock}
              />
              <InfoBox
                title="Sold"
                value={0}
              />
            </div>

            {/* Progress */}

            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span>Stock Level</span>

                <span>
                  {product.stock === 0
                    ? "EMPTY"
                    : product.stock < 25
                      ? "LOW"
                      : "OK"}
                </span>
              </div>

              <div className="h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-[#1B2440]">
                <div
                  className={`h-full ${product.stock === 0
                    ? "bg-red-500"
                    : product.stock < 25
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    }`}
                  style={{
                    width: `${Math.min(
                      product.stock,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-5">
              ID: {product._id.slice(-6)}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setShowEditModal(true);
                }}
                className="
    flex-1
    py-3
    rounded-xl
    text-white
    bg-gradient-to-r
    from-[#F96B00]
    to-orange-500
  "
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="
    flex-1
    py-3
    rounded-xl
    text-white
    bg-gradient-to-r
    from-[#F96B00]
    to-orange-500
  "
              >
                Delete
              </button>

              {product.stock === 0 && (
                <button
                  className="
                  flex-1
                  py-3
                  rounded-xl
                  text-white
                  font-semibold
                  bg-red-600
                  "
                >
                  Restock
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <AddProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        categories={categories}
        onSubmit={handleCreateProduct}
      />
      <EditProductModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        categories={categories}
        onSubmit={handleUpdateProduct}
      />
    </div>
  );
};

const StatCard = ({
  icon,
  title,
  value,
  color,
}) => (
  <motion.div
    whileHover={{
      y: -4,
      scale: 1.02,
    }}
    className="
    p-5
    rounded-2xl

    bg-white
    border border-gray-200

    dark:bg-[#0B1120]
    dark:border-[#1B2440]
    "
  >
    <div className={`${color} mb-3`}>
      {icon}
    </div>

    <h3 className="text-2xl font-bold">
      {value}
    </h3>

    <p className="text-gray-500 text-sm">
      {title}
    </p>
  </motion.div>
);

const InfoBox = ({ title, value }) => (
  <div
    className="
    p-3
    rounded-xl
    text-center

    bg-gray-50

    dark:bg-[#060816]
    "
  >
    <h4 className="font-bold">{value}</h4>
    <p className="text-xs text-gray-500">
      {title}
    </p>
  </div>
);

const StatusBadge = ({ status }) => {
  if (status === "in-stock") {
    return (
      <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
        In Stock
      </span>
    );
  }

  if (status === "low-stock") {
    return (
      <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">
        Low Stock
      </span>
    );
  }

  return (
    <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-500">
      Out Stock
    </span>
  );
};

export default SupplementStorePage;