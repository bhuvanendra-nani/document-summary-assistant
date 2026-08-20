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
          className={`group relative cursor-pointer overflow-hidden border transition-all duration-200 ${
            isDragging
              ? "border-[#111111] bg-[#eeece6]"
              : "border-[#cfcdd0] bg-[#faf9f6] hover:border-[#77756e] hover:bg-[#f5f3ee]"
          }`}
        >

          {/* Top metadata */}

          <div className="flex items-center justify-between border-b border-[#d8d6cf] px-5 py-3 sm:px-7">

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77756e]">
              Document input
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#aaa79e]">
              10 MB max
            </span>

          </div>


          {/* Main upload area */}

          <div className="px-6 py-12 text-center sm:px-10 sm:py-16">

            {/* Minimal document icon */}

            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center border transition-all duration-200 ${
                isDragging
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#c9c7c0] bg-white text-[#33322f] group-hover:-translate-y-0.5 group-hover:border-[#77756e]"
              }`}
            >
              {isDragging ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16V4M12 4L7 9M12 4L17 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                  <path
                    d="M5 14V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
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
                    d="M10 13H16M10 17H16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </div>


            {/* Heading */}

            <h3 className="mt-7 text-xl font-semibold tracking-[-0.035em] text-[#111111] sm:text-2xl">
              {isDragging
                ? "Drop your document here"
                : "Choose a document"}
            </h3>


            {/* Description */}

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6c6a64]">
              {isDragging
                ? "Release the file to begin."
                : "Drag and drop your file here, or browse your device to select a document for analysis."}
            </p>


            {/* Browse */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openFilePicker();
              }}
              className="mt-7 inline-flex items-center gap-4 bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#2a2a2a] active:translate-y-px"
            >
              Choose document

              <span className="text-base">
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

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">

              {["PDF", "PNG", "JPG", "JPEG"].map((type) => (
                <span
                  key={type}
                  className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b8981]"
                >
                  {type}
                </span>
              ))}

            </div>

          </div>


          {/* Bottom helper line */}

          <div className="border-t border-[#d8d6cf] px-5 py-3 sm:px-7">

            <p className="text-center text-[10px] uppercase tracking-[0.14em] text-[#aaa79e]">
              PDF text extraction · OCR · Vision analysis
            </p>

          </div>

        </div>

      ) : (

        /* ===================================================
           SELECTED FILE STATE
        ================================================== */

        <div className="border border-[#cfcdd0] bg-[#faf9f6]">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-[#d8d6cf] px-5 py-3 sm:px-7">

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77756e]">
              Selected document
            </span>

            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5e6c59]">

              <span className="h-1.5 w-1.5 bg-[#5e6c59]" />

              Ready for analysis

            </span>

          </div>


          {/* File content */}

          <div className="p-5 sm:p-7">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              {/* File information */}

              <div className="flex min-w-0 items-center gap-5">

                {/* Preview */}

                {isImage && previewUrl ? (

                  <div className="h-20 w-20 shrink-0 overflow-hidden border border-[#d8d6cf] bg-white sm:h-24 sm:w-24">

                    <img
                      src={previewUrl}
                      alt="Selected document preview"
                      className="h-full w-full object-cover"
                    />

                  </div>

                ) : (

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-[#d8d6cf] bg-white sm:h-24 sm:w-24">

                    {isPdf ? (
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#33322f]"
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
                          d="M10 13H16M10 17H14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#33322f]"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="16"
                          height="16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="9"
                          cy="9"
                          r="1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5 17L10 12L13 15L15 13L19 17"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}

                  </div>
                )}


                {/* Details */}

                <div className="min-w-0">

                  <p className="break-all text-base font-semibold tracking-[-0.02em] text-[#111111]">
                    {selectedFile.name}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3">

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77756e]">
                      {fileType}
                    </span>

                    <span className="h-3 w-px bg-[#d0cec7]" />

                    <span className="text-xs text-[#77756e]">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>

                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#8b8981]">

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
                className="inline-flex shrink-0 items-center justify-center gap-3 border border-[#cfcdd0] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#4d4b46] transition-colors hover:border-[#111111] hover:text-[#111111]"
              >
                Remove

                <span className="text-base leading-none">
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
        <div className="mt-4 border border-[#d8b9b4] bg-[#f8ece9] px-5 py-4">

          <div className="flex items-start gap-3">

            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#9c5147] text-xs font-bold text-[#9c5147]">
              !
            </span>

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9c5147]">
                File error
              </p>

              <p className="mt-1 text-sm leading-6 text-[#713c36]">
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

