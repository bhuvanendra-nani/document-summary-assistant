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
    <section className="border border-[#cfcdd0] bg-[#faf9f6]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 border-b border-[#d8d6cf] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">

        <div>

          <div className="flex items-center gap-3">

            {/* Section marker */}
            <span className="flex h-8 w-8 items-center justify-center border border-[#c9c7c0] bg-white text-[#33322f]">
              <svg
                width="15"
                height="15"
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

                <path
                  d="M10 13H16M10 17H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </span>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77756e]">
                Analysis output
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-[#111111]">
                Summary
              </h2>
            </div>

          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#6c6a64]">
            A concise interpretation of the document content and its most
            relevant information.
          </p>

        </div>


        {/* Copy button */}

        <button
          type="button"
          onClick={handleCopy}
          disabled={!summary}
          className={`inline-flex w-full shrink-0 items-center justify-center gap-3 border px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 sm:w-auto ${
            copied
              ? "border-[#111111] bg-[#111111] text-white"
              : "border-[#cfcdd0] bg-white text-[#4d4b46] hover:border-[#111111] hover:text-[#111111]"
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

      <div className="p-5 sm:p-7">

        {summary ? (

          <div className="border border-[#dedcd5] bg-white">

            {/* Content label */}

            <div className="border-b border-[#e5e3dd] px-5 py-3 sm:px-6">

              <div className="flex items-center justify-between gap-4">

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77756e]">
                  Generated summary
                </span>

                <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-[#aaa79e] sm:block">
                  AI analysis
                </span>

              </div>

            </div>


            {/* Actual summary */}

            <div className="px-5 py-6 sm:px-7 sm:py-8">

              <p className="whitespace-pre-line text-[15px] leading-7 text-[#33322f] sm:text-base sm:leading-8">
                {summary}
              </p>

            </div>

          </div>

        ) : (

          <div className="border border-dashed border-[#cfcdd0] bg-white px-6 py-12 text-center">

            <div className="mx-auto flex h-10 w-10 items-center justify-center border border-[#d8d6cf] text-[#77756e]">

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

            <p className="mt-4 text-sm font-medium text-[#4d4b46]">
              No summary was generated.
            </p>

            <p className="mt-1 text-xs text-[#9a978f]">
              Upload and analyze a document to see the generated summary.
            </p>

          </div>

        )}

      </div>


      {/* =====================================================
          FOOTER METADATA
      ====================================================== */}

      {summary && (
        <div className="border-t border-[#d8d6cf] px-5 py-3 sm:px-7">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#aaa79e]">
              Structured document intelligence
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#aaa79e]">
              Unthinkable · 2026
            </span>

          </div>

        </div>
      )}

    </section>
  );
};

export default SummaryResult;