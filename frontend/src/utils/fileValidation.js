const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
];

export const validateFile = (file) => {
  if (!file) {
    return {
      valid: false,
      error: "Please select a file.",
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "The selected file is empty.",
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Only PDF, PNG, and JPG/JPEG files are supported.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File size must be 10 MB or smaller.",
    };
  }

  return {
    valid: true,
    error: "",
  };
};

export { MAX_FILE_SIZE, ALLOWED_FILE_TYPES };