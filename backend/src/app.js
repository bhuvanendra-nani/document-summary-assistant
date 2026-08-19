import express from "express";
import cors from "cors";
import environment from "./config/environment.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: environment.clientUrl,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Document Summary Assistant API is running.",
  });
});

app.use("/api/summaries", summaryRoutes);

app.use(errorHandler);

export default app;