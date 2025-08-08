# 🔤 Fontizi

AI-powered font recognition application that helps you identify fonts from images using Hugging Face's Inference API.

## ✨ Features

- 🖼️ Image upload with drag & drop or click
- 👁️ Live preview of the last uploaded image, with upload history below
- ✂️ Optional crop before identification (better accuracy)
- 🧠 Font identification via Hugging Face models
- 📊 Confidence scores and multiple predictions
- 🔗 (Optional) Download links for identified fonts
- 🎨 Modern UI with Tailwind CSS, built with React + TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Hugging Face account + API token (free tier works)

### 1) Install dependencies

```bash
# In project root (frontend)
npm install

# Backend
cd backend
npm install
```

### 2) Configure backend environment

Create `backend/.env` from the example and add your token:

```env
# backend/.env
HF_API_TOKEN=your_huggingface_api_token_here
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

Get a token at: https://huggingface.co/settings/tokens

### 3) Run locally

```bash
# Terminal 1 (backend)
cd backend
npm run dev

# Terminal 2 (frontend)
cd ..
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 🏗️ Project Structure

```
fontizi/
├── src/
│   ├── components/
│   │   ├── ImagePreview.tsx       # Preview + identify button
│   │   ├── ScreenshotGallery.tsx  # Upload history
│   │   └── UploadButton.tsx
│   ├── pages/
│   │   └── LandingPage.tsx
│   ├── store/
│   │   └── useAppStore.ts         # Zustand store (identifyFont action)
│   └── services/                  # (If applicable for frontend utils)
│
└── backend/
    ├── server.js                  # Express server (HF Inference API calls)
    ├── package.json
    ├── README.md                  # Backend-only notes
    └── env.example                # Environment template
```

## 🌐 Backend API

- `GET /health` → Health check
- `POST /api/identify-font` → Multipart form-data with `image`

Example (curl):

```bash
curl -X POST "http://localhost:3001/api/identify-font" \
  -F "image=@your-image.png"
```

Example response:

```json
{
  "success": true,
  "fontName": "Arial",
  "confidence": 0.95,
  "allPredictions": [
    { "label": "Arial", "score": 0.95 },
    { "label": "Helvetica", "score": 0.03 }
  ]
}
```

## 🧩 Frontend Flow

1. Upload an image → preview appears
2. Optionally crop
3. Click "Identify Font" → calls backend
4. Results shown with confidence, plus history maintained below

## 🔒 Security

- Do NOT commit real tokens. Keep `backend/.env` out of git.
- Use `backend/env.example` for placeholders only.

## 🛠️ Scripts

Frontend (root):

```bash
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # lint
```

Backend (`backend/`):

```bash
npm run dev      # start backend in dev (nodemon, if configured)
npm start        # start backend in production
```

## 📝 License

MIT
