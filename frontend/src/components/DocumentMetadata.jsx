const DocumentMetadata = ({
  filename,
  fileType,
  fileSize,
  documentType,
  source,
}) => {
  if (!filename) {
    return null;
  }

  const formatFileSize = (size) => {
    if (!size) {
      return "Unknown";
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatFileType = (type) => {
    if (type === "application/pdf") {
      return "PDF";
    }

    if (type?.startsWith("image/")) {
      return "Image";
    }

    return type || "Unknown";
  };

  const formatSource = (value) => {
    if (value === "image-vision-and-ocr") {
      return "Vision + OCR";
    }

    if (value === "pdf-text") {
      return "PDF Text Extraction";
    }

    if (value === "pdf-ocr") {
      return "PDF + OCR";
    }

    if (value === "vision") {
      return "Vision + AI";
    }

    if (value === "ocr") {
      return "OCR + AI";
    }

    return value || "Document Analysis";
  };

  return (
    <section className="overflow-hidden rounded-xl border border-sky-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-cyan-50 px-5 py-5 sm:px-7">

        <div className="flex items-center gap-3">

          {/* Icon */}

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-100 text-sky-600">

            <svg
              width="18"
              height="18"
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
              />

              <path
                d="M10 12H16M10 16H16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

          </span>

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">
              Document details
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.02em] text-gray-900">
              Document information
            </h2>

          </div>

        </div>

      </div>


      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <div className="grid gap-px bg-sky-100 sm:grid-cols-2 lg:grid-cols-5">

        {/* File */}

        <div className="bg-white p-5 lg:border-r lg:border-sky-100">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-500">
            File
          </p>

          <p className="mt-2 break-all text-sm font-semibold leading-6 text-gray-800">
            {filename}
          </p>

        </div>


        {/* Type */}

        <div className="bg-white p-5 lg:border-r lg:border-sky-100">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-500">
            Type
          </p>

          <div className="mt-2">

            <span className="inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
              {formatFileType(fileType)}
            </span>

          </div>

        </div>


        {/* Size */}

        <div className="bg-white p-5 lg:border-r lg:border-sky-100">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-500">
            Size
          </p>

          <p className="mt-2 text-sm font-semibold text-gray-800">
            {formatFileSize(fileSize)}
          </p>

        </div>


        {/* Document Type */}

        <div className="bg-white p-5 lg:border-r lg:border-sky-100">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-500">
            Document type
          </p>

          <p className="mt-2 text-sm font-semibold leading-6 text-gray-800">
            {documentType || "Unknown"}
          </p>

        </div>


        {/* Analysis Method */}

        <div className="bg-white p-5 sm:col-span-2 lg:col-span-1">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-500">
            Analysis method
          </p>

          <div className="mt-2">

            <span className="inline-flex rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
              {formatSource(source)}
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="flex items-center gap-2 border-t border-sky-100 bg-sky-50/60 px-5 py-3 sm:px-7">

        <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />

        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky-600">
          Source and processing metadata
        </p>

      </div>

    </section>
  );
};

export default DocumentMetadata;