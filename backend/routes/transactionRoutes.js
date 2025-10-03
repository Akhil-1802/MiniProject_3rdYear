const express = require('express');
const { addTransaction, getTransactions, getTransactionStats, deleteTransaction, updateTransaction } = require('../controllers/transactionController');
const { upload, analyzePDF, uploadImage, analyzeImage, analyzeForIncomeExpense } = require('../controllers/pdfController');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

router.post('/add', authenticateUser, addTransaction);
router.get('/', authenticateUser, getTransactions);
router.get('/stats', authenticateUser, getTransactionStats);
router.delete('/:id', authenticateUser, deleteTransaction);
router.put('/:id', authenticateUser, updateTransaction);
router.post('/upload-pdf', authenticateUser, upload.single('pdf'), analyzePDF);
router.post('/analyze-image', authenticateUser, uploadImage.single('image'), analyzeImage);
router.post('/analyze-income-expense', authenticateUser, upload.single('pdf'), analyzeForIncomeExpense);

module.exports = router;