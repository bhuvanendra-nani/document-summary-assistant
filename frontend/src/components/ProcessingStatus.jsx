const ProcessingStatus = ({ status, isImage = false }) => {
  if (!status) {
    return null;
  }

  const steps = isImage
    ? [
        {
          key: "uploading",
          label: "Image uploaded",
          color: "blue",
          description: "File received successfully",
        },
        {
          key: "extracting",
          label: "Reading visual content",
          color: "violet",
          description: "Understanding image content",
        },
        {
          key: "summarizing",
          label: "Analyzing with Vision AI",
          color: "amber",
          description: "Generating intelligent insights",
        },
        {
          key: "completed",
          label: "Analysis completed",
          color: "emerald",
          description: "Your results are ready",
        },
      ]
    : [
        {
          key: "uploading",
          label: "Document uploaded",
          color: "blue",
          description: "File received successfully",
        },
        {
          key: "extracting",
          label: "Extracting document text",
          color: "violet",
          description: "Reading document content",
        },
        {
          key: "summarizing",
          label: "Analyzing with AI",
          color: "amber",
          description: "Generating intelligent insights",
        },
        {
          key: "completed",
          label: "Analysis completed",
          color: "emerald",
          description: "Your results are ready",
        },
      ];

  const currentIndex = steps.findIndex(
    (step) => step.key === status
  );

  const getColorClasses = (color, type) => {
    const colors = {
      blue: {
        active:
          "border-blue-500 bg-blue-500 text-white",
        activeDot:
          "bg-blue-500",
        activeText:
          "text-blue-700",
        activeLabel:
          "text-blue-600",
        completed:
          "bg-blue-100 text-blue-700",
        line:
          "border-blue-300",
      },

      violet: {
        active:
          "border-violet-500 bg-violet-500 text-white",
        activeDot:
          "bg-violet-500",
        activeText:
          "text-violet-700",
        activeLabel:
          "text-violet-600",
        completed:
          "bg-violet-100 text-violet-700",
        line:
          "border-violet-300",
      },

      amber: {
        active:
          "border-amber-500 bg-amber-500 text-white",
        activeDot:
          "bg-amber-500",
        activeText:
          "text-amber-700",
        activeLabel:
          "text-amber-600",
        completed:
          "bg-amber-100 text-amber-700",
        line:
          "border-amber-300",
      },

      emerald: {
        active:
          "border-emerald-500 bg-emerald-500 text-white",
        activeDot:
          "bg-emerald-500",
        activeText:
          "text-emerald-700",
        activeLabel:
          "text-emerald-600",
        completed:
          "bg-emerald-100 text-emerald-700",
        line:
          "border-emerald-300",
      },
    };

    return colors[color]?.[type] || "";
  };

  const currentStep = steps[currentIndex];

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-start justify-between gap-5 border-b border-slate-200 bg-slate-50/70 px-5 py-5 sm:px-7">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-3">

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Processing
            </span>

            {status !== "completed" && currentStep && (
              <span
                className={`h-2 w-2 animate-pulse rounded-full ${getColorClasses(
                  currentStep.color,
                  "activeDot"
                )}`}
              />
            )}

            {status === "completed" && (
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            )}

          </div>

          <h3 className="mt-2 text-base font-bold tracking-[-0.02em] text-slate-900 sm:text-lg">
            {status === "completed"
              ? "Analysis completed"
              : currentStep?.label || "Analyzing document"}
          </h3>

          <p className="mt-1 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm">
            {status === "completed"
              ? "Your document has been processed successfully."
              : currentStep?.description ||
                "The document is being processed. This may take a moment."}
          </p>

        </div>

        {/* Progress counter */}

        {status !== "completed" && (
          <div className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-right shadow-sm">

            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Step
            </p>

            <p className="mt-0.5 text-sm font-bold tracking-[-0.02em] text-slate-800">
              {String(currentIndex + 1).padStart(2, "0")}

              <span className="mx-1 text-slate-300">
                /
              </span>

              {String(steps.length).padStart(2, "0")}
            </p>

          </div>
        )}

      </div>

      {/* =====================================================
          PROCESSING STEPS
      ====================================================== */}

      <div className="px-5 py-6 sm:px-7 sm:py-7">

        <div>

          {steps.map((step, index) => {

            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isLast = index === steps.length - 1;

            const color = getColorClasses;

            return (
              <div key={step.key}>

                <div className="flex min-h-[58px] items-center gap-4">

                  {/* Step marker */}

                  <div className="flex w-6 shrink-0 justify-center">

                    {isCompleted ? (

                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${color(
                          step.color,
                          "completed"
                        )}`}
                      >
                        ✓
                      </span>

                    ) : isCurrent ? (

                      <span className="relative flex h-7 w-7 items-center justify-center">

                        <span
                          className={`absolute h-7 w-7 animate-ping rounded-full opacity-20 ${color(
                            step.color,
                            "activeDot"
                          )}`}
                        />

                        <span
                          className={`relative h-3 w-3 rounded-full ${color(
                            step.color,
                            "activeDot"
                          )}`}
                        />

                      </span>

                    ) : (

                      <span className="h-3 w-3 rounded-full border-2 border-slate-300 bg-white" />

                    )}

                  </div>

                  {/* Step content */}

                  <div className="min-w-0 flex-1">

                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isCurrent
                          ? `font-bold ${color(
                              step.color,
                              "activeText"
                            )}`
                          : isCompleted
                            ? "font-medium text-slate-600"
                            : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>

                    {isCurrent && status !== "completed" && (
                      <p
                        className={`mt-1 text-[11px] ${color(
                          step.color,
                          "activeLabel"
                        )}`}
                      >
                        Processing

                        <span className="ml-1 inline-flex">

                          <span className="animate-pulse">
                            .
                          </span>

                          <span
                            className="animate-pulse"
                            style={{
                              animationDelay: "150ms",
                            }}
                          >
                            .
                          </span>

                          <span
                            className="animate-pulse"
                            style={{
                              animationDelay: "300ms",
                            }}
                          >
                            .
                          </span>

                        </span>
                      </p>
                    )}

                    {isCompleted && (
                      <p className="mt-1 text-[11px] text-slate-400">
                        Complete
                      </p>
                    )}

                  </div>

                  {/* Status label */}

                  <div className="hidden shrink-0 sm:block">

                    {isCompleted && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${color(
                          step.color,
                          "completed"
                        )}`}
                      >
                        Done
                      </span>
                    )}

                    {isCurrent && status !== "completed" && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${color(
                          step.color,
                          "completed"
                        )}`}
                      >
                        Active
                      </span>
                    )}

                    {!isCompleted && !isCurrent && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Pending
                      </span>
                    )}

                  </div>

                </div>

                {/* Connecting line */}

                {!isLast && (
                  <div className="ml-[11px] h-5 border-l-2 border-slate-200">

                    {index < currentIndex && (
                      <div
                        className={`h-full border-l-2 ${color(
                          steps[index + 1].color,
                          "line"
                        )}`}
                      />
                    )}

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          COMPLETED STATE
      ====================================================== */}

      {status === "completed" && (
        <div className="flex flex-col gap-3 border-t border-emerald-100 bg-emerald-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">

          <div className="flex items-center gap-3">

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
              ✓
            </span>

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                Analysis ready
              </p>

              <p className="mt-0.5 text-[11px] text-emerald-600">
                Your document intelligence is ready to review.
              </p>

            </div>

          </div>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600 sm:block">
            Document intelligence
          </span>

        </div>
      )}

    </section>
  );
};

export default ProcessingStatus;