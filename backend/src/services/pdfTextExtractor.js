import pdfParse from "pdf-parse";

const MINIMUM_TEXT_LENGTH = 20;

export const extractTextFromPdf = async (buffer) => {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    const error = new Error("Invalid PDF data.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const result = await pdfParse(buffer);

    const text = result.text?.trim() || "";
    const pages = result.numpages || 0;

    if (text.length >= MINIMUM_TEXT_LENGTH) {
      return {
        text,
        source: "pdf-text",
        pages,
        requiresOcr: false,
      };
    }

    return {
      text: "",
      source: "scanned-pdf",
      pages,
      requiresOcr: true,
    };
  } catch (error) {
    console.error("PDF extraction error:", error);

    const pdfError = new Error(
      "Failed to extract text from the PDF."
    );

    pdfError.statusCode = 422;

    throw pdfError;
  }
};