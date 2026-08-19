const MainIdeas = ({ ideas = [] }) => {
  if (!Array.isArray(ideas) || ideas.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm text-white">
            ✦
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Main Ideas
            </h2>

            <p className="mt-1 text-sm leading-5 text-gray-500">
              The central concepts, purpose, or message of the document.
            </p>
          </div>
        </div>
      </div>

      {/* Ideas */}
      <div className="p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {ideas.map((idea, index) => (
            <div
              key={`${index}-${idea}`}
              className="group rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:border-gray-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex gap-3">
                {/* Idea Marker */}
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-xs font-semibold text-gray-500 ring-1 ring-gray-200 transition group-hover:bg-gray-900 group-hover:text-white group-hover:ring-gray-900">
                  {index + 1}
                </div>

                {/* Idea */}
                <p className="text-sm leading-6 text-gray-700">
                  {idea}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainIdeas;