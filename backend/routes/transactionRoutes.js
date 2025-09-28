const express = require('express');
const { addTransaction, getTransactions, getTransactionStats } = require('../controllers/transactionController');
const { upload, analyzePDF } = require('../controllers/pdfController');
const router = express.Router();

// Middleware to extract user from request (you'll need to implement this based on your auth)
const authenticateUser = (req, res, next) => {
  // Add your authentication logic here
  // For now, assuming user is attached to req
  next();
};

router.post('/add', authenticateUser, addTransaction);
router.get('/', authenticateUser, getTransactions);
router.get('/stats', authenticateUser, getTransactionStats);
router.post('/upload-pdf', authenticateUser, upload.single('pdf'), analyzePDF);

module.exports = router;