# 🔤 Fontizi

AI-powered font recognition application that identifies fonts from images using advanced machine learning models through Hugging Face's Inference API.

## ✨ Features

- 🖼️ **Smart Image Upload**: Drag & drop or click to upload images with text
- 👁️ **Live Preview**: Real-time preview of uploaded images with upload history
- ✂️ **Precision Cropping**: Crop specific text regions for enhanced accuracy
- 🧠 **AI Font Recognition**: Powered by Hugging Face's computer vision models
- 📊 **Confidence Scoring**: Multiple predictions with reliability scores
- 🔗 **Font Resources**: Direct links to download identified fonts
- 📱 **Responsive Design**: Seamless experience across all devices
- 🎨 **Modern Interface**: Beautiful UI built with React + TypeScript + Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ with pnpm (recommended) or npm
- **Hugging Face Account** (free tier available)

### Installation & Setup

1. **Clone and install dependencies**

   ```bash
   # Clone the repository
   git clone https://github.com/your-username/fontizi.git
   cd fontizi

      # Install frontend dependencies
   pnpm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

2. **Configure Hugging Face API**

   ```bash
   # Create backend environment file
   cp backend/env.example backend/.env
   ```

   Edit `backend/.env` and add your API token:

   ```env
   HF_API_TOKEN=your_huggingface_api_token_here
   PORT=3001
   CORS_ORIGIN=http://localhost:5173
   ```

   **Get your API token:**

   - Visit [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - Create a new token (read access is sufficient)
   - Copy and paste into your `.env` file

3. **Start development servers**

   ```bash
   # Terminal 1: Backend server
   cd backend
   npm run dev

   # Terminal 2: Frontend server
   pnpm run dev
   ```

4. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3001
   - **Health Check**: http://localhost:3001/health

## 🏗️ Architecture

```
fontizi/
├── 🌐 Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImagePreview.tsx       # Main image preview with analysis
│   │   │   ├── FontResult.tsx         # Font identification results
│   │   │   ├── ScreenshotGallery.tsx  # Upload history gallery
│   │   │   ├── UploadButton.tsx       # File upload interface
│   │   │   └── ImageCropper.tsx       # Text region cropping tool
│   │   ├── pages/
│   │   │   └── LandingPage.tsx        # Main application page
│   │   ├── store/
│   │   │   └── useAppStore.ts         # Zustand state management
│   │   └── services/
│   │       └── fontIdentification.ts # API communication
│   │
├── 🤖 Backend (Node.js + Express)
│   ├── server.js                      # Express API server
│   ├── package.json                   # Backend dependencies
│   ├── env.example                    # Environment template
│   └── README.md                      # Backend documentation
│
└── 📄 Configuration
    ├── tailwind.config.js             # Styling configuration
    ├── vite.config.ts                 # Build configuration
    └── package.json                   # Frontend dependencies
```

## 🌐 API Endpoints

### Backend REST API

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| `GET`  | `/health`            | Server health check            |
| `POST` | `/api/identify-font` | Font identification from image |

### Font Identification API

**Request:**

```bash
curl -X POST "http://localhost:3001/api/identify-font" \
  -F "image=@your-image.png"
```

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
      "score": 0.72
    },
    {
      "label": "Times New Roman",
      "score": 0.68
    }
  ]
}
```

## 🎯 User Experience

### Complete Workflow

1. **Upload Image** → Drag & drop or click to select image containing text
2. **Preview & History** → Latest image shown in preview area, previous uploads in gallery below
3. **Optional Cropping** → Select specific text regions for better accuracy
4. **Font Identification** → Click "Identify Font" to analyze with AI
5. **View Results** → See font predictions with confidence scores and download links
6. **Continue Working** → Upload more images, all maintained in history

### Key Features

- ✨ **Instant Preview**: See uploaded images immediately
- 🎯 **Smart Analysis**: AI processes text regions in images
- 📊 **Confidence Indicators**: Visual representation of prediction reliability
- 🔄 **Upload History**: Track all previously analyzed images
- 📱 **Mobile Friendly**: Fully responsive design
- ⚡ **Fast Processing**: Quick API responses via Hugging Face

## 🛠️ Development

### Tech Stack

**Frontend:**

- React 19 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Zustand for state management
- Lucide React for icons
- React Easy Crop for image cropping

**Backend:**

- Node.js with Express
- Multer for file upload handling
- CORS for cross-origin requests
- Hugging Face Inference API

### Development Scripts

**Frontend (root directory):**

```bash
pnpm run dev      # Start Vite development server
pnpm run build    # Build for production
pnpm run preview  # Preview production build
pnpm run lint     # Run ESLint
```

**Backend (backend/ directory):**

```bash
npm run dev      # Start development server with auto-reload
npm start        # Start production server
```

### Environment Configuration

**Frontend (.env - optional):**

```env
VITE_API_URL=http://localhost:3001
```

**Backend (backend/.env - required):**

```env
HF_API_TOKEN=your_huggingface_api_token_here
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

## 🔒 Security & Best Practices

### API Token Security

- ✅ Never commit real API tokens to version control
- ✅ Use `backend/env.example` for template with placeholders
- ✅ Keep `backend/.env` in `.gitignore`
- ✅ Rotate tokens if accidentally exposed

### File Upload Security

- Maximum file size: 10MB
- Supported formats: All image types (PNG, JPG, GIF, etc.)
- Automatic file cleanup after processing
- CORS protection enabled

## 🔍 Troubleshooting

### Common Issues

**Backend won't start:**

```bash
# Check if Hugging Face token is set
cat backend/.env

# Verify dependencies are installed
cd backend && npm install
```

**CORS errors:**

```bash
# Ensure CORS_ORIGIN matches your frontend URL
# Default should be: http://localhost:5173
```

**Font identification fails:**

```bash
# Verify API token is valid and has read permissions
# Check network connectivity
# Ensure image contains clear, readable text
```

**File upload errors:**

```bash
# Check file size (max 10MB)
# Verify file is a valid image format
# Ensure backend server is running
```

### Performance Tips

- **Image Quality**: Higher resolution images with clear text work best
- **Text Cropping**: Crop to specific text regions for better accuracy
- **File Size**: Smaller files process faster while maintaining quality
- **Network**: Stable internet connection required for API calls

## 🚀 Deployment

### Production Build

```bash
# Build frontend
pnpm run build

# Start backend in production
cd backend
npm start
```

### Environment Variables

Set these in your production environment:

```env
# Backend
HF_API_TOKEN=your_production_token
PORT=3001
CORS_ORIGIN=https://your-domain.com

# Frontend (build time)
VITE_API_URL=https://your-api-domain.com
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clear, descriptive commit messages
- Test with various image types and sizes
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hugging Face** for providing powerful AI model access
- **React** and **Node.js** communities for excellent frameworks
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful, consistent icons
- **Vite** for blazing fast development experience

## 📞 Support

Need help? Here's how to get support:

1. **Check Documentation**: Review this README and backend documentation
2. **Common Issues**: See the troubleshooting section above
3. **API Token**: Verify your Hugging Face token is valid
4. **Network**: Ensure both frontend and backend servers are running
5. **Issues**: Create a GitHub issue with detailed information

### Quick Diagnostic

```bash
# Check if services are running
curl http://localhost:3001/health    # Backend health
curl http://localhost:5173           # Frontend (should return HTML)

# Verify environment
echo $HF_API_TOKEN                   # Should show your token
```

---

**Built with ❤️ for designers, developers, and typography enthusiasts**

_Fontizi makes font identification accessible to everyone through the power of AI and modern web technology._
