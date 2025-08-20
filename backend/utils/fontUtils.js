import { fontDatabase } from "../data/fontDatabase.js";
import fs from "fs";

// ============================================================================
// FONT UTILITY FUNCTIONS
// ============================================================================

/**
 * Get font download URL from font database
 * @param {string} fontLabel - The font label to search for
 * @returns {string|null} - The download URL or null if not found
 */
export function getFontDownloadUrl(fontLabel) {
  const normalizedLabel = fontLabel.toLowerCase().replace(/[^a-z0-9]/g, " ");
  const font = fontDatabase[normalizedLabel];
  return font ? font.downloadUrl : null;
}

/**
 * Generate mock font predictions for fallback
 * @param {string} imagePath - Path to the image file
 * @returns {Array} - Array of mock font predictions
 */
export function generateMockPredictions(imagePath) {
  const fileStats = fs.statSync(imagePath);
  const fileHash = fileStats.size + fileStats.mtime.getTime();

  const fontSets = [
    // Modern sans-serif set
    [
      { label: "Arial", score: 0.75 },
      { label: "Helvetica", score: 0.15 },
      { label: "Segoe UI", score: 0.05 },
      { label: "Roboto", score: 0.03 },
      { label: "Open Sans", score: 0.02 },
    ],
    // Serif set
    [
      { label: "Times New Roman", score: 0.8 },
      { label: "Georgia", score: 0.12 },
      { label: "Baskerville", score: 0.05 },
      { label: "Garamond", score: 0.02 },
      { label: "Palatino", score: 0.01 },
    ],
    // Display fonts set
    [
      { label: "Impact", score: 0.7 },
      { label: "Arial Black", score: 0.2 },
      { label: "Comic Sans MS", score: 0.05 },
      { label: "Verdana", score: 0.03 },
      { label: "Tahoma", score: 0.02 },
    ],
    // Script fonts set
    [
      { label: "Brush Script MT", score: 0.65 },
      { label: "Lucida Handwriting", score: 0.2 },
      { label: "Monotype Corsiva", score: 0.1 },
      { label: "Kunstler Script", score: 0.03 },
      { label: "Zapfino", score: 0.02 },
    ],
  ];

  const selectedSet = fontSets[fileHash % fontSets.length];

  return selectedSet
    .map((font) => ({
      ...font,
      score: font.score + (Math.random() * 0.1 - 0.05), // ±5% variation
    }))
    .sort((a, b) => b.score - a.score); // Sort by score
}
