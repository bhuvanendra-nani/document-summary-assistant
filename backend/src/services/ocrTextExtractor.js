import Tesseract from "tesseract.js";

export const extractTextFromImage = async (buffer) => {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    const error = new Error("Invalid image data.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const result = await Tesseract.recognize(
      buffer,
      "eng",
      {
        logger: () => {},
      }
    );

    const text = result?.data?.text?.trim() || "";

    return {
      text,
      source: "ocr",
      pages: 1,
    };
  } catch (error) {
    console.error("OCR extraction error:", error);

    const ocrError = new Error(
      "Failed to extract text from the image."
    );

    ocrError.statusCode = 422;

    throw ocrError;
  }
};