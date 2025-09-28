import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} overflow-x-hidden transition-colors duration-500`}>
      {/* Theme Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-12 h-12 rounded-full ${isDark ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-gray-800 shadow-gray-800/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center`}
        >
          <span className="text-xl">{isDark ? '💡' : '🌙'}</span>
        </button>
      </div>

      {/* Header */}
      <header className={`${isDark ? 'bg-black/95 border-gray-800' : 'bg-white/95 border-gray-200'} backdrop-blur-md border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`flex items-center gap-3 ${isDark ? 'text-white' : 'text-black'} font-bold text-2xl`}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">₿</span>
            </div>
            <span>FinVision</span>
          </div>
          <nav className="hidden md:flex gap-10">
            <a href="#home" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Home</a>
            <a href="#features" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Features</a>
            <a href="#about" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>About</a>
            <a href="#contact" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/signin" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Sign In</Link>
            <Link to="/signin" className={`${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-6 py-2 rounded-full font-medium transition-colors`}>Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black' : 'bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-white'}`}></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className={`text-6xl md:text-8xl font-bold mb-8 ${isDark ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' : 'bg-gradient-to-r from-black via-blue-800 to-purple-800'} bg-clip-text text-transparent leading-tight`}>
            The Future of Finance
          </h1>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-12 max-w-3xl mx-auto leading-relaxed`}>
            Experience revolutionary AI-powered financial management that adapts to your life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signin" className={`${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 inline-block text-center`}>
              Start Free Trial
            </Link>
            <button className={`border ${isDark ? 'border-gray-600 text-white hover:bg-white hover:text-black' : 'border-gray-400 text-black hover:bg-black hover:text-white'} px-8 py-4 rounded-full text-lg font-semibold transition-all`}>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Feature Showcase 1 */}
      <section className={`min-h-screen flex items-center ${isDark ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-white to-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Smart Budgeting
              <span className="block text-blue-400">Redefined</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              AI analyzes your spending patterns in real-time, creating personalized budgets that evolve with your lifestyle.
            </p>
            <button className="text-blue-400 text-lg font-semibold hover:text-blue-300 transition-colors">
              Learn more →
            </button>
          </div>
          <div className="relative">
            <div className={`${isDark ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-gray-700' : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-gray-300'} rounded-3xl p-8 backdrop-blur-sm border`}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-20 bg-gradient-to-t from-blue-500 to-blue-300 rounded-lg opacity-80"></div>
                <div className="h-32 bg-gradient-to-t from-purple-500 to-purple-300 rounded-lg opacity-80"></div>
                <div className="h-16 bg-gradient-to-t from-green-500 to-green-300 rounded-lg opacity-80"></div>
              </div>
              <div className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-2`}>$2,847</div>
                <div className="text-sm">Monthly Budget Optimized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase 2 */}
      <section className={`min-h-screen flex items-center ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className={`${isDark ? 'bg-gradient-to-br from-green-600/20 to-blue-600/20 border-gray-700' : 'bg-gradient-to-br from-green-100/50 to-blue-100/50 border-gray-300'} rounded-3xl p-8 backdrop-blur-sm border`}>
              <div className="flex justify-between items-center mb-6">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Portfolio Growth</div>
                <div className="text-green-400 text-lg font-semibold">+24.7%</div>
              </div>
              <div className="h-32 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-lg mb-4 flex items-end p-4">
                <div className="w-full h-20 bg-gradient-to-t from-green-500 to-green-300 rounded opacity-80"></div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Investment Insights
              <span className="block text-green-400">That Work</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get personalized investment recommendations powered by advanced AI algorithms and real-time market analysis.
            </p>
            <button className="text-green-400 text-lg font-semibold hover:text-green-300 transition-colors">
              Explore investments →
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase 3 */}
      <section className={`min-h-screen flex items-center ${isDark ? 'bg-gradient-to-b from-black to-purple-900/20' : 'bg-gradient-to-b from-white to-purple-100/20'}`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Bank-Level
              <span className="block text-purple-400">Security</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Your financial data is protected with military-grade encryption and advanced security protocols.
            </p>
            <button className="text-purple-400 text-lg font-semibold hover:text-purple-300 transition-colors">
              Security details →
            </button>
          </div>
          <div className="relative">
            <div className={`${isDark ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-gray-700' : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-gray-300'} rounded-3xl p-8 backdrop-blur-sm border`}>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🔒</span>
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-2`}>256-bit Encryption</div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Military-grade protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gradient-to-t from-black via-blue-900/10 to-black' : 'bg-gradient-to-t from-white via-blue-100/10 to-white'}`}>
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className={`text-5xl md:text-7xl font-bold mb-8 ${isDark ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' : 'bg-gradient-to-r from-black via-blue-800 to-purple-800'} bg-clip-text text-transparent`}>
            Ready to Transform Your Finances?
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-12 max-w-2xl mx-auto`}>
            Join thousands of users who have revolutionized their financial future with FinVision
          </p>
          <Link to="/signin" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl inline-block">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;