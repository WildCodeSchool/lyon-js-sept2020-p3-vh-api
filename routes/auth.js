const authRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const { login, logout } = require("../controllers/auth");
const requireRequestBody = require("../middlewares/requireRequestBody.js");
const requireAdmin = require("../middlewares/requireAdmin.js");

authRouter.post("/login", requireRequestBody, asyncHandler(login));
authRouter.post(
  "/bo-login",
  requireRequestBody,
  requireAdmin,
  asyncHandler(login)
);
authRouter.get("/logout", asyncHandler(logout));

module.exports = authRouter;
