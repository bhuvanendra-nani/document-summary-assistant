import { useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import SummaryLengthSelector from "./components/SummaryLengthSelector.jsx";
import ProcessingStatus from "./components/ProcessingStatus.jsx";
import SummaryResult from "./components/SummaryResult.jsx";
import KeyPoints from "./components/KeyPoints.jsx";
import MainIdeas from "./components/MainIdeas.jsx";
import ImprovementSuggestions from "./components/ImprovementSuggestions.jsx";
import { generateDocumentSummary } from "./services/summaryApi.js";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryLength, setSummaryLength] = useState("medium");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleGenerateSummary = async () => {
    if (!selectedFile) {
      setError("Please select a document first.");
      return;
    }

    setError("");
    setResult(null);

    setStatus("uploading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStatus("extracting");

      const summaryPromise = generateDocumentSummary(
        selectedFile,
        summaryLength
      );

      setStatus("summarizing");

      const summaryResult = await summaryPromise;

      setResult(summaryResult);
      setStatus("completed");
    } catch (err) {
      setStatus("");
      setError(
        err?.message || "Failed to generate document summary."
      );
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
    setError("");
    setStatus("");
  };

  const formatFileSize = (size) => {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileType = (file) => {
    if (file?.type === "application/pdf") {
      return "PDF";
    }

    if (file?.type?.startsWith("image/")) {
      return "Image";
    }

    return "Document";
  };

  const getAnalysisMethod = (result) => {
    if (!result) {
      return "AI Analysis";
    }

    if (result.source === "pdf-text") {
      return "PDF Text + AI";
    }

    if (result.source === "ocr") {
      return "OCR + AI";
    }

    if (result.source === "vision") {
      return "Vision + AI";
    }

    return "AI Analysis";
  };

  const isProcessing =
    status === "uploading" ||
    status === "extracting" ||
    status === "summarizing";

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <header className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl text-white shadow-sm">
            ✦
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Document Summary Assistant
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Upload a PDF or image and get a clear,
            AI-powered summary in seconds.
          </p>
        </header>

        {/* Upload / Controls */}
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:p-8">
          <div className="space-y-6">

            <FileUpload
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
            />

            <div className="border-t border-gray-100 pt-6">
              <SummaryLengthSelector
                selectedLength={summaryLength}
                onLengthChange={setSummaryLength}
              />
            </div>

            {/* Generate Button */}
            <div className="border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={handleGenerateSummary}
                disabled={!selectedFile || isProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
              >
                {isProcessing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-white" />
                    Analyzing document...
                  </>
                ) : (
                  <>
                    Generate Summary
                    <span className="text-base">→</span>
                  </>
                )}
              </button>

              {!selectedFile && !isProcessing && (
                <p className="mt-2 text-center text-xs text-gray-400">
                  Select a file to enable summary generation.
                </p>
              )}
            </div>

            {/* Processing */}
            <ProcessingStatus
              status={status}
              isImage={selectedFile?.type?.startsWith("image/")}
            />

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                  !
                </span>

                <p className="text-sm leading-5 text-red-600">
                  {error}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {result && selectedFile && (
          <section className="mt-8 space-y-6 sm:mt-10">

            {/* Results Header */}
            <div className="px-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Analysis Results
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                Your document insights
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                AI-generated information extracted from your document.
              </p>
            </div>

            {/* Document Information */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Document Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Details about the analyzed file.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      File
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Type
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {getFileType(selectedFile)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Size
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Document Type
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {result.documentType || "Unknown"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Analysis Method
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {getAnalysisMethod(result)}
                    </p>
                  </div>

                </div>
              </div>
            </section>

            <SummaryResult summary={result.summary} />

            <KeyPoints points={result.keyPoints} />

            <MainIdeas ideas={result.mainIdeas} />

            <ImprovementSuggestions
              suggestions={result.improvementSuggestions}
            />
          </section>
        )}

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-xs text-gray-400">
            Document Summary Assistant • Powered by AI
          </p>
        </footer>

      </div>
    </main>
  );
};

export default App;