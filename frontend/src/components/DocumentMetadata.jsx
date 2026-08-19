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

    return value || "Document Analysis";
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Document Information
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            File
          </p>

          <p className="mt-1 break-all text-sm text-gray-800">
            {filename}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Type
          </p>

          <p className="mt-1 text-sm text-gray-800">
            {formatFileType(fileType)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Size
          </p>

          <p className="mt-1 text-sm text-gray-800">
            {formatFileSize(fileSize)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Document Type
          </p>

          <p className="mt-1 text-sm text-gray-800">
            {documentType || "Unknown"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Analysis Method
          </p>

          <p className="mt-1 text-sm font-medium text-gray-800">
            {formatSource(source)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DocumentMetadata;