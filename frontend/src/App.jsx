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
    <main className="min-h-screen bg-slate-50 text-slate-950">

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-10">

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
              U
            </div>

            <div className="text-sm font-bold tracking-[0.16em] text-slate-900">
              UNTHINKABLE
            </div>
          </div>

          <div className="hidden items-center gap-8 text-xs font-medium text-slate-500 sm:flex">
            <a
              href="#workspace"
              className="transition hover:text-blue-600"
            >
              Workspace
            </a>

            <a
              href="#capabilities"
              className="transition hover:text-blue-600"
            >
              About
            </a>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-500">
              2026
            </span>
          </div>

          <div className="rounded-full bg-blue-50 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-600 sm:hidden">
            AI Workspace
          </div>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">

            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                  Document Intelligence
                </p>
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">
                Understand documents faster.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Extract what matters. Turn documents into structured
                intelligence with clear summaries, key information,
                and actionable insights.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:border-l-4 lg:border-l-blue-500">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Built for
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Unthinkable Solutions
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Purpose
                </p>

                <p className="mt-2 text-sm leading-5 text-slate-500">
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
        className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:px-10"
      >

        <div className="mb-8 flex items-start gap-4 sm:mb-10 sm:gap-5">

          <span className="mt-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-100 px-2 text-[10px] font-bold tracking-[0.12em] text-blue-700">
            01
          </span>

          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-3xl">
              Analyze a document
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Upload a document and choose how deeply you want
              the content analyzed.
            </p>
          </div>

        </div>

        {/* Upload */}

        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">

          <div className="mb-4 flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              ↑
            </span>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Upload document
              </p>

              <p className="text-xs text-slate-500">
                PDF, PNG, JPG or JPEG
              </p>
            </div>

          </div>

          <FileUpload
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
          />

        </div>

        {/* Summary Length */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

          <div className="mb-4 flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              ≡
            </span>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Analysis depth
              </p>

              <p className="text-xs text-slate-500">
                Choose the level of detail you need
              </p>
            </div>

          </div>

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
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4">

            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
              !
            </span>

            <p className="text-sm leading-6 text-red-700">
              {error}
            </p>

          </div>
        )}

        {/* =================================================
            ACTION AREA
        ================================================== */}

        <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <span
                className={`h-2 w-2 rounded-full ${
                  selectedFile
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }`}
              />

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {selectedFile
                  ? "Document ready"
                  : "Ready when you are"}
              </p>

            </div>

            <p className="mt-2 break-all text-sm text-slate-500">
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
            className="group flex w-full shrink-0 items-center justify-center gap-4 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 sm:w-auto"
          >
            {isProcessing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-white" />
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
        <section className="border-t border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:px-10">

            <div className="mb-8 flex items-start gap-4 sm:mb-10 sm:gap-5">

              <span className="mt-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-emerald-100 px-2 text-[10px] font-bold tracking-[0.12em] text-emerald-700">
                02
              </span>

              <div>

                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Analysis complete
                </div>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                  Document intelligence
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Structured information extracted from your document.
                </p>

              </div>

            </div>

            {/* Document information */}

            <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

              <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">

                <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    File
                  </p>

                  <p className="mt-2 break-all text-sm font-medium text-slate-800">
                    {selectedFile.name}
                  </p>
                </div>

                <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Type
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {getFileType(selectedFile)}
                  </p>
                </div>

                <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Size
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

                <div className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Document
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {result.documentType || "Unknown"}
                  </p>
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Method
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {getAnalysisMethod(result)}
                  </p>
                </div>

              </div>

            </section>

            <div className="space-y-5 sm:space-y-6">

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
        className="border-t border-slate-200 bg-slate-50"
      >

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20 lg:px-10">

          <div className="mb-8 flex items-start gap-4 sm:mb-10 sm:gap-5">

            <span className="mt-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-violet-100 px-2 text-[10px] font-bold tracking-[0.12em] text-violet-700">
              03
            </span>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                Capabilities
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                Analysis capabilities
              </h2>

            </div>

          </div>

          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-5">

            {[
              {
                name: "PDF text extraction",
                color: "bg-blue-100 text-blue-700",
              },
              {
                name: "Vision analysis",
                color: "bg-violet-100 text-violet-700",
              },
              {
                name: "OCR processing",
                color: "bg-amber-100 text-amber-700",
              },
              {
                name: "AI summarization",
                color: "bg-emerald-100 text-emerald-700",
              },
              {
                name: "Structured insights",
                color: "bg-indigo-100 text-indigo-700",
              },
            ].map((capability, index) => (

              <div
                key={capability.name}
                className="border-b border-slate-200 p-5 last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-r lg:last:border-r-0"
              >

                <span
                  className={`inline-flex rounded-lg px-2 py-1 text-[10px] font-bold tracking-[0.12em] ${capability.color}`}
                >
                  0{index + 1}
                </span>

                <p className="mt-8 text-sm font-medium text-slate-900">
                  {capability.name}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">

          <div className="flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-[10px] font-bold text-white">
              U
            </span>

            <div className="text-sm font-bold tracking-[0.16em] text-slate-900">
              UNTHINKABLE
            </div>

          </div>

          <p className="text-xs text-slate-400">
            Document Intelligence · Technical Assessment · 2026
          </p>

        </div>

      </footer>

    </main>
  );
};

export default App;

