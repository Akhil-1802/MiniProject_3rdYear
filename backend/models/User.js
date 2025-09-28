const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String
  },
  verificationExpires: {
    type: Date
  },
  hasCompletedBasicInfo: {
    type: Boolean,
    default: false
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  monthlyIncome: {
    type: Number
  },
  monthlyExpense: {
    type: Number
  },
  recurringTransactions: [{
    name: String,
    amount: Number,
    frequency: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);