import { useTheme } from "next-themes";

export default function LoadingSkeleton() {
  const { theme } = useTheme();

  const cardClass = `
    rounded-2xl
    border
    animate-pulse
    ${
      theme === "dark"
        ? "bg-[#10131F]/90 border-gray-800"
        : "bg-white border-gray-200"
    }
  `;

  const shimmer = `
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
      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
      ">
        <div className="
          flex
          items-center
          gap-4
        ">
          <div className="
            w-14
            h-14
            rounded-2xl
            bg-gray-700/50
          " />

          <div className="space-y-3">
            <div className={`
              h-7
              w-64
              ${shimmer}
            `} />

            <div className={`
              h-4
              w-80
              ${shimmer}
            `} />
          </div>
        </div>

        <div className={`
          h-12
          w-40
          ${shimmer}
        `} />
      </div>

      {/* Stats */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">
        {[1, 2, 3, 4].map(
          (item) => (
            <div
              key={item}
              className={`
                ${cardClass}
                p-6
              `}
            >
              <div className="
                flex
                justify-between
                items-center
              ">
                <div className="space-y-3">
                  <div className={`
                    h-4
                    w-28
                    ${shimmer}
                  `} />

                  <div className={`
                    h-8
                    w-24
                    ${shimmer}
                  `} />
                </div>

                <div className={`
                  w-12
                  h-12
                  rounded-xl
                  ${shimmer}
                `} />
              </div>
            </div>
          )
        )}
      </div>

      {/* Revenue + Membership */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">
        <div className={`
          ${cardClass}
          xl:col-span-2
          p-6
        `}>
          <div className={`
            h-6
            w-52
            ${shimmer}
          `} />

          <div className={`
            mt-4
            h-10
            w-40
            ${shimmer}
          `} />

          <div className="
            mt-8
            h-80
            rounded-xl
            bg-gray-700/30
          " />
        </div>

        <div className={`
          ${cardClass}
          p-6
        `}>
          <div className={`
            h-6
            w-48
            ${shimmer}
          `} />

          <div className="
            grid
            grid-cols-2
            gap-4
            mt-8
          ">
            <div className="
              h-28
              rounded-xl
              bg-gray-700/30
            " />

            <div className="
              h-28
              rounded-xl
              bg-gray-700/30
            " />
          </div>

          <div className="
            mt-6
            space-y-4
          ">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className={`
                    h-8
                    ${shimmer}
                  `}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Workout + Diet */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">
        {[1, 2].map(
          (item) => (
            <div
              key={item}
              className={`
                ${cardClass}
                p-6
              `}
            >
              <div className={`
                h-6
                w-52
                ${shimmer}
              `} />

              <div className="
                mt-6
                h-72
                rounded-xl
                bg-gray-700/30
              " />
            </div>
          )
        )}
      </div>

      {/* Branch */}
      <div className={`
        ${cardClass}
        p-6
      `}>
        <div className={`
          h-6
          w-52
          ${shimmer}
        `} />

        <div className="
          mt-8
          h-80
          rounded-xl
          bg-gray-700/30
        " />
      </div>

      {/* Table */}
      <div className={cardClass}>
        <div className="
          p-6
          border-b
          border-gray-700/20
        ">
          <div className={`
            h-6
            w-48
            ${shimmer}
          `} />
        </div>

        {[1, 2, 3, 4, 5].map(
          (row) => (
            <div
              key={row}
              className="
                grid
                grid-cols-4
                gap-4
                p-6
                border-b
                border-gray-700/10
              "
            >
              <div className={`
                h-5
                ${shimmer}
              `} />

              <div className={`
                h-5
                ${shimmer}
              `} />

              <div className={`
                h-5
                ${shimmer}
              `} />

              <div className={`
                h-5
                ${shimmer}
              `} />
            </div>
          )
        )}
      </div>

    </div>
  );
}