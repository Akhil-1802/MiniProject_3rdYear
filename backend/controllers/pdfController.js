const multer = require('multer');
const pdfParse = require('pdf-parse');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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
    console.log('PDF upload started');
    console.log('User ID from request:', req.user?.id);
    console.log('Headers:', req.headers['user-id']);
    
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    console.log('Parsing PDF...');
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;
    console.log('PDF text extracted, length:', text.length);
    console.log('First 500 characters:', text.substring(0, 500));
    
    const transactions = extractTransactions(text);
    console.log('Transactions extracted:', transactions.length);
    
    if (transactions.length === 0) {
      return res.json({
        message: 'No transactions found in PDF',
        transactions: []
      });
    }
    
    const userId = req.user.id
    const savedTransactions = [];
    
    for (const transaction of transactions) {
      try {
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
      } catch (saveError) {
        console.error('Error saving transaction:', saveError.message);
      }
    }

    res.json({
      message: `Successfully extracted ${savedTransactions.length} transactions`,
      transactions: savedTransactions
    });
  } catch (error) {
    console.error('PDF Analysis Error:', error.message);
    res.status(500).json({ error: 'PDF processing failed: ' + error.message });
  }
};

const extractTransactions = (text) => {
  console.log('Extracting transactions from text length:', text.length);
  const transactions = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    // More flexible regex patterns
    const dateMatch = line.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
    const amountMatch = line.match(/(\d{1,}[,.]?\d*\.?\d{2})/);
    
    if (dateMatch && amountMatch) {
      const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
      if (amount > 10) {
        const isDebit = line.toLowerCase().includes('debit') || 
                       line.toLowerCase().includes('dr') ||
                       line.toLowerCase().includes('withdrawal');
        
        let cleanDescription = line
          .replace(dateMatch[0], '')
          .replace(amountMatch[0], '')
          .replace(/[^a-zA-Z0-9\s]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 50);
        
        if (!cleanDescription) cleanDescription = 'PDF Transaction';
        
        transactions.push({
          type: isDebit ? 'expense' : 'income',
          amount: Math.abs(amount),
          category: 'Other',
          description: cleanDescription,
          date: new Date(dateMatch[1])
        });
      }
    }
  }
  
  console.log('Extracted transactions count:', transactions.length);
  return transactions.slice(0, 20);
};

module.exports = {
  upload,
  analyzePDF
};