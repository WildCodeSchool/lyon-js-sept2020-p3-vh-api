const asyncHandler = require("express-async-handler");
const contactRouter = require("express").Router();
const {
  handleGetAllMessages,
  handleGetOneMessage,
  handleOneMessagePost,
  handleDeleteOneMessage,
  handleSubscribeNewsLetter,
} = require("../controllers/contact");
const requireRequestBody = require("../middlewares/requireRequestBody.js");
const requireAdmin = require("../middlewares/requireAdmin.js");

contactRouter.get("/", asyncHandler(handleGetAllMessages));
contactRouter.get("/:id", asyncHandler(handleGetOneMessage));
contactRouter.post(
  "/newsletter",
  requireRequestBody,
  requireAdmin,
  asyncHandler(handleSubscribeNewsLetter)
);
contactRouter.post("/", requireAdmin, asyncHandler(handleOneMessagePost));
contactRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(handleDeleteOneMessage)
);

module.exports = contactRouter;
