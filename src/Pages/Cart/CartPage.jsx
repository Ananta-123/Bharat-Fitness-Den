import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import CartHeader from "./components/CartHeader";
import CartStats from "./components/CartStats";
import CartTable from "./components/CartTable";
import EmptyState from "./components/EmptyState";
import LoadingSkeleton from "./components/LoadingSkeleton";

import { getAllCart } from "../../Api/cartApi";
// import { dummyCarts } from "./data/dummyCarts";

export default function CartPage() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await getAllCart();

      if (res.success && res.cart) {
        setCarts(Array.isArray(res.cart) ? res.cart : [res.cart]);
      } else {
        setCarts([]);
      }

      // setCarts(dummyCarts); // Use while backend is under development
    } catch (err) {
      console.error("Failed to fetch carts:", err);
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCarts = useMemo(() => {
    return carts.filter((cart) => {
      const member =
        cart.memberName ||
        cart.user?.name ||
        cart.member ||
        "";

      const product =
        cart.productName ||
        cart.product?.name ||
        cart.product ||
        "";

      return (
        member.toLowerCase().includes(search.toLowerCase()) ||
        product.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [carts, search]);

  const stats = useMemo(() => {
    const pending = carts.filter(
      (cart) =>
        (cart.status || "").toLowerCase() === "pending"
    ).length;

    const abandoned = carts.filter(
      (cart) =>
        (cart.status || "").toLowerCase() === "abandoned"
    ).length;

    const value = carts.reduce((sum, cart) => {
      return (
        sum +
        Number(
          cart.total ||
            cart.totalAmount ||
            cart.value ||
            0
        )
      );
    }, 0);

    return {
      pending,
      abandoned,
      value,
    };
  }, [carts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen p-6 ${
        theme === "dark"
          ? "bg-transparent text-white"
          : "bg-[#F5F7FB] text-gray-900"
      }`}
    >
      <CartHeader
        search={search}
        setSearch={setSearch}
      />

      <div className="mt-6">
        <CartStats stats={stats} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`mt-6 rounded-2xl border overflow-hidden ${
          theme === "dark"
            ? "bg-[#0F172A]/50 border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        {loading ? (
          <LoadingSkeleton />
        ) : filteredCarts.length === 0 ? (
          <EmptyState />
        ) : (
          <CartTable
            carts={filteredCarts}
            refreshCart={fetchCart}
          />
        )}
      </motion.div>
    </motion.div>
  );
}