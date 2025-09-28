const Joi = require('joi');
const User = require('../models/User');
const { sendVerificationEmail, generateVerificationCode } = require('../utils/emailService');

const registerSchema = Joi.object({
  firebaseUid: Joi.string().required(),
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().pattern(/^[0-9]{10}$/).required()
});

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { firebaseUid, fullName, email, mobile } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }, { firebaseUid }] });
    if (existingUser) {
      if (existingUser.firebaseUid === firebaseUid) {
        return res.status(400).json({ message: 'User already registered' });
      }
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Mobile number already registered' 
      });
    }

    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User({
      firebaseUid,
      fullName,
      email,
      mobile,
      verificationCode,
      verificationExpires
    });

    await user.save();
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ 
      message: 'Registration successful. Please check your email for verification code.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId, code } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    if (user.verificationCode !== code || user.verificationExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resendVerification = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = verificationCode;
    user.verificationExpires = verificationExpires;
    await user.save();

    await sendVerificationEmail(user.email, verificationCode);

    res.json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBasicInfo = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const { monthlyIncome, monthlyExpense, recurringTransactions } = req.body;

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      {
        monthlyIncome,
        monthlyExpense,
        recurringTransactions,
        hasCompletedBasicInfo: true
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Basic information updated successfully', user });
  } catch (error) {
    console.error('Update basic info error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const cleanupIncompleteUsers = async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const incompleteUsers = await User.find({
      $or: [
        { isVerified: false },
        { hasCompletedBasicInfo: false }
      ],
      registrationDate: { $lt: twentyFourHoursAgo }
    });

    const deletedCount = await User.deleteMany({
      $or: [
        { isVerified: false },
        { hasCompletedBasicInfo: false }
      ],
      registrationDate: { $lt: twentyFourHoursAgo }
    });

    res.json({ 
      message: `Cleaned up ${deletedCount.deletedCount} incomplete registrations`,
      deletedUsers: incompleteUsers.map(u => u.firebaseUid)
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserData = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, verifyEmail, resendVerification, updateBasicInfo, cleanupIncompleteUsers, getUserData };