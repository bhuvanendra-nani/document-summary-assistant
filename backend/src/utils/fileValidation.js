const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const validateFile = (file) => {
  if (!file) {
    const error = new Error("No file was uploaded.");
    error.statusCode = 400;
    throw error;
  }

  if (file.size === 0) {
    const error = new Error("The uploaded file is empty.");
    error.statusCode = 400;
    throw error;
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    const error = new Error(
      "Unsupported file type. Please upload a PDF, PNG, JPG, or JPEG file."
    );
    error.statusCode = 400;
    throw error;
  }

  if (file.size > MAX_FILE_SIZE) {
    const error = new Error("File size must not exceed 10 MB.");
    error.statusCode = 400;
    throw error;
  }

  return true;
};