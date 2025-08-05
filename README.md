# Fontizi - Screenshot Manager

A modern React web application for uploading and managing screenshots with a clean, intuitive interface.

## Features

- 🖼️ **Drag & Drop Upload**: Easy screenshot upload with drag and drop support
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, modern interface built with Tailwind CSS
- 📊 **State Management**: Powered by Zustand for efficient state management
- 🔍 **Image Preview**: View uploaded screenshots with full-size preview
- 🗑️ **Delete Functionality**: Remove screenshots with one click
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fontizi
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── UploadButton.tsx
│   ├── ScreenshotGallery.tsx
│   └── ErrorNotification.tsx
├── pages/              # Page components
│   └── LandingPage.tsx
├── store/              # State management
│   └── useAppStore.ts
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## Features in Detail

### Upload Functionality

- Supports PNG, JPG, and GIF formats
- File size limit: 5MB
- Drag and drop interface
- Click to browse files
- Real-time validation and error handling

### Screenshot Gallery

- Grid layout with responsive design
- Hover effects with action buttons
- Full-size image preview
- Delete functionality
- File metadata display

### State Management

- Centralized state with Zustand
- Screenshot storage and management
- Loading states
- Error handling and notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
