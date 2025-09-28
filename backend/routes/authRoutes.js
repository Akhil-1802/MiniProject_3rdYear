const express = require('express');
const { register, verifyEmail, resendVerification, updateBasicInfo, cleanupIncompleteUsers, getUserData } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);
router.put('/basic-info/:firebaseUid', updateBasicInfo);
router.delete('/cleanup-incomplete', cleanupIncompleteUsers);
router.get('/getuser/:firebaseUid', getUserData);

module.exports = router;