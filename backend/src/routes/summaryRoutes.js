import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { generateSummary } from "../controllers/summaryController.js";

const router = express.Router();

router.post("/", upload.single("file"), generateSummary);

export default router;