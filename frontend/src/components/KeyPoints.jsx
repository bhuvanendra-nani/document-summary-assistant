const KeyPoints = ({ points = [] }) => {
  if (!Array.isArray(points) || points.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-sky-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 px-5 py-5 sm:px-7 sm:py-6">

        <div className="flex items-start gap-4">

          {/* Section marker */}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-100 text-sky-600">

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 5H19"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M8 12H19"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M8 19H19"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <circle
                cx="4"
                cy="5"
                r="1.5"
                fill="currentColor"
              />

              <circle
                cx="4"
                cy="12"
                r="1.5"
                fill="currentColor"
              />

              <circle
                cx="4"
                cy="19"
                r="1.5"
                fill="currentColor"
              />
            </svg>

          </div>


          {/* Heading */}

          <div className="min-w-0">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500">
              Extracted intelligence
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-[-0.025em] text-gray-900">
              Key points
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
              The most important information identified from the document.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          POINTS
      ====================================================== */}

      <div className="p-4 sm:p-7">

        <div className="overflow-hidden rounded-lg border border-sky-100">

          {points.map((point, index) => (

            <div
              key={`${index}-${point}`}
              className={`group flex gap-4 px-4 py-5 transition-colors duration-200 hover:bg-sky-50/60 sm:gap-6 sm:px-5 ${
                index !== points.length - 1
                  ? "border-b border-sky-100"
                  : ""
              }`}
            >

              {/* Number */}

              <div className="flex shrink-0 items-start pt-0.5">

                <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-sky-100 px-2 text-[10px] font-bold tracking-[0.08em] text-sky-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>


              {/* Point */}

              <div className="min-w-0 flex-1">

                <p className="text-sm leading-7 text-gray-700 sm:text-[15px]">
                  {point}
                </p>

              </div>


              {/* Visual indicator */}

              <div className="hidden shrink-0 pt-2 sm:block">

                <span className="block h-2 w-2 rounded-full bg-sky-200 transition-all duration-200 group-hover:bg-sky-500 group-hover:ring-4 group-hover:ring-sky-100" />

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="border-t border-sky-100 bg-sky-50/50 px-5 py-3 sm:px-7">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-600">
              {points.length}{" "}
              {points.length === 1 ? "point" : "points"} identified
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

export default KeyPoints;