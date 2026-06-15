const months = [
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BranchMiniChart = ({
  chartData,
}) => {
  return (
    <div
      className="
        flex items-end
        justify-between
        h-24
        mt-6
      "
    >
      {chartData.map((item, index) => (
        <div
          key={index}
          className="
            flex flex-col
            items-center gap-2
          "
        >
          <div
            style={{
              height: `${item}px`,
            }}
            className="
              w-6
              rounded-md

              bg-orange-500
              dark:bg-lime-500
            "
          />

          <span
            className="
              text-xs
              text-gray-400
            "
          >
            {months[index]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BranchMiniChart;