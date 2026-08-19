import dotenv from "dotenv";

dotenv.config();

const environment = {
  port: process.env.PORT || 5000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};

if (!environment.geminiApiKey) {
  console.warn("Warning: GEMINI_API_KEY is not configured.");
}

export default environment;