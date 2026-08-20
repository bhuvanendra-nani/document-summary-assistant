const SummaryLengthSelector = ({
  selectedLength,
  onLengthChange,
}) => {
  const options = [
    {
      value: "short",
      title: "Short",
      description: "Quick overview",
      detail: "Key information only",
    },
    {
      value: "medium",
      title: "Medium",
      description: "Balanced summary",
      detail: "The recommended option",
      recommended: true,
    },
    {
      value: "long",
      title: "Long",
      description: "Detailed analysis",
      detail: "More context and explanation",
    },
  ];

  return (
    <section>
      {/* Heading */}
      <div className="mb-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#111111]">
              Summary depth
            </h2>

            <p className="mt-1 text-sm leading-5 text-[#77756e]">
              Choose how much detail you want in the analysis.
            </p>
          </div>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-[#aaa79e] sm:block">
            {selectedLength === "short"
              ? "Quick"
              : selectedLength === "medium"
              ? "Recommended"
              : "Detailed"}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = selectedLength === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onLengthChange(option.value)}
              aria-pressed={isSelected}
              className={`group relative w-full border px-4 py-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 ${
                isSelected
                  ? "border-[#111111] bg-[#f3f1eb]"
                  : "border-[#d3d1ca] bg-white hover:border-[#8c8a83] hover:bg-[#faf9f6]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">

                  {/* Top row */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold tracking-[-0.01em] text-[#111111]">
                      {option.title}
                    </p>

                    {option.recommended && (
                      <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#77756e]">
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-1.5 text-xs leading-5 text-[#5f5d57]">
                    {option.description}
                  </p>

                  {/* Detail */}
                  <p className="mt-2.5 text-[11px] leading-4 text-[#96938b]">
                    {option.detail}
                  </p>
                </div>

                {/* Selection indicator */}
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-[10px] font-bold transition-all duration-200 ${
                    isSelected
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-[#c9c7c0] bg-white text-transparent group-hover:border-[#77756e]"
                  }`}
                >
                  ✓
                </span>
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SummaryLengthSelector;