const SummaryLengthSelector = ({
  selectedLength,
  onLengthChange,
}) => {
  const options = [
    {
      value: "short",
      title: "Short",
      description: "Quick overview",
    },
    {
      value: "medium",
      title: "Medium",
      description: "Balanced summary",
    },
    {
      value: "long",
      title: "Long",
      description: "Detailed analysis",
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Summary Length
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose how detailed you want your generated summary.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = selectedLength === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onLengthChange(option.value)}
              aria-pressed={isSelected}
              className={`group relative rounded-xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.98] ${
                isSelected
                  ? "border-gray-900 bg-gray-900 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-900 hover:border-gray-400 hover:shadow-sm"
              }`}
            >
              {/* Selected Indicator */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {option.title}
                </span>

                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold transition ${
                    isSelected
                      ? "bg-white text-gray-900"
                      : "border border-gray-300 text-transparent group-hover:border-gray-400"
                  }`}
                >
                  ✓
                </span>
              </div>

              {/* Description */}
              <p
                className={`mt-2 text-xs leading-relaxed ${
                  isSelected
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {option.description}
              </p>

              {/* Selected Label */}
              {isSelected && (
                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Selected
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SummaryLengthSelector;