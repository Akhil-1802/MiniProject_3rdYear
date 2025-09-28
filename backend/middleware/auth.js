// Simple auth middleware - replace with your actual authentication logic
const authenticateUser = (req, res, next) => {
  // For now, we'll use a mock user ID
  // In production, you should verify JWT tokens or session
  req.user = {
    id: '507f1f77bcf86cd799439011' // Mock ObjectId
  };
  next();
};

module.exports = { authenticateUser };