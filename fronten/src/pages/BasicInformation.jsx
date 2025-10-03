import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Toast from '../components/Toast';

const BasicInformation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    monthlyExpense: '',
    recurringTransactions: []
  });
  const [newTransaction, setNewTransaction] = useState({ name: '', amount: '', frequency: 'monthly' });
  const [inputMethod, setInputMethod] = useState('manual');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfAnalyzed, setPdfAnalyzed] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      setToast({ message: 'Please log in to continue', type: 'error' });
      return;
    }

    if (!formData.monthlyIncome || !formData.monthlyExpense) {
      setToast({ message: 'Please enter both income and expense amounts', type: 'error' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/basic-info/${user.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setToast({ message: 'Profile setup completed successfully!', type: 'success' });
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setToast({ message: result.error || 'Failed to save information', type: 'error' });
      }
    } catch (error) {
      console.error('Error saving basic info:', error);
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    }
  };

  const addTransaction = () => {
    if (newTransaction.name && newTransaction.amount) {
      setFormData(prev => ({
        ...prev,
        recurringTransactions: [...prev.recurringTransactions, { ...newTransaction, amount: Number(newTransaction.amount) }]
      }));
      setNewTransaction({ name: '', amount: '', frequency: 'monthly' });
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      setToast({ message: 'Please select a valid PDF file', type: 'error' });
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setToast({ message: 'Please log in first', type: 'error' });
      return;
    }

    setUploadedFile(file);
    setUploading(true);
    
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://localhost:3000/api/transactions/analyze-income-expense', {
        method: 'POST',
        headers: {
          'user-id': user.uid
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({
          ...prev,
          monthlyIncome: result.monthlyIncome,
          monthlyExpense: result.monthlyExpense
        }));
        setPdfAnalyzed(true);
        setToast({ message: `AI analyzed ${result.transactionCount} transactions successfully!`, type: 'success' });
      } else {
        const errorData = await response.json();
        setToast({ message: errorData.error || 'Failed to analyze PDF', type: 'error' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setToast({ message: 'Error analyzing PDF. Please try again.', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const slides = [
    {
      title: "Set up your monthly income & expenses",
      content: (
        <div className="space-y-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setInputMethod('manual')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${inputMethod === 'manual' ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              📝 Manual Entry
            </button>
            <button
              onClick={() => setInputMethod('upload')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${inputMethod === 'upload' ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              🤖 AI Analysis
            </button>
          </div>
          
          {inputMethod === 'manual' ? (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Income</label>
                <input
                  type="number"
                  placeholder="Enter your monthly income"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData(prev => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                  className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Expenses</label>
                <input
                  type="number"
                  placeholder="Enter your monthly expenses"
                  value={formData.monthlyExpense}
                  onChange={(e) => setFormData(prev => ({ ...prev, monthlyExpense: Number(e.target.value) }))}
                  className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-xl p-8 text-center`}>
                <div className="text-4xl mb-4">🤖📄</div>
                <h3 className="font-semibold mb-2">AI-Powered Transaction Analysis</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>
                  Upload your bank statement and let AI calculate your income & expenses automatically
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                  id="pdf-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="pdf-upload"
                  className={`${uploading ? 'bg-gray-400 cursor-not-allowed' : isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors inline-block`}
                >
                  {uploading ? 'Analyzing...' : 'Upload Bank Statement'}
                </label>
                {uploadedFile && (
                  <div className="mt-4">
                    <p className="text-green-500 text-sm">✓ {uploadedFile.name}</p>
                    {pdfAnalyzed && (
                      <p className="text-blue-500 text-sm mt-1">AI analysis complete!</p>
                    )}
                  </div>
                )}
              </div>
              
              {pdfAnalyzed && (
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>AI Calculated Income</label>
                    <input
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                      className={`w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border text-sm`}
                    />
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>AI Calculated Expenses</label>
                    <input
                      type="number"
                      value={formData.monthlyExpense}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthlyExpense: Number(e.target.value) }))}
                      className={`w-full px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border text-sm`}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      title: "Add your recurring transactions",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Transaction name"
              value={newTransaction.name}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, name: e.target.value }))}
              className={`px-4 py-3 rounded-xl ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border`}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
              className={`px-4 py-3 rounded-xl ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border`}
            />
            <select
              value={newTransaction.frequency}
              onChange={(e) => setNewTransaction(prev => ({ ...prev, frequency: e.target.value }))}
              className={`px-4 py-3 rounded-xl ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border`}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button
            onClick={addTransaction}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Transaction
          </button>
          <div className="space-y-2">
            {formData.recurringTransactions.map((transaction, index) => (
              <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex justify-between`}>
                <span>{transaction.name} - ₹{transaction.amount} ({transaction.frequency})</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Terms & Conditions",
      content: (
        <div className="space-y-4">
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'} text-sm`}>
            <h3 className="font-bold mb-3">By using FinVision, you agree to:</h3>
            <ul className="space-y-2">
              <li>• Provide accurate financial information</li>
              <li>• Keep your account secure</li>
              <li>• Use the platform responsibly</li>
              <li>• Allow us to analyze your data for better insights</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-12 h-12 rounded-full ${isDark ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-gray-800 shadow-gray-800/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center`}
        >
          <span className="text-xl">{isDark ? '💡' : '🌙'}</span>
        </button>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to FinVision!</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Let's set up your financial profile</p>
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-500' : isDark ? 'bg-gray-700' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-3xl p-8 min-h-[400px]`}>
            <h2 className="text-2xl font-bold mb-6 text-center">{slides[currentSlide].title}</h2>
            {slides[currentSlide].content}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className={`px-6 py-3 rounded-xl font-medium ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'} ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
            >
              Previous
            </button>
            
            {currentSlide === slides.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700"
              >
                Complete Setup
              </button>
            ) : (
              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          isDark={isDark}
        />
      )}
    </div>
  );
};

export default BasicInformation;