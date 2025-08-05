import { X, AlertCircle } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export const ErrorNotification = () => {
  const { error, clearError } = useAppStore()

  if (!error) return null

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-white/95 backdrop-blur-sm border border-red-200 px-6 py-4 rounded-2xl shadow-xl flex items-center space-x-4 max-w-md">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900">{error}</p>
        </div>
        <button
          onClick={clearError}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 