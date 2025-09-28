import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

const VerifyEmail = () => {
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email } = location.state || {};

  useEffect(() => {
    if (!userId || !email) {
      navigate('/signup');
    }
  }, [userId, email, navigate]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setToast({ message: 'Please enter a 6-digit code', type: 'error' });
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/user/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, code })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setToast({ message: 'Email verified successfully!', type: 'success' });
        setTimeout(() => navigate('/basic-information'), 2000);
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    }
    setLoading(false);
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/user/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      
      const data = await response.json();
      setToast({ message: data.message, type: response.ok ? 'success' : 'error' });
    } catch (error) {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-500`}>
      {/* Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-12 h-12 rounded-full ${isDark ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-gray-800 shadow-gray-800/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center`}
        >
          <span className="text-xl">{isDark ? '💡' : '🌙'}</span>
        </button>
      </div>

      {/* Header */}
      <header className={`${isDark ? 'bg-black/95 border-gray-800' : 'bg-white/95 border-gray-200'} backdrop-blur-md border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className={`flex items-center gap-3 ${isDark ? 'text-white' : 'text-black'} font-bold text-2xl`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">₿</span>
            </div>
            <span>FinVision</span>
          </Link>
        </div>
      </header>

      {/* Verification Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className={`w-full max-w-md ${isDark ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50/50 border-gray-200'} backdrop-blur-md border rounded-3xl p-8 text-center`}>
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We've sent a 6-digit code to {email}
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={`w-full px-4 py-3 rounded-xl text-center text-2xl tracking-widest ${isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'} border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                maxLength={6}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            
            <button
              type="button"
              onClick={handleResendCode}
              disabled={loading}
              className={`w-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50`}
            >
              {loading ? 'Sending...' : 'Resend Code'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Wrong email?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-semibold">
                Sign up again
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default VerifyEmail;