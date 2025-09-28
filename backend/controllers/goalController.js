const Goal = require('../models/Goal');
const User = require('../models/User');

const calculateMonthlySaving = (targetAmount, currentAmount, monthsToTarget) => {
  const remainingAmount = targetAmount - currentAmount;
  return Math.ceil(remainingAmount / monthsToTarget);
};

const addGoal = async (req, res) => {
  try {
    const { title, targetAmount, targetDate, category } = req.body;
    const userId = req.user.id;
    const user = await User.findOne({firebaseUid : userId});
    const currentDate = new Date();
    const target = new Date(targetDate);
    const monthsToTarget = Math.ceil((target - currentDate) / (1000 * 60 * 60 * 24 * 30));
    
    const recommendedMonthlySaving = calculateMonthlySaving(targetAmount, 0, monthsToTarget);

    const goal = new Goal({
      userId :user._id,
      title,
      targetAmount,
      targetDate: target,
      monthsToTarget,
      recommendedMonthlySaving,
      category: category || 'general'
    });

    await goal.save();
    res.status(201).json({ 
      message: 'Goal created successfully', 
      goal,
      recommendation: `Save ₹${recommendedMonthlySaving} monthly to achieve your goal in ${monthsToTarget} months`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({firebaseUid : userId})
    const goals = await Goal.find({ userId : user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGoalProgress = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { amount } = req.body;
    
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    goal.currentAmount += amount;
    if (goal.currentAmount >= goal.targetAmount) {
      goal.status = 'completed';
    }

    await goal.save();
    res.json({ message: 'Goal updated successfully', goal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addGoal,
  getGoals,
  updateGoalProgress
};