import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import AddCategoryModal from "../Category/AddCategoryModal.jsx"
import DeleteCategoryModal from "../Category/DeleteCategoryModal.jsx"
import EditCategoryModal from "../Category/EditCategoryModal.jsx"

import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../../Api/categoryApi.js";

import {
    Search,
    Plus,
    Layers3,
    CheckCircle,
    Clock3,
} from "lucide-react";

const CategoryPage = () => {
    const { theme } = useTheme();

    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [showAddModal, setShowAddModal] =
        useState(false);

    const [showEditModal, setShowEditModal] =
        useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);

            const res =
                await getAllCategories();

            if (res.success) {
                setCategories(
                    res.categories || []
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (
        formData
    ) => {
        try {
            const res =
                await createCategory(formData);

            if (res.success) {
                setCategories((prev) => [
                    res.category,
                    ...prev,
                ]);

                setShowAddModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditCategory = async (
        id,
        formData
    ) => {
        try {
            const res =
                await updateCategory(
                    id,
                    formData
                );

            if (res.success) {
                setCategories((prev) =>
                    prev.map((item) =>
                        item._id === id
                            ? {
                                ...item,
                                ...formData,
                            }
                            : item
                    )
                );

                setShowEditModal(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCategory = async (
        id
    ) => {
        try {
            const confirmDelete =
                window.confirm(
                    "Delete this category?"
                );

            if (!confirmDelete) return;

            const res =
                await deleteCategory(id);

            if (res.success) {
                setCategories((prev) =>
                    prev.filter(
                        (item) => item._id !== id
                    )
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    const [search, setSearch] = useState("");

    const filteredCategories = categories.filter(
        (category) =>
            category.name
                .toLowerCase()
                .includes(search.toLowerCase())
    );
    if (loading) {
        return (
            <div className="p-6">
                Loading Categories...
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">

            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold">
                        Category Management
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage supplement categories
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
            mt-4 lg:mt-0
            flex items-center gap-2
            px-5 py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-[#F96B00]
            to-orange-500
            shadow-lg
          "
                    onClick={() =>
                        setShowAddModal(true)
                    }
                >
                    <Plus size={18} />
                    Add Category
                </motion.button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                <StatCard
                    icon={<Layers3 />}
                    title="Total Categories"
                    value={categories.length}
                    color="text-orange-500"
                />

                <StatCard
                    icon={<CheckCircle />}
                    title="Active"
                    value={
                        categories.filter(
                            (item) => item.status
                        ).length
                    }
                    color="text-green-500"
                />

                <StatCard
                    icon={<Clock3 />}
                    title="Inactive"
                    value={
                        categories.filter(
                            (item) => !item.status
                        ).length
                    }
                    color="text-red-500"
                />

            </div>

            {/* SEARCH */}

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
                    placeholder="Search category..."
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

            {/* CATEGORY GRID */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredCategories.map((category) => (
                    <motion.div
                        key={category._id}
                        whileHover={{
                            y: -5,
                            scale: 1.02,
                        }}
                        className="
              p-5
              rounded-3xl

              bg-white
              border border-gray-200

              dark:bg-[#0B1120]
              dark:border-[#1B2440]

              shadow-lg
              dark:shadow-[0_0_25px_rgba(249,107,0,0.08)]
            "
                    >

                        <div className="flex justify-between items-start mb-4">

                            <h3 className="text-xl font-bold">
                                {category.name}
                            </h3>

                            <StatusBadge
                                status={category.status}
                            />

                        </div>

                        <p className="text-gray-500 dark:text-gray-400 mb-5 line-clamp-3">
                            {category.description}
                        </p>

                        <div className="text-sm text-gray-400 mb-5">
                            Created : {new Date(category.createdAt).toLocaleDateString()}
                        </div>

                        <div className="flex gap-3">

                            <button
  onClick={() => {
    setSelectedCategory(category);
    setShowEditModal(true);
  }}
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

                            <button
                                onClick={() =>
                                    handleDeleteCategory(
                                        category._id
                                    )
                                }
                                className="
  flex-1
  py-3
  rounded-xl
  bg-red-500
  text-white
"
                            >
                                Delete
                            </button>

                        </div>

                    </motion.div>
                    
                ))}
                
            </div>
            {showAddModal && (
      <AddCategoryModal
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCategory}
      />
    )}

    {showEditModal && (
      <EditCategoryModal
        category={selectedCategory}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditCategory}
      />
    )}
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

const StatusBadge = ({ status }) => {
    return status ? (
        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
            Active
        </span>
    ) : (
        <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-500">
            Inactive
        </span>
    );
};


export default CategoryPage;