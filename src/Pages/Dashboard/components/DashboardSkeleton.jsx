import { motion } from "framer-motion";

const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-700 ${className}`}
  />
);

const DashboardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Skeleton className="h-9 w-52" />
          <Skeleton className="mt-3 h-4 w-64" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-11 w-72 rounded-xl" />

          <Skeleton className="h-11 w-11 rounded-xl" />
          <Skeleton className="h-11 w-11 rounded-xl" />
          <Skeleton className="h-11 w-11 rounded-xl" />

          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>

      {/* Stat Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
              dark:border-zinc-800
              dark:bg-[#0F1324]
            "
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <Skeleton className="h-3 w-24" />

                <Skeleton className="h-8 w-20" />

                <Skeleton className="h-4 w-28" />
              </div>

              <Skeleton className="h-14 w-14 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Membership */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Revenue */}

        <div
          className="
            xl:col-span-2
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-48" />

          <Skeleton className="mt-2 h-4 w-40" />

          <Skeleton className="mt-8 h-[320px] w-full rounded-xl" />
        </div>

        {/* Membership */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-40" />

          <Skeleton className="mt-2 h-4 w-36" />

          <div className="mt-8 flex justify-center">
            <Skeleton className="h-52 w-52 rounded-full" />
          </div>

          <div className="mt-8 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
              >
                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance + Recent Members */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Attendance */}

        <div
          className="
            xl:col-span-2
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-44" />

          <Skeleton className="mt-2 h-4 w-36" />

          <Skeleton className="mt-8 h-[300px] w-full rounded-xl" />

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-3 w-14" />

                <Skeleton className="mt-2 h-6 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Members */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-44" />

          <Skeleton className="mt-2 h-4 w-32" />

          <div className="mt-8 space-y-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <div>
                    <Skeleton className="h-4 w-28" />

                    <Skeleton className="mt-2 h-3 w-40" />

                    <Skeleton className="mt-2 h-3 w-24" />
                  </div>
                </div>

                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSkeleton;