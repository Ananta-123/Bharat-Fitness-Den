import { motion } from "framer-motion";

const Skeleton = ({
  className = "",
}) => (
  <div
    className={`
      animate-pulse
      rounded-lg
      bg-gray-200
      dark:bg-zinc-700
      ${className}
    `}
  />
);

const DashboardSkeleton = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-9 w-52" />
          <Skeleton className="mt-3 h-4 w-64" />
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-11 w-11 rounded-xl" />
          <Skeleton className="h-11 w-11 rounded-xl" />
          <Skeleton className="h-11 w-11 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map(
          (item) => (
            <div
              key={item}
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                dark:border-zinc-800
                dark:bg-[#0F1324]
              "
            >
              <div className="flex justify-between">
                <div>
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="mt-4 h-8 w-24" />
                  <Skeleton className="mt-3 h-4 w-32" />
                </div>

                <Skeleton className="h-14 w-14 rounded-2xl" />
              </div>
            </div>
          )
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div
          className="
            xl:col-span-2
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-56" />
          <Skeleton className="mt-8 h-[320px] w-full rounded-xl" />
        </div>

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-52" />
          <Skeleton className="mx-auto mt-8 h-52 w-52 rounded-full" />
          <Skeleton className="mt-8 h-4 w-full" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-4 h-4 w-full" />
        </div>
      </div>

      {/* Workout + Members */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div
          className="
            xl:col-span-2
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-56" />
          <Skeleton className="mt-8 h-[300px] w-full rounded-xl" />
        </div>

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            dark:border-zinc-800
            dark:bg-[#0F1324]
          "
        >
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-2 h-4 w-52" />

          <div className="mt-8 space-y-5">
            {[1, 2, 3, 4, 5].map(
              (item) => (
                <div
                  key={item}
                  className="flex gap-4"
                >
                  <Skeleton className="h-11 w-11 rounded-full" />

                  <div className="flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-2 h-3 w-44" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Branch table */}
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          dark:border-zinc-800
          dark:bg-[#0F1324]
        "
      >
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-2 h-4 w-64" />

        <div className="mt-8 space-y-5">
          {[1, 2, 3, 4].map(
            (item) => (
              <Skeleton
                key={item}
                className="h-12 w-full"
              />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSkeleton;