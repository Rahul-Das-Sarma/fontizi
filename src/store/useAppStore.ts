import { create } from "zustand";

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
}

interface AppState {
  screenshots: Screenshot[];
  isLoading: boolean;
  error: string | null;
  currentCropImage: Screenshot | null;

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
}

export const useAppStore = create<AppState>((set, get) => ({
  screenshots: [],
  isLoading: false,
  error: null,
  currentCropImage: null,

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
}));
