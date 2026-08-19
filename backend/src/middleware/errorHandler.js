import multer from "multer";

export const errorHandler = (error, req, res, next) => {
  console.error(error);

  // Multer file upload errors
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        error: "File size must not exceed 10 MB.",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message || "File upload failed.",
    });
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: error.message || "Internal server error.",
  });
};