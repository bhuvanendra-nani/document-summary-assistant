const ProcessingStatus = ({ status, isImage = false }) => {
  if (!status) {
    return null;
  }

  const steps = isImage
    ? [
        {
          key: "uploading",
          label: "Image uploaded",
        },
        {
          key: "extracting",
          label: "Reading visual content",
        },
        {
          key: "summarizing",
          label: "Analyzing with Vision AI",
        },
        {
          key: "completed",
          label: "Analysis completed",
        },
      ]
    : [
        {
          key: "uploading",
          label: "Document uploaded",
        },
        {
          key: "extracting",
          label: "Extracting document text",
        },
        {
          key: "summarizing",
          label: "Analyzing with AI",
        },
        {
          key: "completed",
          label: "Analysis completed",
        },
      ];

  const currentIndex = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {status === "completed"
                ? "Analysis completed"
                : "Processing document"}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              {status === "completed"
                ? "Your summary is ready."
                : "Please wait while we process your file."}
            </p>
          </div>

          {status !== "completed" && (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
              Step {currentIndex + 1} of {steps.length}
            </span>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key}>
              <div className="flex items-center gap-3">
                {/* Circle */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                    isCompleted
                      ? "bg-black text-white"
                      : isCurrent
                        ? "bg-black text-white ring-4 ring-gray-200"
                        : "bg-white text-gray-400 ring-1 ring-gray-200"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                {/* Label */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm transition ${
                      isCurrent
                        ? "font-semibold text-gray-900"
                        : isCompleted
                          ? "font-medium text-gray-700"
                          : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>

                  {isCurrent && status !== "completed" && (
                    <p className="mt-0.5 text-xs text-gray-400">
                      Processing...
                    </p>
                  )}
                </div>

                {/* Current Indicator */}
                {isCurrent && status !== "completed" && (
                  <div className="flex shrink-0 items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-900" />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-900"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-900"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                )}
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="ml-[18px] h-7 border-l-2 border-gray-200">
                  <div
                    className={`h-full border-l-2 transition-all duration-500 ${
                      index < currentIndex
                        ? "border-gray-900"
                        : "border-transparent"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingStatus;