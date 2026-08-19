import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];

const fileFilter = (req, file, callback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    const error = new Error(
      "Unsupported file type. Please upload a PDF, PNG, JPG, or JPEG file."
    );

    error.statusCode = 400;
    callback(error, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter,
});

export default upload;