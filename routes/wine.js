const asyncHandler = require("express-async-handler");
const wineRoute = require("express").Router();
const handleImageUpload = require("../middlewares/handleImageUpload");

const {
  handleWineGetAll,
  handleWineGetOne,
  handleWinePost,
  handleWinePutOne,
  handleWineDeleteOne,
} = require("../controllers/wine");
const requireAdmin = require("../middlewares/requireAdmin.js");

wineRoute.get("/", asyncHandler(handleWineGetAll));
wineRoute.get("/:id", asyncHandler(handleWineGetOne));
wineRoute.post(
  "/",
  requireAdmin,
  handleImageUpload,
  asyncHandler(handleWinePost)
);
wineRoute.put(
  "/:id",
  requireAdmin,
  handleImageUpload,
  asyncHandler(handleWinePutOne)
);
wineRoute.delete("/:id", requireAdmin, asyncHandler(handleWineDeleteOne));

module.exports = wineRoute;
