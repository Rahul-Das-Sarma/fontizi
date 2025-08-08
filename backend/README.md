# Fontizi Backend

A Node.js backend server for font identification using Hugging Face's inference API.

## Features

- Image upload and processing
- Font identification using AI model
- CORS support for frontend integration
- File size validation and cleanup
- Error handling and logging

## Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file and add your Hugging Face API token:

   ```
   HF_API_TOKEN=your_huggingface_api_token_here
   PORT=3001
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Get Hugging Face API Token:**
   - Go to [Hugging Face](https://huggingface.co/settings/tokens)
   - Create a new token
   - Add it to your `.env` file

## Running the Server

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check

```
GET /health
```

Returns server status and timestamp.

### Font Identification

```
POST /api/identify-font
```

**Request:**

- Content-Type: `multipart/form-data`
- Body: `image` file (max 10MB)

**Response:**

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

## Error Responses

- `400` - No image file provided or file too large
- `500` - Font identification failed or internal server error

## File Upload

- Supported formats: All image types (JPEG, PNG, GIF, etc.)
- Maximum file size: 10MB
- Files are automatically cleaned up after processing

## Font Database

The backend includes a basic font database with download URLs. You can expand this by adding more fonts to the `fontDatabase` object in `server.js`.

## CORS Configuration

The server is configured to accept requests from `http://localhost:5173` (Vite dev server). Update the `CORS_ORIGIN` in your `.env` file if needed.

## Development

- Uses ES modules
- Includes error handling middleware
- Automatic file cleanup
- Detailed logging for debugging
