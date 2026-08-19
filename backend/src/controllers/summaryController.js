import { validateFile } from "../utils/fileValidation.js";
import { successResponse } from "../utils/responseFormatter.js";
import { extractTextFromPdf } from "../services/pdfTextExtractor.js";
import { extractTextFromScannedPdf } from "../services/scannedPdfProcessor.js";
import { processText } from "../services/textProcessor.js";
import {
  generateSummary as generateSummaryWithAI,
} from "../services/summaryGenerator.js";

const ALLOWED_SUMMARY_LENGTHS = [
  "short",
  "medium",
  "long",
];

export const generateSummary = async (req, res, next) => {
  try {
    /*
     * =====================================================
     * 1. VALIDATE FILE
     * =====================================================
     */

    validateFile(req.file);

    /*
     * =====================================================
     * 2. VALIDATE SUMMARY LENGTH
     * =====================================================
     */

    const summaryLength = req.body.length || "medium";

    if (!ALLOWED_SUMMARY_LENGTHS.includes(summaryLength)) {
      const error = new Error(
        "Summary length must be short, medium, or long."
      );

      error.statusCode = 400;
      throw error;
    }

    const isPdf =
      req.file.mimetype === "application/pdf";

    /*
     * =====================================================
     * 3. INITIALIZE EXTRACTION RESULT
     * =====================================================
     */

    let extractionResult = {
      text: "",
      source: isPdf ? "pdf-text" : "vision",
      pages: isPdf ? null : 1,
      requiresOcr: false,
    };

    let processedText = {
      text: "",
      chunks: [],
    };

    /*
     * =====================================================
     * 4. IMAGE PROCESSING
     * =====================================================
     *
     * Images are sent directly to Gemini Vision.
     *
     * Gemini analyzes:
     * - Objects
     * - People
     * - Layout
     * - Visible text
     * - Charts
     * - Posters
     * - Visual context
     *
     * OCR is NOT required before Vision.
     */

    if (!isPdf) {
      extractionResult = {
        text: "",
        source: "vision",
        pages: 1,
        requiresOcr: false,
      };
    }

    /*
     * =====================================================
     * 5. PDF PROCESSING
     * =====================================================
     */

    if (isPdf) {
      extractionResult = await extractTextFromPdf(
        req.file.buffer
      );

      /*
       * ---------------------------------------------------
       * Normal PDF
       * ---------------------------------------------------
       */

      if (!extractionResult.requiresOcr) {
        processedText = processText(
          extractionResult.text
        );

        if (!processedText.text) {
          const error = new Error(
            "No readable text was found in the PDF."
          );

          error.statusCode = 422;
          throw error;
        }

        extractionResult.source = "pdf-text";
      }

      /*
       * ---------------------------------------------------
       * Scanned PDF
       * ---------------------------------------------------
       */

      else {
        extractionResult =
          await extractTextFromScannedPdf(
            req.file.buffer,
            extractionResult.pages
          );

        processedText = processText(
          extractionResult.text
        );

        if (!processedText.text) {
          const error = new Error(
            "No readable text could be extracted from the scanned PDF."
          );

          error.statusCode = 422;
          throw error;
        }

        extractionResult.source = "ocr";
      }
    }

    /*
     * =====================================================
     * 6. GENERATE AI SUMMARY
     * =====================================================
     */

    const summary = await generateSummaryWithAI({
      text: processedText.text,
      length: summaryLength,

      /*
       * Images → Gemini Vision
       * PDFs → extracted text / OCR
       */

      imageBuffer: isPdf
        ? null
        : req.file.buffer,

      imageMimeType: isPdf
        ? null
        : req.file.mimetype,
    });

    /*
     * =====================================================
     * 7. RETURN RESPONSE
     * =====================================================
     */

    res.status(200).json(
      successResponse({
        filename: req.file.originalname,

        fileType: req.file.mimetype,

        source: extractionResult.source,

        pages:
  extractionResult.pages || null,

processedPages:
  extractionResult.processedPages || null,

        documentType:
          summary.documentType,

        summary:
          summary.summary,

        keyPoints:
          summary.keyPoints,

        mainIdeas:
          summary.mainIdeas,

        improvementSuggestions:
          summary.improvementSuggestions,

        extractedText:
          processedText.text,
      })
    );
  } catch (error) {
    next(error);
  }
};