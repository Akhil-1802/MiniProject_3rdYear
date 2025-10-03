const multer = require('multer');
const pdfParse = require('pdf-parse');
const Transaction = require('../models/Transaction');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');
require('dotenv').config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

const uploadImage = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const analyzePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;
    
    if (!text.trim()) {
      return res.status(400).json({ error: 'PDF contains no readable text' });
    }
    
    // Use Gemini AI to analyze transactions
    const transactions = await analyzeWithGemini(text);
    
    if (transactions.length === 0) {
      return res.json({
        message: 'No transactions found in PDF',
        transactions: []
      });
    }
    
    // Save transactions to database
    const savedTransactions = [];
    for (const transaction of transactions) {
      try {
  
        const newTransaction = new Transaction({
          userId: req.user.id,
          type: transaction.type,
          amount: transaction.amount,
          category: transaction.category,
          description: transaction.description,
          date: new Date(transaction.date),
          source: 'pdf-ai',
          pdfFileName: req.file.originalname
        });
        
        const saved = await newTransaction.save();
        savedTransactions.push(saved);
      } catch (saveError) {
        console.error('Error saving transaction:', saveError.message);
      }
    }

    res.json({
      message: `AI extracted ${savedTransactions.length} transactions`,
      transactions: savedTransactions
    });
  } catch (error) {
    console.error('PDF Analysis Error:', error.message);
    res.status(500).json({ error: 'PDF processing failed: ' + error.message });
  }
};

const analyzeWithGemini = async (text) => {
  try {
    // Debug: Check if API key is loaded
    console.log('Gemini API Key loaded:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');
    console.log('API Key length:', process.env.GEMINI_API_KEY?.length || 0);
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `
Analyze this bank statement text and extract transaction details. Return ONLY a valid JSON array of transactions.

For each transaction, determine:
- type: "income" or "expense"
- amount: numeric value (positive)
- category: one of ["Food", "Transportation", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", "Investment", "Salary", "Business", "Other"]
- description: clean, concise description
- date: YYYY-MM-DD format

Rules:
- Only include actual transactions (ignore headers, balances, fees under $5)
- Categorize intelligently based on merchant/description
- Ensure amounts are positive numbers
- Limit to 25 most significant transactions

Text to analyze:
${text.substring(0, 4000)}

Return format: [{"type":"expense","amount":50.25,"category":"Food","description":"Restaurant ABC","date":"2024-01-15"}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();
    
    // Extract JSON from response
    const jsonMatch = aiText.match(/\[.*\]/s);
    if (!jsonMatch) {
      console.log('No JSON found in AI response');
      return [];
    }
    
    const transactions = JSON.parse(jsonMatch[0]);
    
    // Validate and clean transactions
    return transactions.filter(t => 
      t.type && t.amount && t.category && t.description && t.date &&
      ['income', 'expense'].includes(t.type) &&
      !isNaN(parseFloat(t.amount)) &&
      parseFloat(t.amount) > 0
    ).map(t => ({
      ...t,
      amount: parseFloat(t.amount)
    }));
    
  } catch (error) {
    console.error('Gemini AI Error:', error.message);
    return [];
  }
};

const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Use Gemini AI to analyze image
    const transaction = await analyzeImageWithGemini(req.file.buffer, req.file.mimetype);
    
    if (!transaction) {
      return res.json({
        message: 'No transaction found in image',
        transaction: null
      });
    }
    
    // Save transaction to database
    try {
      const newTransaction = new Transaction({
        userId: req.user.id,
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        date: new Date(transaction.date),
        source: 'image-ai'
      });
      
      const saved = await newTransaction.save();
      
      res.json({
        message: 'AI extracted transaction from image',
        transaction: saved
      });
    } catch (saveError) {
      console.error('Error saving transaction:', saveError.message);
      res.status(500).json({ error: 'Failed to save transaction' });
    }
  } catch (error) {
    console.error('Image Analysis Error:', error.message);
    res.status(500).json({ error: 'Image processing failed: ' + error.message });
  }
};

const analyzeImageWithGemini = async (imageBuffer, mimeType) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not found');
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `
Analyze this receipt/transaction image and extract the transaction details. Return ONLY a valid JSON object.

Extract:
- type: "income" or "expense" (receipts are usually expenses)
- amount: numeric value (positive, main total amount)
- category: one of ["Food", "Transportation", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", "Investment", "Salary", "Business", "Other"]
- description: merchant/store name or transaction description
- date: YYYY-MM-DD format (use today's date if not visible)

Rules:
- Focus on the main transaction amount (not tax or subtotals)
- Categorize based on merchant type
- Use clear, concise descriptions

Return format: {"type":"expense","amount":25.50,"category":"Food","description":"McDonald's","date":"2024-01-15"}`;

    const imagePart = {
      inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: mimeType
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const aiText = response.text();
    
    // Extract JSON from response
    const jsonMatch = aiText.match(/\{.*\}/s);
    if (!jsonMatch) {
      console.log('No JSON found in AI response');
      return null;
    }
    
    const transaction = JSON.parse(jsonMatch[0]);
    
    // Validate transaction
    if (transaction.type && transaction.amount && transaction.category && 
        transaction.description && transaction.date &&
        ['income', 'expense'].includes(transaction.type) &&
        !isNaN(parseFloat(transaction.amount)) &&
        parseFloat(transaction.amount) > 0) {
      return {
        ...transaction,
        amount: parseFloat(transaction.amount)
      };
    }
    
    return null;
    
  } catch (error) {
    console.error('Gemini Image AI Error:', error.message);
    return null;
  }
};

const analyzeForIncomeExpense = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    
    if (!req.user?.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;
    
    if (!text.trim()) {
      return res.status(400).json({ error: 'PDF contains no readable text' });
    }
    
    const transactions = await analyzeWithGemini(text);
    
    if (transactions.length === 0) {
      return res.json({
        message: 'No transactions found in PDF',
        monthlyIncome: 0,
        monthlyExpense: 0
      });
    }
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    for (const transaction of transactions) {
      if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      } else {
        totalIncome += transaction.amount;
      }
    }
    
    res.json({
      message: 'Income and expense calculated from PDF',
      monthlyIncome: totalIncome,
      monthlyExpense: totalExpense,
      transactionCount: transactions.length
    });
  } catch (error) {
    console.error('PDF Analysis Error:', error.message);
    res.status(500).json({
      error: 'PDF processing failed: ' + error.message
    });
  }
};
module.exports = {
  upload,
  uploadImage,
  analyzePDF,
  analyzeImage,
  analyzeForIncomeExpense
};