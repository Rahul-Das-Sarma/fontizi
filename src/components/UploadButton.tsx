import { useState, useRef } from 'react'
import { Upload, Type, Sparkles } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export const UploadButton = () => {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addScreenshot, setError, clearError } = useAppStore()

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    clearError()
    addScreenshot(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
      
      <div
        className={`
          relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out group
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50/80 shadow-lg scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-white/80 hover:shadow-xl hover:scale-[1.02]'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-6">
            <div className={`
              w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center
              transition-all duration-300
              ${isDragOver 
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-indigo-100'
              }
            `}>
              <Upload className={`w-8 h-8 transition-colors duration-300 ${
                isDragOver ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
              }`} />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Upload Screenshot
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            Drag and drop your screenshot here, or click to browse. 
            We'll help you identify fonts in your text.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Type className="w-4 h-4" />
              <span>PNG, JPG</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Max 5MB</span>
            </div>
          </div>
          
          {/* Drag Overlay */}
          {isDragOver && (
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <Upload className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold text-blue-600">Drop to upload</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 