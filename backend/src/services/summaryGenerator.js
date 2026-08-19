import { GoogleGenAI } from "@google/genai";
import environment from "../config/environment.js";

const PRIMARY_MODEL = "gemini-3.5-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

const getLengthInstructions = (length) => {
  switch (length) {
    case "short":
      return `
- Summary: 2-4 sentences
- Key points: exactly 3
- Main ideas: 1-3
- Improvement suggestions: only when genuinely necessary
`;

    case "long":
      return `
- Summary: detailed and well-structured
- Key points: 8-10
- Main ideas: 3-6
- Improvement suggestions: only when genuinely necessary
`;

    case "medium":
    default:
      return `
- Summary: 1-3 paragraphs
- Key points: exactly 5
- Main ideas: 2-4
- Improvement suggestions: only when genuinely necessary
`;
  }
};

const buildPrompt = (text, length, isImage) => `
You are an expert document understanding and visual analysis assistant.

Analyze the supplied document accurately and produce useful,
grounded information.

${
  isImage
    ? `
IMAGE ANALYSIS REQUIREMENTS:

Analyze the original image itself, not just OCR text.

The image is the primary source of truth.

Identify when relevant:
- Visible text
- Headings
- Objects
- People
- Actions
- Locations
- Tables
- Charts
- Diagrams
- Numbers
- Labels
- Layout
- Relationships between visual elements
- Important visual context
- Overall visual message

OCR may contain mistakes.

If OCR conflicts with what is visibly present in the image,
prefer the image.
`
    : `
TEXT DOCUMENT ANALYSIS:

Analyze the extracted document text and preserve its meaning,
structure, important facts, and context.
`
}

GENERAL RULES:

1. Use ONLY information supported by the document.
2. Never invent facts.
3. Clearly distinguish visible facts from interpretation.
4. Preserve important names, dates, numbers, decisions, and conclusions.
5. Do not repeat information unnecessarily.
6. Prefer specific information over generic observations.
7. If something cannot be determined, say so.
8. Do not mention that you are an AI.
9. Do not describe your reasoning process.
10. Do not make assumptions about information that is not visible or present.
11. For images, analyze the actual visual content, not only OCR.
12. For poor OCR, use the image to correct obvious OCR mistakes when possible.

SUMMARY LENGTH:

${getLengthInstructions(length)}

OUTPUT:

Return ONLY valid JSON using exactly this structure:

{
  "documentType": "string",
  "summary": "string",
  "keyPoints": ["string"],
  "mainIdeas": ["string"],
  "improvementSuggestions": ["string"]
}

DOCUMENT TYPE:

Identify the most appropriate type, such as:

- Article
- Assignment
- Technical document
- Report
- Photograph
- Poster
- Screenshot
- Diagram
- Chart
- Scanned document
- Form
- Presentation
- Other

SUMMARY:

Explain what the document is about and its most important information.

For visual documents, describe the important visual content,
context, and message.

KEY POINTS:

Include the most important factual observations.

For images, include important visual observations when relevant.

MAIN IDEAS:

Explain the central concepts, purpose, message, or meaning.

IMPROVEMENT SUGGESTIONS:

Only provide suggestions when there is a specific,
observable improvement supported by the document.

Possible issues include:

- Poor image quality
- Unreadable text
- Low contrast
- Missing structure
- Incomplete information
- Formatting problems
- OCR problems
- Cropping problems
- Important content being obscured

Do NOT invent problems.

If the document is clear and well-presented:

"improvementSuggestions": []

For photographs, artwork, posters, or other visual content,
do not suggest artistic changes unless they affect:

- readability
- clarity
- usability
- accessibility
- document quality

OCR / EXTRACTED TEXT:

${text || "No reliable OCR text was extracted."}
`;

const convertBufferToBase64 = (buffer) => {
  return buffer.toString("base64");
};

