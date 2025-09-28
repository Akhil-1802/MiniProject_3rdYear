const Transaction = require('../models/Transaction');
const User = require('../models/User');

const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    const userId = req.user.id;

    const transaction = new Transaction({
      userId,
      type,
      amount,
      category,
      description,
      date: new Date(date),
      source: 'manual'
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const stats = await Transaction.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Transaction.aggregate([
      { $match: { userId: userId, type: 'expense' } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ stats, categoryStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionStats
};