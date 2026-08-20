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
    <section className="border border-[#d3d1ca] bg-[#faf9f6]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-start justify-between gap-5 border-b border-[#d8d6cf] px-5 py-5 sm:px-7">

        <div className="min-w-0">

          <div className="flex items-center gap-3">

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77756e]">
              Processing
            </span>

            {status !== "completed" && (
              <span className="h-1.5 w-1.5 animate-pulse bg-[#111111]" />
            )}

            {status === "completed" && (
              <span className="h-1.5 w-1.5 bg-[#5e6c59]" />
            )}

          </div>

          <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-[#111111] sm:text-lg">
            {status === "completed"
              ? "Analysis completed"
              : "Analyzing document"}
          </h3>

          <p className="mt-1 max-w-lg text-xs leading-5 text-[#77756e] sm:text-sm">
            {status === "completed"
              ? "Your document has been processed successfully."
              : "The document is being processed. This may take a moment."}
          </p>

        </div>


        {/* Progress counter */}

        {status !== "completed" && (
          <div className="shrink-0 text-right">

            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#aaa79e]">
              Step
            </p>

            <p className="mt-0.5 text-sm font-semibold tracking-[-0.02em] text-[#33322f]">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="mx-1 text-[#c5c3bc]">/</span>
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

            return (
              <div key={step.key}>

                <div className="flex min-h-[52px] items-center gap-4">

                  {/* Step marker */}

                  <div className="flex w-5 shrink-0 justify-center">

                    {isCompleted ? (

                      <span className="flex h-5 w-5 items-center justify-center bg-[#111111] text-[10px] font-bold text-white">
                        ✓
                      </span>

                    ) : isCurrent ? (

                      <span className="relative flex h-5 w-5 items-center justify-center">

                        <span className="absolute h-5 w-5 animate-ping border border-[#aaa79e] opacity-40" />

                        <span className="h-2.5 w-2.5 bg-[#111111]" />

                      </span>

                    ) : (

                      <span className="h-2.5 w-2.5 border border-[#c5c3bc] bg-white" />

                    )}

                  </div>


                  {/* Step content */}

                  <div className="min-w-0 flex-1">

                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isCurrent
                          ? "font-semibold text-[#111111]"
                          : isCompleted
                            ? "font-medium text-[#4d4b46]"
                            : "text-[#aaa79e]"
                      }`}
                    >
                      {step.label}
                    </p>


                    {isCurrent && status !== "completed" && (
                      <p className="mt-1 text-[11px] text-[#96938b]">
                        Processing
                        <span className="ml-1 inline-flex">
                          <span className="animate-pulse">.</span>
                          <span
                            className="animate-pulse"
                            style={{ animationDelay: "150ms" }}
                          >
                            .
                          </span>
                          <span
                            className="animate-pulse"
                            style={{ animationDelay: "300ms" }}
                          >
                            .
                          </span>
                        </span>
                      </p>
                    )}

                    {isCompleted && (
                      <p className="mt-1 text-[11px] text-[#96938b]">
                        Complete
                      </p>
                    )}

                  </div>


                  {/* Status label */}

                  <div className="hidden shrink-0 sm:block">

                    {isCompleted && (
                      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#77756e]">
                        Done
                      </span>
                    )}

                    {isCurrent && status !== "completed" && (
                      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#111111]">
                        Active
                      </span>
                    )}

                    {!isCompleted && !isCurrent && (
                      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#c0beb7]">
                        Pending
                      </span>
                    )}

                  </div>

                </div>


                {/* Connecting line */}

                {!isLast && (
                  <div className="ml-[9px] h-5 border-l border-[#d8d6cf]">

                    {index < currentIndex && (
                      <div className="h-full border-l border-[#111111]" />
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
        <div className="flex items-center justify-between gap-4 border-t border-[#d8d6cf] bg-[#f3f1eb] px-5 py-3 sm:px-7">

          <div className="flex items-center gap-2">

            <span className="flex h-4 w-4 items-center justify-center bg-[#5e6c59] text-[8px] font-bold text-white">
              ✓
            </span>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5e6c59]">
              Analysis ready
            </p>

          </div>

          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-[#aaa79e] sm:block">
            Document intelligence
          </span>

        </div>
      )}

    </section>
  );
};

export default ProcessingStatus;