const ImprovementSuggestions = ({ suggestions = [] }) => {
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return null;
  }

  return (
    <section className="border border-[#cfcdd0] bg-[#faf9f6]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-[#d8d6cf] px-5 py-5 sm:px-7 sm:py-6">

        <div className="flex items-start justify-between gap-5">

          <div>

            <div className="flex items-center gap-3">

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77756e]">
                04 / Recommendations
              </span>

              <span className="h-px w-8 bg-[#d0cec7]" />

            </div>

            <h2 className="mt-3 text-lg font-semibold tracking-[-0.025em] text-[#111111] sm:text-xl">
              Improvement suggestions
            </h2>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#77756e]">
              Practical suggestions for improving or strengthening
              the document.
            </p>

          </div>


          {/* Count */}

          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#aaa79e]">
            {String(suggestions.length).padStart(2, "0")} items
          </span>

        </div>

      </div>


      {/* =====================================================
          SUGGESTIONS
      ====================================================== */}

      <div className="divide-y divide-[#d8d6cf]">

        {suggestions.map((suggestion, index) => (

          <div
            key={`${suggestion}-${index}`}
            className="group px-5 py-5 transition-colors duration-200 hover:bg-[#f3f1eb] sm:px-7 sm:py-6"
          >

            <div className="flex items-start gap-5">

              {/* Number */}

              <span className="w-8 shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#aaa79e]">
                {String(index + 1).padStart(2, "0")}
              </span>


              {/* Suggestion */}

              <div className="min-w-0 flex-1">

                <p className="max-w-3xl text-sm leading-7 text-[#33322f] sm:text-[15px]">
                  {suggestion}
                </p>

              </div>


              {/* Arrow */}

              <span className="hidden shrink-0 pt-1 text-sm text-[#aaa79e] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#111111] sm:block">
                →
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="border-t border-[#d8d6cf] bg-[#f3f1eb] px-5 py-3 sm:px-7">

        <div className="flex items-center justify-between gap-4">

          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8b8981]">
            Actionable document intelligence
          </span>

          <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-[#8b8981] sm:block">
            Unthinkable · 2026
          </span>

        </div>

      </div>

    </section>
  );
};

export default ImprovementSuggestions;