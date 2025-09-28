const multer = require('multer');
const pdfParse = require('pdf-parse');
const Transaction = require('../models/Transaction');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

const analyzePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;
    
    // Simple transaction extraction logic (you can enhance this)
    const transactions = extractTransactions(text);
    
    // Save transactions to database
    const userId = req.user.id;
    const savedTransactions = [];
    
    for (const transaction of transactions) {
      const newTransaction = new Transaction({
        userId,
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
        source: 'pdf',
        pdfFileName: req.file.originalname
      });
      
      const saved = await newTransaction.save();
      savedTransactions.push(saved);
    }

    res.json({
      message: `Successfully extracted ${savedTransactions.length} transactions`,
      transactions: savedTransactions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Simple transaction extraction function
const extractTransactions = (text) => {
  const transactions = [];
  const lines = text.split('\n');
  
  // This is a basic implementation - you can enhance with better regex patterns
  for (const line of lines) {
    // Look for patterns like: Date Amount Description
    const match = line.match(/(\d{2}\/\d{2}\/\d{4}|\d{2}-\d{2}-\d{4}).*?(\d+\.?\d*)/);
    
    if (match) {
      const amount = parseFloat(match[2]);
      if (amount > 0) {
        transactions.push({
          type: amount > 0 ? 'expense' : 'income',
          amount: Math.abs(amount),
          category: 'Other',
          description: line.trim(),
          date: new Date()
        });
      }
    }
  }
  
  return transactions;
};

module.exports = {
  upload,
  analyzePDF
};