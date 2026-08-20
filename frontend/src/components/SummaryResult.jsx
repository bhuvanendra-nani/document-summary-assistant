import { useState } from "react";

const SummaryResult = ({ summary }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!summary) return;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-purple-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">

        <div className="min-w-0">

          <div className="flex items-center gap-3">

            {/* Summary icon */}

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-100 text-indigo-600">

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3H14L19 8V21H7V3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M14 3V8H19"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M10 13H16M10 17H15"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

            </span>

            <div className="min-w-0">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                Analysis output
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-[-0.025em] text-gray-900">
                Summary
              </h2>

            </div>

          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
            A concise interpretation of the document content and its most
            relevant information.
          </p>

        </div>


        {/* Copy button */}

        <button
          type="button"
          onClick={handleCopy}
          disabled={!summary}
          className={`inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-lg border px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 sm:w-auto ${
            copied
              ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
              : "border-indigo-200 bg-white text-indigo-700 hover:border-indigo-400 hover:bg-indigo-50"
          } disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {copied ? "Copied" : "Copy summary"}

          <span className="text-sm">
            {copied ? "✓" : "↗"}
          </span>
        </button>

      </div>


      {/* =====================================================
          SUMMARY CONTENT
      ====================================================== */}

      <div className="p-4 sm:p-7">

        {summary ? (

          <div className="overflow-hidden rounded-lg border border-indigo-100 bg-white">

            {/* Content label */}

            <div className="border-b border-indigo-100 bg-indigo-50/60 px-5 py-3 sm:px-6">

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-indigo-500" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600">
                    Generated summary
                  </span>

                </div>

                <span className="hidden rounded-full bg-purple-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-purple-600 sm:block">
                  AI analysis
                </span>

              </div>

            </div>


            {/* Actual summary */}

            <div className="border-l-4 border-indigo-500 px-5 py-6 sm:px-7 sm:py-8">

              <p className="whitespace-pre-line text-[15px] leading-7 text-gray-700 sm:text-base sm:leading-8">
                {summary}
              </p>

            </div>

          </div>

        ) : (

          <div className="rounded-lg border border-dashed border-indigo-200 bg-indigo-50/30 px-6 py-12 text-center">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-200 bg-white text-indigo-400">

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3H14L19 8V21H7V3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M14 3V8H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

              </svg>

            </div>

            <p className="mt-4 text-sm font-semibold text-gray-700">
              No summary was generated.
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Upload and analyze a document to see the generated summary.
            </p>

          </div>

        )}

      </div>


      {/* =====================================================
          FOOTER METADATA
      ====================================================== */}

      {summary && (

        <div className="border-t border-indigo-100 bg-gray-50 px-5 py-3 sm:px-7">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-400">
              Structured document intelligence
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
              Unthinkable · 2026
            </span>

          </div>

        </div>

      )}

    </section>
  );
};

export default SummaryResult;