const ImprovementSuggestions = ({ suggestions = [] }) => {
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 via-white to-orange-50 px-5 py-5 sm:px-7 sm:py-6">

        <div className="flex items-start justify-between gap-5">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              {/* Icon */}

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-100 text-amber-600">

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18H15"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />

                  <path
                    d="M10 21H14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />

                  <path
                    d="M8.5 15.5C7.1 14.4 6 12.7 6 10.7C6 7.55 8.69 5 12 5C15.31 5 18 7.55 18 10.7C18 12.7 16.9 14.4 15.5 15.5C14.65 16.15 14 16.9 14 18H10C10 16.9 9.35 16.15 8.5 15.5Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />

                </svg>

              </span>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
                  Recommendations
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-[-0.025em] text-gray-900">
                  Improvement suggestions
                </h2>

              </div>

            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
              Practical suggestions for improving or strengthening
              the document.
            </p>

          </div>


          {/* Count */}

          <span className="hidden shrink-0 rounded-full bg-amber-100 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-700 sm:block">
            {String(suggestions.length).padStart(2, "0")}{" "}
            {suggestions.length === 1 ? "item" : "items"}
          </span>

        </div>

      </div>


      {/* =====================================================
          SUGGESTIONS
      ====================================================== */}

      <div className="p-4 sm:p-7">

        <div className="overflow-hidden rounded-lg border border-amber-100">

          {suggestions.map((suggestion, index) => (

            <div
              key={`${suggestion}-${index}`}
              className={`group px-4 py-5 transition-colors duration-200 hover:bg-amber-50/60 sm:px-5 sm:py-6 ${
                index !== suggestions.length - 1
                  ? "border-b border-amber-100"
                  : ""
              }`}
            >

              <div className="flex items-start gap-4 sm:gap-5">

                {/* Number */}

                <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-md bg-amber-100 px-2 text-[10px] font-bold tracking-[0.08em] text-amber-700">
                  {String(index + 1).padStart(2, "0")}
                </span>


                {/* Suggestion */}

                <div className="min-w-0 flex-1">

                  <p className="max-w-3xl text-sm leading-7 text-gray-700 sm:text-[15px]">
                    {suggestion}
                  </p>

                </div>


                {/* Arrow */}

                <span className="hidden shrink-0 pt-1 text-sm text-amber-200 transition-all duration-200 group-hover:translate-x-1 group-hover:text-amber-600 sm:block">
                  →
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="border-t border-amber-100 bg-amber-50/50 px-5 py-3 sm:px-7">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700">
              Actionable recommendations
            </span>

          </div>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 sm:block">
            Unthinkable · 2026
          </span>

        </div>

      </div>

    </section>
  );
};

export default ImprovementSuggestions;