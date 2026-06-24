import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import {
  Search,
  Package,
  AlertTriangle,
  DollarSign,
  ShoppingBag,
  Plus,
  Star,
} from "lucide-react";

const SupplementStorePage = () => {
  const { theme } = useTheme();

  // Future API Data
  const [products] = useState([
    {
      id: 1,
      name: "Whey Protein Gold",
      brand: "Optimum Nutrition",
      category: "Protein",
      price: 89.99,
      stock: 145,
      sold: 342,
      rating: 4.9,
      sku: "WPG-001",
      status: "in-stock",
    },
    {
      id: 2,
      name: "Pre Workout Ignite",
      brand: "FITNESS DEN Brand",
      category: "Pre Workout",
      price: 54.99,
      stock: 23,
      sold: 218,
      rating: 4.7,
      sku: "PWI-002",
      status: "low-stock",
    },
    {
      id: 3,
      name: "Creatine Monohydrate",
      brand: "Optimum Nutrition",
      category: "Creatine",
      price: 34.99,
      stock: 0,
      sold: 298,
      rating: 4.8,
      sku: "CMH-004",
      status: "out-stock",
    },
    {
      id: 4,
      name: "Mass Gainer 12lbs",
      brand: "BSN",
      category: "Mass Gainer",
      price: 124.99,
      stock: 67,
      sold: 134,
      rating: 4.5,
      sku: "MGN-005",
      status: "in-stock",
    },
    {
      id: 5,
      name: "Omega 3 Fish Oil",
      brand: "Now Sports",
      category: "Vitamins",
      price: 24.99,
      stock: 201,
      sold: 156,
      rating: 4.4,
      sku: "OFO-006",
      status: "in-stock",
    },
    {
      id: 6,
      name: "BCAA Recovery+",
      brand: "Scivation",
      category: "Amino Acids",
      price: 44.99,
      stock: 89,
      sold: 175,
      rating: 4.6,
      sku: "BCR-003",
      status: "in-stock",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = products.reduce(
    (acc, item) => acc + item.price * item.sold,
    0
  );

  const lowStockCount = products.filter(
    (item) => item.stock < 25
  ).length;

  const totalSold = products.reduce(
    (acc, item) => acc + item.sold,
    0
  );

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
    Add Category
  </motion.button>

  <motion.button
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
            key={product.id}
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

              <StatusBadge status={product.status} />
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
                {product.category}
              </span>

              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={15} fill="currentColor" />
                {product.rating}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <InfoBox
                title="Price"
                value={`$${product.price}`}
              />
              <InfoBox
                title="Stock"
                value={product.stock}
              />
              <InfoBox
                title="Sold"
                value={product.sold}
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
                  className={`h-full ${
                    product.stock === 0
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
              SKU: {product.sku}
            </p>

            <div className="flex gap-3">
              <button
                className="
                flex-1
                py-3
                rounded-xl
                text-white
                font-semibold
                bg-gradient-to-r
                from-[#F96B00]
                to-orange-500
                "
              >
                Edit
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