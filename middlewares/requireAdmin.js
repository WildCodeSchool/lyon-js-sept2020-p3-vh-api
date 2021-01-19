const { findByEmail } = require("../models/users.js");
const { UnauthorizedError } = require("../error-types");

module.exports = async (req, res, next) => {
  const isAdmin = await findByEmail(req.body.email, false);
  if (isAdmin && isAdmin.role !== "admin") {
    return next(new UnauthorizedError());
  }
  return next();
};
