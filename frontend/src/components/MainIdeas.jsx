const MainIdeas = ({ ideas = [] }) => {
  if (!Array.isArray(ideas) || ideas.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-teal-50 px-5 py-5 sm:px-7 sm:py-6">

        <div className="flex items-start justify-between gap-5">

          <div className="min-w-0">

            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-100 text-emerald-600">

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M9 15L15 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="9"
                    cy="9"
                    r="1.2"
                    fill="currentColor"
                  />

                  <circle
                    cx="15"
                    cy="15"
                    r="1.2"
                    fill="currentColor"
                  />
                </svg>

              </span>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-500">
                  Core concepts
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-[-0.025em] text-gray-900">
                  Main ideas
                </h2>

              </div>

            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
              The central concepts, purpose, and message identified
              from the document.
            </p>

          </div>


          {/* Count */}

          <span className="hidden shrink-0 rounded-full bg-emerald-100 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-600 sm:block">
            {String(ideas.length).padStart(2, "0")}{" "}
            {ideas.length === 1 ? "idea" : "ideas"}
          </span>

        </div>

      </div>


      {/* =====================================================
          IDEAS
      ====================================================== */}

      <div className="p-4 sm:p-7">

        <div className="overflow-hidden rounded-lg border border-emerald-100">

          {ideas.map((idea, index) => (

            <div
              key={`${index}-${idea}`}
              className={`group px-4 py-5 transition-colors duration-200 hover:bg-emerald-50/60 sm:px-5 sm:py-6 ${
                index !== ideas.length - 1
                  ? "border-b border-emerald-100"
                  : ""
              }`}
            >

              <div className="flex items-start gap-4 sm:gap-5">

                {/* Number */}

                <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 px-2 text-[10px] font-bold tracking-[0.08em] text-emerald-600">
                  {String(index + 1).padStart(2, "0")}
                </span>


                {/* Idea */}

                <div className="min-w-0 flex-1">

                  <p className="max-w-3xl text-sm leading-7 text-gray-700 sm:text-[15px]">
                    {idea}
                  </p>

                </div>


                {/* Arrow */}

                <span className="hidden shrink-0 pt-1 text-sm text-emerald-200 transition-all duration-200 group-hover:translate-x-1 group-hover:text-emerald-500 sm:block">
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

      <div className="border-t border-emerald-100 bg-emerald-50/50 px-5 py-3 sm:px-7">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600">
              Core concepts identified
            </span>

          </div>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400 sm:block">
            Structured insight
          </span>

        </div>

      </div>

    </section>
  );
};

export default MainIdeas;