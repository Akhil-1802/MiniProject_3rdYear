const User = require('../models/User');

const cleanupIncompleteRegistrations = async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const result = await User.deleteMany({
      $or: [
        { isVerified: false },
        { hasCompletedBasicInfo: false }
      ],
      registrationDate: { $lt: twentyFourHoursAgo }
    });

    console.log(`Cleaned up ${result.deletedCount} incomplete registrations`);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};

// Run cleanup every hour
setInterval(cleanupIncompleteRegistrations, 60 * 60 * 1000);

module.exports = { cleanupIncompleteRegistrations };