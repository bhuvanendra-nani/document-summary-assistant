const MAX_CHUNK_LENGTH = 12000;

export const cleanText = (text) => {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export const splitTextIntoChunks = (
  text,
  maxLength = MAX_CHUNK_LENGTH
) => {
  if (!text) {
    return [];
  }

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + maxLength, text.length);

    if (end < text.length) {
      const lastParagraph = text.lastIndexOf("\n\n", end);
      const lastSentence = text.lastIndexOf(". ", end);

      if (lastParagraph > start + maxLength * 0.5) {
        end = lastParagraph;
      } else if (lastSentence > start + maxLength * 0.5) {
        end = lastSentence + 1;
      }
    }

    chunks.push(text.slice(start, end).trim());
    start = end;
  }

  return chunks.filter(Boolean);
};

export const processText = (text) => {
  const cleanedText = cleanText(text);

  return {
    text: cleanedText,
    chunks: splitTextIntoChunks(cleanedText),
  };
}; 