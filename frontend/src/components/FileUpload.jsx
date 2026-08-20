
import { useEffect, useRef, useState } from "react";
import { validateFile } from "../utils/fileValidation.js";

const FileUpload = ({ selectedFile, onFileSelect }) => {
  const inputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!selectedFile || !selectedFile.type?.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const handleFile = (file) => {
    if (!file) return;

    const validationResult = validateFile(file);

    if (!validationResult.valid) {
      setError(validationResult.error || "Invalid file.");
      return;
    }

    setError("");
    onFileSelect(file);
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setError("");
    setPreviewUrl("");
    onFileSelect(null);
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const isImage = selectedFile?.type?.startsWith("image/");
  const isPdf = selectedFile?.type === "application/pdf";

  const fileType = isPdf
    ? "PDF"
    : isImage
      ? "IMAGE"
      : "DOCUMENT";

  return (
    <div>
      {/* =====================================================
          EMPTY / UPLOAD STATE
      ====================================================== */}

      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFilePicker}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openFilePicker();
            }
          }}
          className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
          }`}
        >
          {/* Top metadata */}

          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Document input
            </span>

            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 ring-1 ring-slate-200">
              10 MB max
            </span>
          </div>

          {/* Main upload area */}

          <div className="px-5 py-10 text-center sm:px-10 sm:py-14">
            {/* Upload icon */}

            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 ${
                isDragging
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-blue-100 text-blue-600 group-hover:-translate-y-1 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-100"
              }`}
            >
              {isDragging ? (
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16V4M12 4L7 9M12 4L17 9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M5 14V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="23"
                  height="23"
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
                    d="M10 13H16M10 17H16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            {/* Heading */}

            <h3 className="mt-6 text-xl font-bold tracking-[-0.03em] text-slate-900 sm:text-2xl">
              {isDragging
                ? "Drop your document here"
                : "Choose a document"}
            </h3>

            {/* Description */}

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              {isDragging
                ? "Release the file to begin."
                : "Drag and drop your file here, or browse your device to select a document for analysis."}
            </p>

            {/* Browse button */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openFilePicker();
              }}
              className="mt-7 inline-flex w-full items-center justify-center gap-4 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:translate-y-px sm:w-auto"
            >
              Choose document

              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Hidden input */}

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
              onChange={handleInputChange}
              className="hidden"
            />

            {/* File formats */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {["PDF", "PNG", "JPG", "JPEG"].map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 ring-1 ring-slate-200"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom helper line */}

          <div className="border-t border-slate-200 bg-white/60 px-4 py-3 sm:px-7">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
              PDF text extraction · OCR · Vision analysis
            </p>
          </div>
        </div>
      ) : (
        /* ===================================================
           SELECTED FILE STATE
        ================================================== */

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/70">
          {/* Header */}

          <div className="flex flex-col gap-2 border-b border-emerald-200 bg-white/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Selected document
            </span>

            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12.5L9.5 17L19 7.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              Ready for analysis
            </span>
          </div>

          {/* File content */}

          <div className="p-4 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* File information */}

              <div className="flex min-w-0 items-start gap-4 sm:items-center sm:gap-5">
                {/* Preview */}

                {isImage && previewUrl ? (
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm sm:h-24 sm:w-24">
                    <img
                      src={previewUrl}
                      alt="Selected document preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white text-blue-600 shadow-sm sm:h-24 sm:w-24">
                    {isPdf ? (
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 3H14L19 8V21H7V3Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M14 3V8H19"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M10 13H16M10 17H14"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="16"
                          height="16"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />

                        <circle
                          cx="9"
                          cy="9"
                          r="1.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />

                        <path
                          d="M5 17L10 12L13 15L15 13L19 17"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                )}

                {/* Details */}

                <div className="min-w-0 flex-1">
                  <p className="break-all text-sm font-bold tracking-[-0.015em] text-slate-900 sm:text-base">
                    {selectedFile.name}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
                      {fileType}
                    </span>

                    <span className="text-xs text-slate-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {isImage
                      ? "Image content will be processed using Vision analysis."
                      : "Text will be extracted from the PDF before analysis."}
                  </p>
                </div>
              </div>

              {/* Remove */}

              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:w-auto"
              >
                Remove

                <span className="text-lg leading-none">
                  ×
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          VALIDATION ERROR
      ====================================================== */}

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
              !
            </span>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
                File error
              </p>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

