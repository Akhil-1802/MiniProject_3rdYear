import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const BasicInformation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    monthlyExpense: '',
    recurringTransactions: []
  });
  const [newTransaction, setNewTransaction] = useState({ name: '', amount: '', frequency: 'monthly' });
  const [expenseMethod, setExpenseMethod] = useState('manual');
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch(`http://localhost:3000/api/user/basic-info/${user.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Backend response:', result);

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving basic info:', error);
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

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      // For now, just set a placeholder expense amount
      // In a real app, you'd process the PDF to extract expense data
      setFormData(prev => ({ ...prev, monthlyExpense: 0 }));
    }
  };

  const slides = [
    {
      title: "What's your monthly income?",
      content: (
        <div className="space-y-6">
          <input
            type="number"
            placeholder="Enter your monthly income"
            value={formData.monthlyIncome}
            onChange={(e) => setFormData(prev => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
            className={`w-full px-6 py-4 rounded-xl text-xl ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      )
    },
    {
      title: "What's your monthly expense?",
      content: (
        <div className="space-y-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setExpenseMethod('manual')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${expenseMethod === 'manual' ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              Manual Entry
            </button>
            <button
              onClick={() => setExpenseMethod('upload')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${expenseMethod === 'upload' ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              Upload PDF
            </button>
          </div>
          
          {expenseMethod === 'manual' ? (
            <input
              type="number"
              placeholder="Enter your monthly expense"
              value={formData.monthlyExpense}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlyExpense: Number(e.target.value) }))}
              className={`w-full px-6 py-4 rounded-xl text-xl ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          ) : (
            <div className={`border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-xl p-8 text-center`}>
              <div className="text-4xl mb-4">📄</div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Upload your expense statement (PDF)</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors`}
              >
                Choose PDF File
              </label>
              {uploadedFile && (
                <p className="mt-2 text-green-500">✓ {uploadedFile.name} uploaded</p>
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
    </div>
  );
};

export default BasicInformation;