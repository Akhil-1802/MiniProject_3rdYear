const DeleteModal = ({ transaction, onConfirm, onClose, isDark }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 w-full max-w-md mx-4`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">🗑️</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">Delete Transaction</h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-4 mb-6`}>
            <div className="flex justify-between items-center">
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{transaction.description}</span>
              <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                ₹{transaction.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{transaction.category}</span>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-3 rounded-lg font-semibold ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(transaction._id)}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;