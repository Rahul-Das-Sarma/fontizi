import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import configurations
import { generalLimiter } from "./config/rateLimiter.js";
import { upload } from "./config/multer.js";

// Import services
import { FontIdentificationService } from "./services/fontIdentificationService.js";

// Import controllers
import { FontController } from "./controllers/fontController.js";
import { HealthController } from "./controllers/healthController.js";

// Import routes
import { createFontRoutes } from "./routes/fontRoutes.js";
import { createHealthRoutes } from "./routes/healthRoutes.js";

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// File path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server configuration
const app = express();
const PORT = process.env.PORT || 3001;

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================

// Apply general rate limiting to all routes
app.use(generalLimiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());

// ============================================================================
// SERVICE INITIALIZATION
// ============================================================================

// Initialize font identification service
const fontService = new FontIdentificationService(process.env.HF_API_TOKEN);

// ============================================================================
// CONTROLLER INITIALIZATION
// ============================================================================

// Initialize controllers with dependency injection
const fontController = new FontController(fontService);
const healthController = new HealthController();

// ============================================================================
// ROUTE SETUP
// ============================================================================

// Health routes
app.use("/", createHealthRoutes(healthController));

// Font routes
app.use("/api", createFontRoutes(fontController));

// ============================================================================
// ERROR HANDLING
// ============================================================================

// Global error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", healthController.handleNotFound.bind(healthController));

// ============================================================================
// SERVER STARTUP
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Fontizi Backend server running on port ${PORT}`);
  console.log(`📁 Upload directory: ${path.join(__dirname, "uploads")}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API base URL: http://localhost:${PORT}`);
  console.log(
    `📊 Rate limiting: 100 req/15min (general), 20 req/15min (font identification)`
  );
});

export default app;
