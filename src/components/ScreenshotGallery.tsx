import { Trash2, Eye, Crop, Type, Sparkles } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export const ScreenshotGallery = () => {
  const { screenshots, removeScreenshot, setCurrentCropImage } = useAppStore()

  const handleCrop = (screenshot: any) => {
    setCurrentCropImage(screenshot)
  }

  if (screenshots.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Type className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">No font samples uploaded yet</p>
        <p className="text-gray-400 text-sm mt-2">Upload a screenshot to start font analysis</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {screenshots.map((screenshot) => (
        <div
          key={screenshot.id}
          className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-gray-300/50"
        >
          <div className="relative">
            <img
              src={screenshot.croppedImage || screenshot.preview}
              alt="Font sample"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Status Badge */}
            {screenshot.croppedImage && (
              <div className="absolute top-3 right-3">
                <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Cropped</span>
                </div>
              </div>
            )}
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                <button
                  onClick={() => window.open(screenshot.croppedImage || screenshot.preview, '_blank')}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors shadow-lg"
                  title="View full size"
                >
                  <Eye className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => handleCrop(screenshot)}
                  className="p-3 bg-blue-500/90 backdrop-blur-sm rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
                  title="Crop text region"
                >
                  <Crop className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => removeScreenshot(screenshot.id)}
                  className="p-3 bg-red-500/90 backdrop-blur-sm rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                  title="Delete sample"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {screenshot.file.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {screenshot.uploadedAt.toLocaleDateString()} at{' '}
                  {screenshot.uploadedAt.toLocaleTimeString()}
                </p>
              </div>
              <div className="ml-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <Type className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
            
            {screenshot.cropData && (
              <div className="bg-blue-50 rounded-lg p-3 mt-3">
                <div className="flex items-center space-x-2 text-xs text-blue-700">
                  <Crop className="w-3 h-3" />
                  <span className="font-medium">
                    Cropped: {screenshot.cropData.width}×{screenshot.cropData.height}
                  </span>
                </div>
              </div>
            )}
            
            {/* Analysis Status */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-medium">Ready for font analysis</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 