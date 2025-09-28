const mongoose = require('mongoose');

const authenticateUser = (req, res, next) => {
  const userId = req.headers['user-id'] ;
  req.user = {
    id: userId
  };
  next();
};

module.exports = { authenticateUser };