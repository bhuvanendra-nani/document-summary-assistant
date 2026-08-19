const KeyPoints = ({ points = [] }) => {
  if (!Array.isArray(points) || points.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm text-white">
            ✓
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Key Points
            </h2>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              The most important information identified from the document.
            </p>
          </div>
        </div>
      </div>

      {/* Points */}
      <div className="p-5 sm:p-6">
        <div className="space-y-3">
          {points.map((point, index) => (
            <div
              key={`${index}-${point}`}
              className="group flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm sm:gap-4"
            >
              {/* Number */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-gray-700 ring-1 ring-gray-200 transition group-hover:bg-gray-900 group-hover:text-white group-hover:ring-gray-900">
                {index + 1}
              </div>

              {/* Point */}
              <p className="pt-0.5 text-sm leading-6 text-gray-700">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyPoints;