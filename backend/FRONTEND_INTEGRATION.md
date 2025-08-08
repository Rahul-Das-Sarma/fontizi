# Frontend Integration Guide

This guide explains how to integrate your React frontend with the Fontizi backend.

## Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` and add your Hugging Face API token.

3. **Start the backend:**
   ```bash
   npm run dev
   ```

## Frontend Integration

### 1. Update your frontend to call the backend API

Add this function to your React component or service:

```javascript
const identifyFont = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch("http://localhost:3001/api/identify-font", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Font identification failed:", error);
    throw error;
  }
};
```

### 2. Usage in React component

```javascript
import { useState } from "react";

function FontIdentifier() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await identifyFont(file);
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={loading}
      />

      {loading && <p>Identifying font...</p>}

      {error && <p>Error: {error}</p>}

      {result && (
        <div>
          <h3>Font: {result.fontName}</h3>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          {result.fontDownloadUrl && (
            <a
              href={result.fontDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Font
            </a>
          )}
        </div>
      )}
    </div>
  );
}
```

### 3. CORS Configuration

The backend is configured to accept requests from `http://localhost:5173` (Vite dev server). If your frontend runs on a different port, update the `CORS_ORIGIN` in your backend `.env` file.

## API Response Format

```json
{
  "success": true,
  "fontName": "Arial",
  "confidence": 0.95,
  "fontDownloadUrl": "https://fonts.google.com/specimen/Arial",
  "allPredictions": [
    {
      "label": "Arial",
      "score": 0.95
    },
    {
      "label": "Helvetica",
      "score": 0.03
    }
  ]
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (no file, file too large, invalid file type)
- `500` - Server error (font identification failed)

## File Requirements

- **Supported formats:** JPEG, PNG, GIF, WebP, etc.
- **Maximum size:** 10MB
- **Field name:** `image`

## Development Tips

1. **Check backend health:** Visit `http://localhost:3001/health`
2. **Monitor logs:** Backend logs are detailed for debugging
3. **File cleanup:** Uploaded files are automatically deleted after processing
4. **Error messages:** Check browser console and backend logs for detailed errors

## Production Deployment

For production, consider:

1. **Environment variables:** Set proper CORS origins
2. **File storage:** Use cloud storage instead of local files
3. **Rate limiting:** Add rate limiting to prevent abuse
4. **Security:** Add authentication if needed
5. **Monitoring:** Add proper logging and monitoring
