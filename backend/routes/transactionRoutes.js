const express = require('express');
const { addTransaction, getTransactions, getTransactionStats, deleteTransaction, updateTransaction } = require('../controllers/transactionController');
const { upload, analyzePDF } = require('../controllers/pdfController');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

router.post('/add', authenticateUser, addTransaction);
router.get('/', authenticateUser, getTransactions);
router.get('/stats', authenticateUser, getTransactionStats);
router.delete('/:id', authenticateUser, deleteTransaction);
router.put('/:id', authenticateUser, updateTransaction);
router.post('/upload-pdf', authenticateUser, upload.single('pdf'), analyzePDF);

module.exports = router;