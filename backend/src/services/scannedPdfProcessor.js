import { fromBuffer } from "pdf2pic";
import Tesseract from "tesseract.js";

const MAX_OCR_PAGES = 10;

export const extractTextFromScannedPdf = async (buffer, pages = 1) => {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    const error = new Error("Invalid PDF data.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const pageCount = Math.min(pages || 1, MAX_OCR_PAGES);

    const converter = fromBuffer(buffer, {
      density: 150,
      format: "png",
      width: 1600,
      height: 2200,
      savePath: "./tmp",
    });

    const extractedPages = [];

    for (let page = 1; page <= pageCount; page++) {
      try {
        const result = await converter(page, {
          responseType: "buffer",
        });

        if (!result?.buffer) {
          continue;
        }

        const ocrResult = await Tesseract.recognize(
          result.buffer,
          "eng",
          {
            logger: () => {},
          }
        );

        const text = ocrResult?.data?.text?.trim();

        if (text) {
          extractedPages.push(
            `--- Page ${page} ---\n${text}`
          );
        }
      } catch (pageError) {
        console.error(
          `OCR failed for PDF page ${page}:`,
          pageError.message
        );
      }
    }

    return {
  text: extractedPages.join("\n\n"),
  source: "ocr",
  pages,
  processedPages: pageCount,
};
  } catch (error) {
    console.error(
      "Scanned PDF processing error:",
      error
    );

    const processingError = new Error(
      "Failed to process the scanned PDF."
    );

    processingError.statusCode = 422;

    throw processingError;
  }
};