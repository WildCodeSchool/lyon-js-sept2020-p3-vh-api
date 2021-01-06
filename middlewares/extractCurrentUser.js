const User = require('../models/users');

module.exports = async (req, res, next) => {
  req.currentUser = await User.findOne(req.session.userId, false);
  next();
};