import express from "express";
import { fontIdentificationLimiter } from "../config/rateLimiter.js";
import { upload } from "../config/multer.js";
import { FontController } from "../controllers/fontController.js";

// ============================================================================
// FONT ROUTES
// ============================================================================

/**
 * Create font routes with dependency injection
 * @param {FontController} fontController - Font controller instance
 * @returns {express.Router} - Express router with font routes
 */
export function createFontRoutes(fontController) {
  const router = express.Router();

  // Font identification endpoint
  router.post(
    "/identify-font",
    fontIdentificationLimiter,
    upload.single("image"),
    fontController.handleFontIdentification.bind(fontController)
  );

  // Font identification with base64 endpoint
  router.post(
    "/identify-font-base64",
    fontIdentificationLimiter,
    fontController.handleFontIdentificationBase64.bind(fontController)
  );

  return router;
}
