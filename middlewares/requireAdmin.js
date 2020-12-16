module.exports = async (req, res, next) => {
    req.currentUser = await User.findOne(req.session.userId, false);
    if (!req.currentUser) {
      return next(new UnauthorizedError());
    }
    return next();
  };