import express from "express";
import { HealthController } from "../controllers/healthController.js";

// ============================================================================
// HEALTH ROUTES
// ============================================================================

/**
 * Create health routes with dependency injection
 * @param {HealthController} healthController - Health controller instance
 * @returns {express.Router} - Express router with health routes
 */
export function createHealthRoutes(healthController) {
  const router = express.Router();

  // Root endpoint
  router.get("/", healthController.handleRoot.bind(healthController));

  // Health check endpoint
  router.get("/health", healthController.handleHealth.bind(healthController));

  return router;
}
