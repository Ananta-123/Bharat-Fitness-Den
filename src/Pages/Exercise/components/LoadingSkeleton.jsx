import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm

            dark:border-slate-700
            dark:bg-slate-900/70
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-gray-200 dark:bg-slate-700 animate-pulse" />

              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
              </div>
            </div>

            <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse" />
          </div>

          {/* Body */}
          <div className="space-y-5 border-t border-gray-100 p-5 dark:border-slate-700">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between"
              >
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />

                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
              </div>
            ))}

            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />

              <div className="h-3 w-full rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
              <div className="h-3 w-11/12 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
              <div className="h-3 w-9/12 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
            </div>

            <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-slate-700 animate-pulse" />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 p-5 dark:border-slate-700">
            <div className="h-10 w-24 rounded-xl bg-gray-200 dark:bg-slate-700 animate-pulse" />

            <div className="h-10 w-24 rounded-xl bg-gray-200 dark:bg-slate-700 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}