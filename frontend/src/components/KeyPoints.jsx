const KeyPoints = ({ points = [] }) => {
  if (!Array.isArray(points) || points.length === 0) {
    return null;
  }

  return (
    <section className="border border-[#cfcdd0] bg-[#faf9f6]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-[#d8d6cf] px-5 py-5 sm:px-7 sm:py-6">

        <div className="flex items-start gap-4">

          {/* Section marker */}

          <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#c9c7c0] bg-white text-[#33322f]">

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5H19"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M5 19H19"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <circle
                cx="3"
                cy="5"
                r="1"
                fill="currentColor"
              />

              <circle
                cx="3"
                cy="12"
                r="1"
                fill="currentColor"
              />

              <circle
                cx="3"
                cy="19"
                r="1"
                fill="currentColor"
              />
            </svg>

          </div>


          {/* Heading */}

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77756e]">
              Extracted intelligence
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[#111111]">
              Key points
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6c6a64]">
              The most important information identified from the document.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          POINTS
      ====================================================== */}

      <div className="p-5 sm:p-7">

        <div className="divide-y divide-[#e1dfd8] border-y border-[#e1dfd8]">

          {points.map((point, index) => (

            <div
              key={`${index}-${point}`}
              className="group flex gap-4 px-1 py-5 transition-colors duration-200 hover:bg-[#f3f1eb] sm:gap-6 sm:px-3"
            >

              {/* Number */}

              <div className="flex shrink-0 items-start pt-0.5">

                <span className="text-[10px] font-semibold tracking-[0.12em] text-[#aaa79e]">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>


              {/* Point */}

              <div className="min-w-0 flex-1">

                <p className="text-sm leading-7 text-[#33322f] sm:text-[15px]">
                  {point}
                </p>

              </div>


              {/* Small visual indicator */}

              <div className="hidden shrink-0 pt-2 sm:block">

                <span className="block h-1.5 w-1.5 bg-[#c5c3bc] transition-colors duration-200 group-hover:bg-[#111111]" />

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="border-t border-[#d8d6cf] px-5 py-3 sm:px-7">

        <div className="flex items-center justify-between gap-4">

          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#aaa79e]">
            {points.length} {points.length === 1 ? "point" : "points"} identified
          </span>

          <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-[#aaa79e] sm:block">
            Structured insight
          </span>

        </div>

      </div>

    </section>
  );
};

export default KeyPoints;