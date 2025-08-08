import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import FormData from "form-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "http://localhost:3001";

async function testHealthEndpoint() {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    console.log("✅ Health check:", data);
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
  }
}

async function testFontIdentification() {
  try {
    // Create a simple test image (1x1 pixel PNG)
    const testImagePath = path.join(__dirname, "test-image.png");

    // This is a minimal PNG file (1x1 transparent pixel)
    const pngData = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
      0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);

    fs.writeFileSync(testImagePath, pngData);

    const formData = new FormData();
    formData.append("image", fs.createReadStream(testImagePath), "test-image.png");

    const response = await fetch(`${BASE_URL}/api/identify-font`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("✅ Font identification test:", data);

    // Clean up test file
    fs.unlinkSync(testImagePath);
  } catch (error) {
    console.error("❌ Font identification test failed:", error.message);
  }
}

async function runTests() {
  console.log("🧪 Running backend tests...\n");

  await testHealthEndpoint();
  console.log("");

  await testFontIdentification();
  console.log("\n✅ Tests completed!");
}

runTests().catch(console.error);
