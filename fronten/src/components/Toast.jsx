import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className={`px-6 py-4 rounded-xl shadow-lg backdrop-blur-md border ${
        type === 'success' 
          ? 'bg-green-500/10 border-green-500/20 text-green-500' 
          : 'bg-red-500/10 border-red-500/20 text-red-500'
      }`}>
        <div className="flex items-center gap-3">
          <span className="text-xl">{type === 'success' ? '✅' : '❌'}</span>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;