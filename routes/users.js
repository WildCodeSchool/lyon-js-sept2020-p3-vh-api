const usersRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const requireRequestBody = require("../middlewares/requireRequestBody.js");
const {
  handleAllUsers,
  handleAnUser,
  handleOneUserCreation,
  handleOneUserDeletion,
  handleOneUserUpdate,
  handleAllAnimators,
  handleResetPassword,
} = require("../controllers/users");
const handleImageUpload = require("../middlewares/handleImageUpload");

usersRouter.get("/", asyncHandler(handleAllUsers)); // get all users
usersRouter.get("/animators", asyncHandler(handleAllAnimators)); // get all animators
usersRouter.get("/:id", asyncHandler(handleAnUser)); // get one user
usersRouter.delete("/:id", asyncHandler(handleOneUserDeletion)); // delete one user
usersRouter.post(
  "/",
  handleImageUpload,
  requireRequestBody,
  asyncHandler(handleOneUserCreation)
); // create one user
usersRouter.post(
  "/reset-password",
  requireRequestBody,
  asyncHandler(handleResetPassword)
);
usersRouter.put(
  "/:id",
  handleImageUpload,
  requireRequestBody,
  asyncHandler(handleOneUserUpdate)
); // update one user

module.exports = usersRouter;
