const eventsRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  handleAllEvents,
  handleAnEvent,
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
} = require("../controllers/events.js");
// const requireAdmin = require('../middlewares/requireAdmin.js');
const requireRequestBody = require("../middlewares/requireRequestBody.js");
const handleImageUpload = require("../middlewares/handleImageUpload");
const requireAdmin = require("../middlewares/requireAdmin.js");

eventsRouter.get("/", asyncHandler(handleAllEvents));
eventsRouter.get("/:id", asyncHandler(handleAnEvent));
eventsRouter.post(
  "/",
  handleImageUpload,
  requireAdmin,
  requireRequestBody,
  asyncHandler(handleCreateEvent)
);
eventsRouter.put(
  "/:id",
  handleImageUpload,
  requireAdmin,
  requireRequestBody,
  asyncHandler(handleUpdateEvent)
);
eventsRouter.delete("/:id", requireAdmin, asyncHandler(handleDeleteEvent));

module.exports = eventsRouter;