const isTemporaryApiError = (error) => {
  const status = error?.status;

  return (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
};

const generateWithModel = async ({
  ai,
  model,
  contents,
}) => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    if (!response?.text) {
      const error = new Error(
        "Gemini returned an empty response."
      );

      error.statusCode = 502;
      throw error;
    }

    try {
      return JSON.parse(response.text);
    } catch (parseError) {
      console.error(
        "Invalid JSON returned by Gemini:",
        response.text
      );

      const error = new Error(
        "The AI returned an invalid response format."
      );

      error.statusCode = 502;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const validateResult = (result) => {
  if (!result || typeof result !== "object") {
    const error = new Error(
      "The AI returned an invalid document analysis."
    );

    error.statusCode = 502;
    throw error;
  }

  return {
    documentType:
      typeof result.documentType === "string" &&
      result.documentType.trim()
        ? result.documentType.trim()
        : "Unknown",

    summary:
      typeof result.summary === "string"
        ? result.summary.trim()
        : "",

    keyPoints: Array.isArray(result.keyPoints)
      ? result.keyPoints.filter(
          (point) =>
            typeof point === "string" &&
            point.trim()
        )
      : [],

    mainIdeas: Array.isArray(result.mainIdeas)
      ? result.mainIdeas.filter(
          (idea) =>
            typeof idea === "string" &&
            idea.trim()
        )
      : [],

    improvementSuggestions: Array.isArray(
      result.improvementSuggestions
    )
      ? result.improvementSuggestions.filter(
          (suggestion) =>
            typeof suggestion === "string" &&
            suggestion.trim()
        )
      : [],
  };
};

export const generateSummary = async ({
  text = "",
  length = "medium",
  imageBuffer = null,
  imageMimeType = null,
}) => {
  /*
   * ---------------------------------------------------------
   * 1. Validate Gemini API configuration
   * ---------------------------------------------------------
   */

  if (!environment.geminiApiKey) {
    const error = new Error(
      "Gemini API key is not configured."
    );

    error.statusCode = 500;

    throw error;
  }

  /*
   * ---------------------------------------------------------
   * 2. Validate document content
   * ---------------------------------------------------------
   */

  if (!text?.trim() && !imageBuffer) {
    const error = new Error(
      "No document content is available."
    );

    error.statusCode = 422;

    throw error;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: environment.geminiApiKey,
    });

    const isImage = Boolean(imageBuffer);

    /*
     * -------------------------------------------------------
     * 3. Build Gemini input
     * -------------------------------------------------------
     */

    const contents = [];

    if (imageBuffer) {
      if (!imageMimeType) {
        const error = new Error(
          "Image MIME type is missing."
        );

        error.statusCode = 400;

        throw error;
      }

      contents.push({
        inlineData: {
          mimeType: imageMimeType,
          data: convertBufferToBase64(imageBuffer),
        },
      });
    }

    contents.push({
      text: buildPrompt(
        text,
        length,
        isImage
      ),
    });

    /*
     * -------------------------------------------------------
     * 4. Try primary model
     * -------------------------------------------------------
     */

    let result;

    try {
      console.log(
        `Using Gemini model: ${PRIMARY_MODEL}`
      );

      result = await generateWithModel({
        ai,
        model: PRIMARY_MODEL,
        contents,
      });
    } catch (primaryError) {
      console.error(
        `${PRIMARY_MODEL} failed:`,
        primaryError?.message || primaryError
      );

      /*
       * Only use fallback for temporary service problems.
       *
       * Do NOT fallback for:
       * - invalid API key
       * - invalid request
       * - invalid image
       * - malformed input
       * - other permanent errors
       */

      if (!isTemporaryApiError(primaryError)) {
        throw primaryError;
      }

      /*
       * -----------------------------------------------------
       * 5. Try fallback model
       * -----------------------------------------------------
       */

      console.log(
        `Trying fallback model: ${FALLBACK_MODEL}`
      );

      try {
        result = await generateWithModel({
          ai,
          model: FALLBACK_MODEL,
          contents,
        });
      } catch (fallbackError) {
        console.error(
          `${FALLBACK_MODEL} failed:`,
          fallbackError?.message || fallbackError
        );

        /*
         * Both models failed.
         */
        const error = new Error(
          "The AI service is temporarily unavailable. Please try again in a moment."
        );

        error.statusCode = 503;

        throw error;
      }
    }

    /*
     * -------------------------------------------------------
     * 6. Validate and normalize AI response
     * -------------------------------------------------------
     */

    return validateResult(result);
  } catch (error) {
    console.error(
      "Document summary generation error:",
      error
    );

    /*
     * Preserve intentional application errors.
     */
    if (error.statusCode) {
      throw error;
    }

    /*
     * Handle Gemini API errors.
     */
    const status = error?.status;

    if (status === 401 || status === 403) {
      const aiError = new Error(
        "Gemini API authentication failed. Please check the API key."
      );

      aiError.statusCode = 500;

      throw aiError;
    }

    if (status === 400) {
      const aiError = new Error(
        "The document could not be processed by the AI service."
      );

      aiError.statusCode = 422;

      throw aiError;
    }

    if (
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    ) {
      const aiError = new Error(
        "The AI service is temporarily unavailable. Please try again in a moment."
      );

      aiError.statusCode = 503;

      throw aiError;
    }

    /*
     * Generic unexpected error.
     */
    const aiError = new Error(
      "Failed to generate document summary."
    );

    aiError.statusCode = 502;

    throw aiError;
  }
};