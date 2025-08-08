import { create } from "zustand";
import type { FontIdentificationResult } from "../services/fontIdentification";
import { identifyFont as identifyFontService } from "../services/fontIdentification";

interface Screenshot {
  id: string;
  file: File;
  preview: string;
  uploadedAt: Date;
  croppedImage?: string;
  cropData?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fontResult?: FontIdentificationResult;
  isIdentifying?: boolean;
}

interface AppState {
  screenshots: Screenshot[];
  isLoading: boolean;
  error: string | null;
  currentCropImage: Screenshot | null;
  backendConnected: boolean;

  // Actions
  addScreenshot: (file: File) => void;
  removeScreenshot: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setCurrentCropImage: (screenshot: Screenshot | null) => void;
  updateScreenshotCrop: (
    id: string,
    croppedImage: string,
    cropData: { x: number; y: number; width: number; height: number }
  ) => void;
  identifyFont: (id: string) => Promise<void>;
  setBackendConnected: (connected: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  screenshots: [],
  isLoading: false,
  error: null,
  currentCropImage: null,
  backendConnected: false,

  addScreenshot: (file: File) => {
    const id = crypto.randomUUID();
    const preview = URL.createObjectURL(file);
    const screenshot: Screenshot = {
      id,
      file,
      preview,
      uploadedAt: new Date(),
    };

    set((state) => ({
      screenshots: [...state.screenshots, screenshot],
    }));
  },

  removeScreenshot: (id: string) => {
    set((state) => {
      const screenshot = state.screenshots.find((s) => s.id === id);
      if (screenshot) {
        URL.revokeObjectURL(screenshot.preview);
        if (screenshot.croppedImage) {
          URL.revokeObjectURL(screenshot.croppedImage);
        }
      }
      return {
        screenshots: state.screenshots.filter((s) => s.id !== id),
      };
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  setCurrentCropImage: (screenshot: Screenshot | null) => {
    set({ currentCropImage: screenshot });
  },

  updateScreenshotCrop: (
    id: string,
    croppedImage: string,
    cropData: { x: number; y: number; width: number; height: number }
  ) => {
    set((state) => ({
      screenshots: state.screenshots.map((s) =>
        s.id === id ? { ...s, croppedImage, cropData } : s
      ),
    }));
  },

  identifyFont: async (id: string) => {
    const state = get();
    const screenshot = state.screenshots.find((s) => s.id === id);

    if (!screenshot) {
      set({ error: "Screenshot not found" });
      return;
    }

    // Mark as identifying
    set((state) => ({
      screenshots: state.screenshots.map((s) =>
        s.id === id ? { ...s, isIdentifying: true } : s
      ),
    }));

    try {
      const result = await identifyFontService(screenshot.file);

      // Update with font result
      set((state) => ({
        screenshots: state.screenshots.map((s) =>
          s.id === id ? { ...s, fontResult: result, isIdentifying: false } : s
        ),
      }));
    } catch (error) {
      set((state) => ({
        screenshots: state.screenshots.map((s) =>
          s.id === id ? { ...s, isIdentifying: false } : s
        ),
        error:
          error instanceof Error ? error.message : "Font identification failed",
      }));
    }
  },

  setBackendConnected: (connected: boolean) => {
    set({ backendConnected: connected });
  },
}));
