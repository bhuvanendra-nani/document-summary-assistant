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
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm text-white">
              ✦
            </span>

            <h2 className="text-lg font-semibold text-gray-900">
              Summary
            </h2>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Overview of your document.
          </p>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          disabled={!summary}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] sm:w-auto ${
            copied
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {copied ? "Copied ✓" : "Copy Summary"}
        </button>
      </div>

      {/* Summary Content */}
      <div className="p-5 sm:p-6">
        {summary ? (
          <div className="rounded-xl bg-gray-50 p-5 sm:p-6">
            <p className="whitespace-pre-line text-sm leading-7 text-gray-700 sm:text-[15px]">
              {summary}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-sm text-gray-500">
              No summary was generated.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SummaryResult;