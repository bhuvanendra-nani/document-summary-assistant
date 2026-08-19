const ImprovementSuggestions = ({ suggestions = [] }) => {
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm text-white">
            →
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Improvement Suggestions
            </h2>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              Suggestions for improving or strengthening the document.
            </p>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="p-5 sm:p-6">
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion}-${index}`}
              className="group flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm"
            >
              {/* Number */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-gray-500 ring-1 ring-gray-200 transition group-hover:bg-gray-900 group-hover:text-white group-hover:ring-gray-900">
                {index + 1}
              </div>

              {/* Suggestion */}
              <p className="pt-0.5 text-sm leading-6 text-gray-700">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImprovementSuggestions;