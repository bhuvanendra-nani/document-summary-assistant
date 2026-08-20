
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
      accent: "emerald",
      badge: "Quick",
    },
    {
      value: "medium",
      title: "Medium",
      description: "Balanced summary",
      detail: "The recommended option",
      recommended: true,
      accent: "blue",
      badge: "Recommended",
    },
    {
      value: "long",
      title: "Long",
      description: "Detailed analysis",
      detail: "More context and explanation",
      accent: "violet",
      badge: "Detailed",
    },
  ];

  const selectedOption = options.find(
    (option) => option.value === selectedLength
  );

  const accentStyles = {
    emerald: {
      selected:
        "border-emerald-500 bg-emerald-50/70 shadow-sm shadow-emerald-100",
      icon:
        "border-emerald-500 bg-emerald-500 text-white",
      indicator: "bg-emerald-500",
      badge:
        "bg-emerald-100 text-emerald-700",
      hover:
        "hover:border-emerald-300 hover:bg-emerald-50/40",
    },

    blue: {
      selected:
        "border-blue-500 bg-blue-50/70 shadow-sm shadow-blue-100",
      icon:
        "border-blue-500 bg-blue-500 text-white",
      indicator: "bg-blue-500",
      badge:
        "bg-blue-100 text-blue-700",
      hover:
        "hover:border-blue-300 hover:bg-blue-50/40",
    },

    violet: {
      selected:
        "border-violet-500 bg-violet-50/70 shadow-sm shadow-violet-100",
      icon:
        "border-violet-500 bg-violet-500 text-white",
      indicator: "bg-violet-500",
      badge:
        "bg-violet-100 text-violet-700",
      hover:
        "hover:border-violet-300 hover:bg-violet-50/40",
    },
  };

  return (
    <section>
      {/* Heading */}
      <div className="mb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
                Summary depth
              </h2>

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                AI
              </span>
            </div>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Choose how much detail you want in the analysis.
            </p>
          </div>

          {selectedOption && (
            <span
              className={`w-fit rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] ${
                accentStyles[selectedOption.accent].badge
              }`}
            >
              {selectedOption.badge}
            </span>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = selectedLength === option.value;
          const styles = accentStyles[option.accent];

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onLengthChange(option.value)}
              aria-pressed={isSelected}
              className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                isSelected
                  ? styles.selected
                  : `border-slate-200 bg-white ${styles.hover} hover:shadow-sm`
              }`}
            >
              {/* Top accent */}
              <div
                className={`absolute left-0 right-0 top-0 h-1 transition-opacity ${
                  isSelected
                    ? styles.indicator
                    : "bg-slate-100 group-hover:bg-slate-200"
                }`}
              />

              <div className="flex items-start justify-between gap-4 pt-1">
                <div className="min-w-0">
                  {/* Title */}
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold tracking-[-0.01em] text-slate-900">
                      {option.title}
                    </p>

                    {option.recommended && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] ${
                          isSelected
                            ? styles.badge
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-1.5 text-xs leading-5 text-slate-600">
                    {option.description}
                  </p>

                  {/* Detail */}
                  <p className="mt-2.5 text-[11px] leading-4 text-slate-400">
                    {option.detail}
                  </p>
                </div>

                {/* Selection indicator */}
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-200 ${
                    isSelected
                      ? styles.icon
                      : "border-slate-300 bg-white text-transparent group-hover:border-slate-400"
                  }`}
                >
                  ✓
                </span>
              </div>

              {/* Bottom selected indicator */}
              {isSelected && (
                <span
                  className={`absolute bottom-0 left-0 right-0 h-1 ${styles.indicator}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile helper */}
      <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400 sm:hidden">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        <span>
          {selectedOption?.title} summary selected
        </span>
      </div>
    </section>
  );
};

export default SummaryLengthSelector;

