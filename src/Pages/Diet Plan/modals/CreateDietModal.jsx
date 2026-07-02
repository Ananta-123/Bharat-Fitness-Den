import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { X, Salad } from "lucide-react";

import { createDiet } from "../../../Api/dietApi.js";
import { getAllGoals } from "../../../Api/goalGroupApi.js";

export default function CreateDietModal({
    isOpen,
    onClose,
    fetchDiets,
}) {
    const { theme } = useTheme();

    const [title, setTitle] = useState("");
    const [goalGroupId, setGoalGroupId] = useState("");
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadGoals();
        }
    }, [isOpen]);

    const loadGoals = async () => {
        try {
            const res = await getAllGoals();
            setGoals(res.goals || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !goalGroupId) return;

        try {
            setLoading(true);

            await createDiet({
                title,
                goalGroupId,
            });

            fetchDiets();

            setTitle("");
            setGoalGroupId("");

            onClose();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5"
            >

                <motion.form
                    initial={{ scale: .95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: .95, opacity: 0 }}
                    transition={{ duration: .25 }}
                    onSubmit={handleSubmit}
                    className={`w-full max-w-lg rounded-2xl border overflow-hidden ${theme === "dark"
                            ? "bg-[#0B1020] border-white/10"
                            : "bg-white border-gray-200"
                        }`}
                >

                    {/* Header */}

                    <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">

                                <Salad
                                    className="text-green-500"
                                    size={24}
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold">
                                    Create Diet
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Add a new diet plan
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            <X />
                        </button>

                    </div>

                    {/* Body */}

                    <div className="p-6 space-y-5">

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Diet Title
                            </label>

                            <input
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                placeholder="Enter diet title"
                                className={`w-full rounded-xl px-4 py-3 outline-none border ${theme === "dark"
                                        ? "bg-[#111827] border-white/10"
                                        : "bg-gray-50 border-gray-300"
                                    }`}
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium">
                                Goal Group
                            </label>

                            <select
                                value={goalGroupId}
                                onChange={(e) =>
                                    setGoalGroupId(e.target.value)
                                }
                                className={`w-full rounded-xl px-4 py-3 outline-none border ${theme === "dark"
                                        ? "bg-[#111827] border-white/10"
                                        : "bg-gray-50 border-gray-300"
                                    }`}
                            >

                                <option value="">
                                    Select Goal Group
                                </option>

                                {goals.map((goal) => (
                                    <option key={goal._id} value={goal._id}>
                                        {goal.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 px-6 py-5 border-t border-white/10">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl border"
                        >
                            Cancel
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: .95 }}
                            disabled={loading}
                            className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Diet"}
                        </motion.button>

                    </div>

                </motion.form>

            </motion.div>

        </AnimatePresence>
    );
}