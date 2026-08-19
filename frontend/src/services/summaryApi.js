const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const REQUEST_TIMEOUT = 120000;

export const generateDocumentSummary = async (file, length) => {
  if (!file) {
    throw new Error("Please select a document first.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("length", length);

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}/api/summaries`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(
        "The server returned an invalid response."
      );
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "Failed to generate document summary."
      );
    }

    if (!data?.success || !data?.data) {
      throw new Error(
        data?.message ||
          "The server returned an unexpected response."
      );
    }

    return data.data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "The request took too long. Please try again."
      );
    }

    if (
      error instanceof TypeError &&
      error.message === "Failed to fetch"
    ) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};