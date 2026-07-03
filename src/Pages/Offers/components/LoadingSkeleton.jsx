import { useTheme } from "next-themes";

export default function LoadingSkeleton() {
  const { theme } = useTheme();

  const card = `
    rounded-2xl border animate-pulse
    ${
      theme === "dark"
        ? "bg-[#10131F]/90 border-gray-800"
        : "bg-white border-gray-200"
    }
  `;

  const skeleton = `
    rounded-lg
    ${
      theme === "dark"
        ? "bg-gray-700/60"
        : "bg-gray-200"
    }
  `;

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div className="flex items-center gap-4">

          <div
            className={`w-14 h-14 rounded-2xl ${
              theme === "dark"
                ? "bg-gray-700"
                : "bg-gray-200"
            }`}
          />

          <div className="space-y-3">

            <div className={`h-7 w-56 ${skeleton}`} />

            <div className={`h-4 w-72 ${skeleton}`} />

          </div>

        </div>

        <div className={`h-12 w-40 ${skeleton}`} />

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`${card} p-6`}
          >
            <div className="flex items-center justify-between">

              <div className="space-y-3">

                <div className={`h-4 w-28 ${skeleton}`} />

                <div className={`h-8 w-20 ${skeleton}`} />

              </div>

              <div
                className={`w-12 h-12 rounded-xl ${
                  theme === "dark"
                    ? "bg-gray-700"
                    : "bg-gray-200"
                }`}
              />

            </div>

            <div className={`mt-6 h-4 w-36 ${skeleton}`} />

          </div>
        ))}

      </div>

      {/* Offer Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">

        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className={`${card} overflow-hidden`}
          >
            {/* Top Gradient */}

            <div
              className={`h-2 ${
                theme === "dark"
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            />

            <div className="p-6">

              {/* Header */}

              <div className="flex items-start justify-between">

                <div className="flex gap-3">

                  <div
                    className={`w-14 h-14 rounded-xl ${
                      theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  />

                  <div className="space-y-2">

                    <div className={`h-5 w-28 ${skeleton}`} />

                    <div className={`h-3 w-20 ${skeleton}`} />

                  </div>

                </div>

                <div className={`h-7 w-20 rounded-full ${skeleton}`} />

              </div>

              {/* Description */}

              <div
                className={`mt-6 rounded-xl p-4 ${
                  theme === "dark"
                    ? "bg-gray-700/40"
                    : "bg-gray-100"
                }`}
              >
                <div className={`h-4 w-full ${skeleton}`} />

                <div className={`h-4 w-3/4 mt-3 ${skeleton}`} />

              </div>

              {/* Dates */}

              <div className="mt-6 space-y-4">

                <div className="flex justify-between">

                  <div className={`h-4 w-24 ${skeleton}`} />

                  <div className={`h-4 w-24 ${skeleton}`} />

                </div>

                <div className="flex justify-between">

                  <div className={`h-4 w-24 ${skeleton}`} />

                  <div className={`h-4 w-24 ${skeleton}`} />

                </div>

              </div>

              {/* Footer */}

              <div className="mt-6 pt-5 border-t border-gray-700/10 flex justify-between items-center">

                <div>

                  <div className={`h-3 w-16 ${skeleton}`} />

                  <div className={`h-4 w-24 mt-2 ${skeleton}`} />

                </div>

                <div className="flex gap-2">

                  <div
                    className={`w-10 h-10 rounded-xl ${
                      theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  />

                  <div
                    className={`w-10 h-10 rounded-xl ${
                      theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-200"
                    }`}
                  />

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}