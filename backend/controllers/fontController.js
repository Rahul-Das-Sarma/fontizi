import fs from "fs";
import { getFontDownloadUrl } from "../utils/fontUtils.js";
import { FontIdentificationService } from "../services/fontIdentificationService.js";

// ============================================================================
// FONT CONTROLLER
// ============================================================================

/**
 * Font controller for handling font-related requests
 */
export class FontController {
  constructor(fontService) {
    this.fontService = fontService;
  }

  /**
   * Handle font identification request
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async handleFontIdentification(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      console.log("Processing image:", req.file.filename);
      console.log("File size:", req.file.size, "bytes");
      console.log("File mimetype:", req.file.mimetype);

      // Perform font identification
      const results = await this.fontService.predictFont(req.file.path);

      if (!results || results.length === 0) {
        return res.status(500).json({ error: "No font predictions returned" });
      }

      // Extract font name (label) with highest score
      const bestMatch = results[0];

      // Get font download URL
      const fontDownloadUrl = getFontDownloadUrl(bestMatch.label);

      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      res.json({
        success: true,
        fontName: bestMatch.label,
        confidence: bestMatch.score,
        fontDownloadUrl,
        allPredictions: results.slice(0, 5), // Return top 5 predictions
      });
    } catch (error) {
      console.error("Error in font identification:", error);

      // Clean up uploaded file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        error: "Font identification failed",
        message: error.message,
        details: error.stack,
      });
    }
  }

  /**
   * Handle font identification with base64 image
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async handleFontIdentificationBase64(req, res) {
    try {
      const { image, confidence_threshold } = req.body;

      if (!image) {
        return res.status(400).json({ error: "No base64 image provided" });
      }

      console.log("Processing base64 image");
      console.log("Confidence threshold:", confidence_threshold);

      // Convert base64 to buffer and save temporarily
      const buffer = Buffer.from(image, 'base64');
      const tempPath = `./uploads/temp_${Date.now()}.jpg`;
      
      fs.writeFileSync(tempPath, buffer);

      // Perform font identification
      const results = await this.fontService.predictFont(tempPath);

      if (!results || results.length === 0) {
        return res.status(500).json({ error: "No font predictions returned" });
      }

      // Extract font name (label) with highest score
      const bestMatch = results[0];

      // Get font download URL
      const fontDownloadUrl = getFontDownloadUrl(bestMatch.label);

      // Clean up temporary file
      fs.unlinkSync(tempPath);

      res.json({
        success: true,
        fontName: bestMatch.label,
        confidence: bestMatch.score,
        fontDownloadUrl,
        allPredictions: results.slice(0, 5), // Return top 5 predictions
      });
    } catch (error) {
      console.error("Error in base64 font identification:", error);

      // Clean up temporary file if it exists
      const tempPath = `./uploads/temp_${Date.now()}.jpg`;
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }

      res.status(500).json({
        error: "Base64 font identification failed",
        message: error.message,
        details: error.stack,
      });
    }
  }
}
