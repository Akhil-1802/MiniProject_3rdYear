const express = require('express');
const { addGoal, getGoals, updateGoalProgress } = require('../controllers/goalController');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

router.post('/add', authenticateUser, addGoal);
router.get('/', authenticateUser, getGoals);
router.put('/:goalId/progress', authenticateUser, updateGoalProgress);

module.exports = router;