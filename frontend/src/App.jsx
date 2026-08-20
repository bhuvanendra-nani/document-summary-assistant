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
      setError("Choose a document before starting the analysis.");
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
        err?.message || "Unable to analyze this document. Please try again."
      );
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
    setError("");
    setStatus("");
  };

  const isProcessing =
    status === "uploading" ||
    status === "extracting" ||
    status === "summarizing";

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

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-gray-950">

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="border-b border-gray-200 bg-[#f7f7f4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">

          <div className="text-sm font-bold tracking-[0.18em]">
            UNTHINKABLE
          </div>

          <div className="hidden items-center gap-8 text-xs font-medium text-gray-500 sm:flex">
            <a
              href="#workspace"
              className="transition hover:text-gray-950"
            >
              Workspace
            </a>

            <a
              href="#capabilities"
              className="transition hover:text-gray-950"
            >
              About
            </a>

            <span>2026</span>
          </div>

          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:hidden">
            Document Intelligence
          </div>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">

            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Document Intelligence
              </p>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                Understand documents faster.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                Extract what matters. Turn documents into structured
                intelligence with clear summaries, key information,
                and actionable insights.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-gray-300 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Built for
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Unthinkable Solutions
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Purpose
                </p>

                <p className="mt-2 text-sm leading-5 text-gray-500">
                  A focused workspace for turning unstructured
                  documents into useful information.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WORKSPACE
      ====================================================== */}

      <section
        id="workspace"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >

        <div className="mb-10 flex items-start gap-5">
          <span className="pt-1 text-[10px] font-semibold tracking-[0.16em] text-gray-400">
            01 /
          </span>

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
              Analyze a document
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Upload a document and choose how deeply you want
              the content analyzed.
            </p>
          </div>
        </div>

        <div className="border-y border-gray-200 py-8">

          <FileUpload
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />

        </div>

        <div className="border-b border-gray-200 py-8">

          <SummaryLengthSelector
            selectedLength={summaryLength}
            onLengthChange={setSummaryLength}
          />

        </div>

        {/* Processing */}
        <ProcessingStatus
          status={status}
          isImage={selectedFile?.type?.startsWith("image/")}
        />

        {/* Error */}
        {error && (
          <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* =================================================
            ACTION AREA
        ================================================== */}

        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
              {selectedFile
                ? "Document ready"
                : "Ready when you are"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {selectedFile
                ? `${selectedFile.name} · ${formatFileSize(
                    selectedFile.size
                  )}`
                : "Choose a document to begin."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={!selectedFile || isProcessing}
            className="group flex w-full items-center justify-center gap-4 bg-gray-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto"
          >
            {isProcessing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-white" />
                Analyzing
              </>
            ) : (
              <>
                Analyze document

                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>

        </div>

      </section>

      {/* =====================================================
          RESULTS
      ====================================================== */}

      {result && selectedFile && (
        <section className="border-t border-gray-200 bg-white">

          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

            <div className="mb-10 flex items-start gap-5">
              <span className="pt-1 text-[10px] font-semibold tracking-[0.16em] text-gray-400">
                02 /
              </span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Analysis complete
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                  Document intelligence
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                  Structured information extracted from your document.
                </p>
              </div>
            </div>

            {/* Document information */}

            <section className="mb-6 border-y border-gray-200">

              <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">

                <div className="border-b border-gray-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    File
                  </p>

                  <p className="mt-2 break-all text-sm font-medium">
                    {selectedFile.name}
                  </p>
                </div>

                <div className="border-b border-gray-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Type
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {getFileType(selectedFile)}
                  </p>
                </div>

                <div className="border-b border-gray-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Size
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

                <div className="border-b border-gray-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Document
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {result.documentType || "Unknown"}
                  </p>
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    Method
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {getAnalysisMethod(result)}
                  </p>
                </div>

              </div>

            </section>

            <div className="space-y-6">

              <SummaryResult summary={result.summary} />

              <KeyPoints points={result.keyPoints} />

              <MainIdeas ideas={result.mainIdeas} />

              <ImprovementSuggestions
                suggestions={result.improvementSuggestions}
              />

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          CAPABILITIES
      ====================================================== */}

      <section
        id="capabilities"
        className="border-t border-gray-200"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">

          <div className="mb-10 flex items-start gap-5">
            <span className="pt-1 text-[10px] font-semibold tracking-[0.16em] text-gray-400">
              03 /
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Capabilities
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                Analysis capabilities
              </h2>
            </div>
          </div>

          <div className="grid border-y border-gray-200 sm:grid-cols-2 lg:grid-cols-5">

            {[
              "PDF text extraction",
              "Vision analysis",
              "OCR processing",
              "AI summarization",
              "Structured insights",
            ].map((capability, index) => (
              <div
                key={capability}
                className="border-b border-gray-200 p-5 last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="text-[10px] font-semibold tracking-[0.14em] text-gray-400">
                  0{index + 1}
                </p>

                <p className="mt-8 text-sm font-medium text-gray-900">
                  {capability}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">

          <div className="text-sm font-bold tracking-[0.18em]">
            UNTHINKABLE
          </div>

          <p className="text-xs text-gray-400">
            Document Intelligence · Technical Assessment · 2026
          </p>

        </div>
      </footer>

    </main>
  );
};

export default App;