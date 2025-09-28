import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, isDark }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className={`${
        type === 'success' 
          ? isDark ? 'bg-green-800 border-green-600' : 'bg-green-100 border-green-400'
          : isDark ? 'bg-red-800 border-red-600' : 'bg-red-100 border-red-400'
      } border rounded-lg p-4 shadow-lg max-w-sm`}>
        <div className="flex items-center gap-3">
          <div className={`text-2xl ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {type === 'success' ? '🎉' : '❌'}
          </div>
          <div className="flex-1">
            <p className={`font-medium ${
              type === 'success'
                ? isDark ? 'text-green-200' : 'text-green-800'
                : isDark ? 'text-red-200' : 'text-red-800'
            }`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`text-lg ${
              type === 'success'
                ? isDark ? 'text-green-300 hover:text-green-100' : 'text-green-600 hover:text-green-800'
                : isDark ? 'text-red-300 hover:text-red-100' : 'text-red-600 hover:text-red-800'
            } transition-colors`}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;