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

  return (
    <div>
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
              openFilePicker();
            }
          }}
          className={`group cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-200 sm:p-10 ${
            isDragging
              ? "border-gray-900 bg-gray-100"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
          }`}
        >
          <div className="mx-auto max-w-lg">
            {/* Upload Icon */}
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-2xl transition-all duration-200 ${
                isDragging
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 group-hover:-translate-y-1 group-hover:shadow-md"
              }`}
            >
              {isDragging ? "↓" : "↑"}
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-lg font-semibold text-gray-900 sm:text-xl">
              {isDragging
                ? "Drop your file here"
                : "Upload your document"}
            </h2>

            {/* Description */}
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Drag and drop your PDF or image here, or choose a file from
              your device.
            </p>

            {/* Browse Button */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openFilePicker();
              }}
              className="mt-6 w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98] sm:w-auto"
            >
              Browse Files
            </button>

            {/* Hidden Input */}
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
              onChange={handleInputChange}
              className="hidden"
            />

            {/* Supported Files */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                PDF
              </span>

              <span className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                PNG
              </span>

              <span className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                JPG
              </span>

              <span className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                JPEG
              </span>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Maximum file size: 10 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* File Information */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {isImage && previewUrl ? (
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white sm:h-20 sm:w-20">
                  <img
                    src={previewUrl}
                    alt="Selected document preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-2xl sm:h-20 sm:w-20 sm:text-3xl">
                  {isPdf ? "📄" : "📎"}
                </div>
              )}

              <div className="min-w-0">
                <p className="break-all text-sm font-semibold text-gray-900">
                  {selectedFile.name}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span>
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>

                  <span>•</span>

                  <span>
                    {isPdf ? "PDF" : isImage ? "Image" : "Document"}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  {isImage
                    ? "Image will be analyzed using Vision + AI"
                    : "PDF text will be extracted and analyzed with AI"}
                </p>
              </div>
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="w-full shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:scale-[0.98] sm:w-auto"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Validation Error */}
      {error && (
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
            !
          </span>

          <p className="text-sm leading-5 text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

