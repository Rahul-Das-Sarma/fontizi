export interface FontIdentificationResult {
  success: boolean;
  fontName: string;
  confidence: number;
  fontDownloadUrl?: string;
  allPredictions: Array<{
    label: string;
    score: number;
  }>;
}

export interface FontIdentificationError {
  error: string;
  message?: string;
}

const API_BASE_URL = "http://localhost:3001";

export const identifyFont = async (
  imageFile: File
): Promise<FontIdentificationResult> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${API_BASE_URL}/api/identify-font`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData: FontIdentificationError = await response.json();
      throw new Error(
        errorData.message || errorData.error || "Font identification failed"
      );
    }

    const data: FontIdentificationResult = await response.json();
    return data;
  } catch (error) {
    console.error("Font identification failed:", error);
    throw error;
  }
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};
