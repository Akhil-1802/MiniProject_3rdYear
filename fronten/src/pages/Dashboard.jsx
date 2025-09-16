import React, { useState } from 'react';

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'transactions', icon: '💳', label: 'Transactions' },
    { id: 'investments', icon: '📈', label: 'Investments' },
    { id: 'goals', icon: '🏆', label: 'Goals' },
    { id: 'ai-suggestions', icon: '🤖', label: 'AI Suggestions' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const transactions = [
    { id: 1, date: '2024-07-28', description: 'Monthly Salary', category: 'Salary', amount: 75000, type: 'Income' },
    { id: 2, date: '2024-07-27', description: 'Groceries - SuperMart', category: 'Groceries', amount: -2300, type: 'Expense' },
    { id: 3, date: '2024-07-26', description: 'Electricity Bill', category: 'Utilities', amount: -1800, type: 'Expense' },
    { id: 4, date: '2024-07-25', description: 'Freelance Project - Acme Corp', category: 'Freelance', amount: 45000, type: 'Income' },
    { id: 5, date: '2024-07-24', description: 'Dining - Restaurant XYZ', category: 'Dining', amount: -1200, type: 'Expense' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      {/* Theme Toggle */}
      <div className="fixed top-6 right-8 z-50">
        <div className="relative">
          <div className={`w-1 h-8 ${isDark ? 'bg-gray-600' : 'bg-gray-400'} mx-auto`}></div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`w-12 h-12 rounded-full ${isDark ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-gray-800 shadow-gray-800/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center`}
          >
            <span className="text-xl">{isDark ? '💡' : '🌙'}</span>
          </button>
          <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 min-h-screen ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-r fixed left-0 top-0 z-40`}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">₿</span>
              </div>
              <span className="font-bold text-xl">FinVision</span>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                      : isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {activeTab === 'overview' ? 'Overview' : 
                 activeTab === 'transactions' ? 'Transactions Overview' : 
                 activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {activeTab === 'overview' ? "Welcome back! Here's your financial summary." : 
                 activeTab === 'transactions' ? 'Manage your income and expenses' : 
                 `Manage your ${activeTab}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                🔔
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>Total Balance</h3>
                    <span className="text-green-500 text-sm font-medium">+2.5%</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">$12,345.67</div>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>vs last month</p>
                </div>

                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>Monthly Income</h3>
                    <span className="text-blue-500 text-sm font-medium">+8.2%</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">$3,500.00</div>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>7 sources</p>
                </div>

                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium`}>Expenses</h3>
                    <span className="text-red-500 text-sm font-medium">+1.2%</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">$1,150.00</div>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>5 categories</p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Income vs Expenses Chart */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className="text-xl font-bold mb-6">Your Financial Journey</h3>
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Expenses</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-48">
                    {[60, 80, 45, 90, 70, 85, 95].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col gap-1">
                        <div className={`bg-blue-500 rounded-t`} style={{height: `${height}%`}}></div>
                        <div className={`bg-green-500 rounded-t`} style={{height: `${height * 0.7}%`}}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expenses by Category */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className="text-xl font-bold mb-6">Expenses by Category</h3>
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 flex items-center justify-center">
                      <div className={`w-20 h-20 ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-full`}></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Food', amount: '$450', color: 'bg-blue-500' },
                      { label: 'Transport', amount: '$280', color: 'bg-purple-500' },
                      { label: 'Shopping', amount: '$320', color: 'bg-green-500' },
                      { label: 'Bills', amount: '$100', color: 'bg-yellow-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                        </div>
                        <span className="font-semibold">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Goals & Achievements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Financial Goals */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className="text-xl font-bold mb-6">Financial Goals</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Dream Vacation', progress: 75, target: '$5,000' },
                      { label: 'New Car', progress: 45, target: '$25,000' },
                      { label: 'Emergency Fund', progress: 90, target: '$10,000' },
                    ].map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{goal.label}</span>
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{goal.target}</span>
                        </div>
                        <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-full h-2`}>
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{width: `${goal.progress}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className="text-xl font-bold mb-6">Your Achievements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: '🏆', title: 'First Goal Achieved', desc: 'Savings Milestone' },
                      { icon: '💰', title: 'Savings Master', desc: 'Budget Expert' },
                      { icon: '📈', title: 'Expense Tracker', desc: 'Investment Pro' },
                      { icon: '🎯', title: 'Budget King', desc: 'Financial Navigator' },
                      { icon: '⭐', title: 'Investment Advisor', desc: 'Expense Tracker' },
                      { icon: '🚀', title: 'Investment Advisor', desc: 'Financial Advisor' },
                    ].map((achievement, index) => (
                      <div key={index} className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                        <div className="text-2xl mb-2">{achievement.icon}</div>
                        <div className="text-sm font-semibold mb-1">{achievement.title}</div>
                        <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{achievement.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'transactions' && (
            <>
              {/* Transaction Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium mb-2`}>Total Income</h3>
                  <div className="text-3xl font-bold text-green-500 mb-2">₹90,500</div>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>+5.2% from last month</p>
                </div>
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium mb-2`}>Total Expenses</h3>
                  <div className="text-3xl font-bold text-red-500 mb-2">₹14,500</div>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>-2.1% from last month</p>
                </div>
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-medium mb-2`}>Net Flow</h3>
                  <div className="text-3xl font-bold text-blue-500 mb-2">₹76,000</div>
                  <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>+8.3% from last month</p>
                </div>
              </div>

              {/* Manual Entry & Upload */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Manual Entry */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className="text-xl font-bold mb-6">Manual Entry</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium">Income</button>
                      <button className={`flex-1 py-2 px-4 ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-lg font-medium`}>Expense</button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Description (e.g., Monthly Salary)" 
                      className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    />
                    <input 
                      type="number" 
                      placeholder="Amount (e.g., 50000)" 
                      className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    />
                    <select className={`w-full p-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}>
                      <option>Select Category</option>
                      <option>Salary</option>
                      <option>Freelance</option>
                      <option>Investment</option>
                      <option>Other</option>
                    </select>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Add Income
                    </button>
                  </div>
                </div>

                {/* Upload Statements */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <h3 className="text-xl font-bold mb-6">Upload Statements</h3>
                  <div className={`border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-8 text-center`}>
                    <div className="text-4xl mb-4">📄</div>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Drag & drop your files here, or</p>
                    <button className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} px-6 py-2 rounded-lg font-medium transition-colors`}>
                      Browse Files
                    </button>
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm mt-2`}>Supported formats: CSV, PDF</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4">
                    Process Statement
                  </button>
                </div>
              </div>

              {/* Transaction History */}
              <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Transaction History</h3>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Search transactions..." 
                      className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Add New Transaction
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Date</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Description</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Category</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Amount</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Type</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className={`${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                          <td className="py-3 px-4">{transaction.date}</td>
                          <td className="py-3 px-4">{transaction.description}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.category === 'Salary' ? 'bg-green-100 text-green-800' :
                              transaction.category === 'Groceries' ? 'bg-blue-100 text-blue-800' :
                              transaction.category === 'Utilities' ? 'bg-yellow-100 text-yellow-800' :
                              transaction.category === 'Freelance' ? 'bg-purple-100 text-purple-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transaction.category}
                            </span>
                          </td>
                          <td className={`py-3 px-4 font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ₹{Math.abs(transaction.amount).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}>
                                ✏️
                              </button>
                              <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}>
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'goals' && (
            <>
              {/* Goals Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">My Financial Goals</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <span>+</span> Add New Goal
                </button>
              </div>

              {/* Goals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* New Laptop Goal */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">💻</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">New Laptop</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>75% Complete</p>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`} strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-blue-500" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">75%</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saved:</span>
                        <span className="font-semibold">₹1,125</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Remaining:</span>
                        <span className="font-semibold">₹375</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Target: ₹1,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Savings Needed:</span>
                      <span className="font-semibold text-blue-500">₹50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Completion:</span>
                      <span className="font-semibold">Oct 2024</span>
                    </div>
                  </div>
                </div>

                {/* Dream Vacation Goal */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">✈️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Dream Vacation</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>50% Complete</p>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`} strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-green-500" strokeWidth="3" strokeDasharray="50, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">50%</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saved:</span>
                        <span className="font-semibold">₹2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Remaining:</span>
                        <span className="font-semibold">₹2,500</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Target: ₹5,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Savings Needed:</span>
                      <span className="font-semibold text-green-500">₹250</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Completion:</span>
                      <span className="font-semibold">Dec 2025</span>
                    </div>
                  </div>
                </div>

                {/* Down Payment Goal */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 relative`}>
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">20% Complete</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600">🏠</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Down Payment for House</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Target: ₹50,000</p>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`} strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-purple-500" strokeWidth="3" strokeDasharray="20, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">20%</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saved:</span>
                        <span className="font-semibold">₹10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Remaining:</span>
                        <span className="font-semibold">₹40,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Savings Needed:</span>
                      <span className="font-semibold text-purple-500">₹500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Completion:</span>
                      <span className="font-semibold">Jan 2027</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Fund Goal */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600">🛡️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Emergency Fund</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>90% Complete</p>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`} strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-orange-500" strokeWidth="3" strokeDasharray="90, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">90%</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saved:</span>
                        <span className="font-semibold">₹5,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Remaining:</span>
                        <span className="font-semibold">₹600</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Target: ₹6,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Savings Needed:</span>
                      <span className="font-semibold text-orange-500">₹600</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Completion:</span>
                      <span className="font-semibold">Jul 2024</span>
                    </div>
                  </div>
                </div>

                {/* Retirement Fund Goal */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600">🏖️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Retirement Fund</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>10% Complete</p>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`} strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-indigo-500" strokeWidth="3" strokeDasharray="10, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">10%</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saved:</span>
                        <span className="font-semibold">₹100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Remaining:</span>
                        <span className="font-semibold">₹900,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Target: ₹1,000,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Savings Needed:</span>
                      <span className="font-semibold text-indigo-500">₹1,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Completion:</span>
                      <span className="font-semibold">Dec 2040</span>
                    </div>
                  </div>
                </div>

                {/* New Bike Goal */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 relative`}>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">Goal Achieved!</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-600">🏍️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">New Bike</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Target: ₹800</p>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path className="stroke-teal-500" strokeWidth="3" strokeDasharray="100, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-500">✓</span>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saved:</span>
                        <span className="font-semibold text-green-500">₹800</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Remaining:</span>
                        <span className="font-semibold">₹0</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Savings Needed:</span>
                      <span className="font-semibold">₹0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Completion:</span>
                      <span className="font-semibold text-green-500">Mar 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'ai-suggestions' && (
            <>
              {/* AI Suggestions Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">AI Suggestions</h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Personalized recommendations to improve your financial health</p>
              </div>

              {/* Suggestion Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Spending Optimization */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xl">💡</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Spending Optimization</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>3 suggestions</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Reduce dining expenses</h4>
                          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>You spent ₹3,200 on dining last month. Consider cooking at home 2-3 times per week.</p>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500 text-sm font-medium">Potential savings: ₹800/month</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Switch to a better mobile plan</h4>
                          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>Your current plan costs ₹599. We found similar plans for ₹399.</p>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500 text-sm font-medium">Potential savings: ₹200/month</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Opportunities */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-xl">📈</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Investment Opportunities</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>2 suggestions</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Start SIP in Mutual Funds</h4>
                          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>Based on your savings pattern, you can invest ₹2,000/month in equity mutual funds.</p>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500 text-sm font-medium">Expected returns: 12-15% annually</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Increase PPF contribution</h4>
                          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>You're contributing ₹1,000/month to PPF. Consider increasing to ₹12,500/month for maximum tax benefits.</p>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500 text-sm font-medium">Tax savings: ₹46,800/year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal-based Suggestions */}
              <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 mb-8`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Goal-based Recommendations</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Suggestions to achieve your financial goals faster</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">💻</span>
                      <div>
                        <h4 className="font-medium">New Laptop Goal</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>75% complete</p>
                      </div>
                    </div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-2`}>You're doing great! Just ₹375 more to reach your goal. Consider selling your old laptop to speed up the process.</p>
                    <button className="text-blue-500 text-sm font-medium hover:text-blue-400 transition-colors">View Goal →</button>
                  </div>
                  <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🏠</span>
                      <div>
                        <h4 className="font-medium">House Down Payment</h4>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>20% complete</p>
                      </div>
                    </div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-2`}>Consider increasing your monthly savings by ₹200 to reach this goal 8 months earlier.</p>
                    <button className="text-purple-500 text-sm font-medium hover:text-purple-400 transition-colors">Adjust Goal →</button>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className={`${isDark ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-50 to-purple-50'} rounded-2xl p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Financial Health Score</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Based on your spending and saving patterns</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">85/100</div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Overall Score</p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Excellent</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">78%</div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Savings Rate</p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Above Average</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">92%</div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Goal Progress</p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs`}>On Track</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Key Insight</h4>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Your spending has decreased by 15% compared to last month, and you're consistently meeting your savings goals. Consider increasing your investment allocation to accelerate wealth building.</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'investments' && (
            <>
              {/* Investment Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Investment Options</h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explore different investment opportunities to grow your wealth</p>
              </div>

              {/* Investment Options Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Fixed Deposit */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">Fixed Deposit (FD)</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>A safe investment option that provides a fixed rate of return for a fixed period of time.</p>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Low Risk</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Stable Returns</span>
                    </div>
                  </div>
                  
                  {/* FD Chart */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Expected Growth</span>
                      <span className="font-semibold text-green-500">6.5% p.a.</span>
                    </div>
                    <div className="h-24 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-end p-2">
                      <div className="w-full h-16 bg-gradient-to-t from-blue-500 to-blue-300 rounded opacity-80"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                      <span>1Y</span>
                      <span>2Y</span>
                      <span>3Y</span>
                      <span>5Y</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Explore Fixed Deposits
                  </button>
                </div>

                {/* Recurring Deposit */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">Recurring Deposit (RD)</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>Invest a fixed amount every month and earn interest, perfect for regular savers.</p>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Systematic Saving</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">Fixed Returns</span>
                    </div>
                  </div>
                  
                  {/* RD Chart */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Expected Growth</span>
                      <span className="font-semibold text-green-500">6.8% p.a.</span>
                    </div>
                    <div className="h-24 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-end p-2">
                      <div className="w-full h-20 bg-gradient-to-t from-purple-500 to-purple-300 rounded opacity-80"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                      <span>6M</span>
                      <span>1Y</span>
                      <span>2Y</span>
                      <span>3Y</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Start Recurring Deposit
                  </button>
                </div>

                {/* Mutual Funds */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">Mutual Funds</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>Invest in a professionally managed portfolio of stocks, bonds, or other securities.</p>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">Professional Management</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">Market Linked</span>
                    </div>
                  </div>
                  
                  {/* MF Chart */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Expected Growth</span>
                      <span className="font-semibold text-green-500">12-15% p.a.</span>
                    </div>
                    <div className="h-24 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-end p-2">
                      <div className="w-full h-full bg-gradient-to-t from-orange-500 to-orange-300 rounded opacity-80"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                      <span>1Y</span>
                      <span>3Y</span>
                      <span>5Y</span>
                      <span>10Y</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                    Discover Mutual Funds
                  </button>
                </div>

                {/* SIP */}
                <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2">Systematic Investment Plan (SIP)</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>Invest a fixed amount at regular intervals in mutual funds, benefiting from rupee cost averaging.</p>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">Long-term Growth</span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">Disciplined Investing</span>
                    </div>
                  </div>
                  
                  {/* SIP Chart */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Expected Growth</span>
                      <span className="font-semibold text-green-500">14-18% p.a.</span>
                    </div>
                    <div className="h-24 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg flex items-end p-2">
                      <div className="w-full h-full bg-gradient-to-t from-teal-500 to-teal-300 rounded opacity-80"></div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                      <span>1Y</span>
                      <span>5Y</span>
                      <span>10Y</span>
                      <span>15Y</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                    Plan your SIP
                  </button>
                </div>
              </div>

              {/* Current Investments */}
              <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 mb-8`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Your Current Investments</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Add Investment
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">₹125,000</div>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Total Investment Value</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-2">₹18,500</div>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Total Returns</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">14.8%</div>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Overall Return Rate</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`${isDark ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Investment</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Type</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Amount</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Returns</th>
                        <th className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-left py-3 px-4 font-medium`}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'HDFC Equity Fund', type: 'Mutual Fund', amount: 45000, returns: 8500, status: 'Active' },
                        { name: 'SBI Fixed Deposit', type: 'FD', amount: 50000, returns: 3200, status: 'Active' },
                        { name: 'ICICI SIP Plan', type: 'SIP', amount: 30000, returns: 6800, status: 'Active' },
                      ].map((investment, index) => (
                        <tr key={index} className={`${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                          <td className="py-3 px-4 font-medium">{investment.name}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              investment.type === 'Mutual Fund' ? 'bg-orange-100 text-orange-800' :
                              investment.type === 'FD' ? 'bg-blue-100 text-blue-800' :
                              'bg-teal-100 text-teal-800'
                            }`}>
                              {investment.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold">₹{investment.amount.toLocaleString()}</td>
                          <td className="py-3 px-4 font-semibold text-green-500">+₹{investment.returns.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {investment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Investment Recommendations */}
              <div className={`${isDark ? 'bg-gradient-to-r from-green-900/20 to-blue-900/20' : 'bg-gradient-to-r from-green-50 to-blue-50'} rounded-2xl p-6`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Investment Recommendations</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Based on your financial profile and goals</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/70'} rounded-lg p-4`}>
                    <h4 className="font-medium mb-2">📈 Diversify Your Portfolio</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3`}>Consider adding international funds to your portfolio for better diversification and risk management.</p>
                    <button className="text-green-500 text-sm font-medium hover:text-green-400 transition-colors">Explore Options →</button>
                  </div>
                  <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/70'} rounded-lg p-4`}>
                    <h4 className="font-medium mb-2">🎯 Increase SIP Amount</h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm mb-3`}>Your current SIP of ₹5,000/month can be increased to ₹8,000 based on your income growth.</p>
                    <button className="text-blue-500 text-sm font-medium hover:text-blue-400 transition-colors">Modify SIP →</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'overview' && activeTab !== 'transactions' && activeTab !== 'goals' && activeTab !== 'ai-suggestions' && activeTab !== 'investments' && (
            <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-8 text-center`}>
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>This section is under development</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;