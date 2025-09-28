import { useState } from 'react';

const GoalForm = ({ onSubmit, isDark }) => {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    targetDate: '',
    category: 'general'
  });

  const categories = ['Car', 'House', 'Vacation', 'Education', 'Emergency Fund', 'Investment', 'General'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      targetAmount: '',
      targetDate: '',
      category: 'general'
    });
  };

  const calculateMonths = () => {
    if (!formData.targetDate) return 0;
    const target = new Date(formData.targetDate);
    const now = new Date();
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24 * 30));
  };

  const calculateMonthlySaving = () => {
    const months = calculateMonths();
    if (!months || !formData.targetAmount) return 0;
    return Math.ceil(formData.targetAmount / months);
  };

  return (
    <form onSubmit={handleSubmit} className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
      <h3 className="text-xl font-bold mb-6">Create Financial Goal</h3>
      
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Goal Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="e.g., Buy a new car"
            className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Target Amount (₹)</label>
            <input
              type="number"
              value={formData.targetAmount}
              onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
              className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Target Date</label>
            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              required
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>
        </div>

        {formData.targetAmount && formData.targetDate && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}>
            <h4 className="font-semibold mb-2">💡 Smart Recommendation</h4>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Save <span className="font-bold text-blue-500">₹{calculateMonthlySaving()}</span> monthly 
              for <span className="font-bold">{calculateMonths()}</span> months to achieve your goal!
            </p>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
      >
        Create Goal
      </button>
    </form>
  );
};

export default GoalForm;