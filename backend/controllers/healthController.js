// ============================================================================
// HEALTH CONTROLLER
// ============================================================================

/**
 * Health controller for handling health check and general routes
 */
export class HealthController {
  /**
   * Handle root endpoint
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  handleRoot(req, res) {
    res.json({
      message: "Fontizi Backend API",
      status: "running",
      version: "1.0.0",
      endpoints: {
        health: "/health",
        identifyFont: "/api/identify-font",
      },
    });
  }

  /**
   * Handle health check endpoint
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  handleHealth(req, res) {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }

  /**
   * Handle 404 errors
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  handleNotFound(req, res) {
    res.status(404).json({
      error: "Endpoint not found",
      availableEndpoints: ["/", "/health", "/api/identify-font"],
    });
  }
}
