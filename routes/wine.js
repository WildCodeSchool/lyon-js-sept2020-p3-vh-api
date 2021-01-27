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

wineRoute.get("/", asyncHandler(handleWineGetAll));
wineRoute.get("/:id", asyncHandler(handleWineGetOne));
wineRoute.post("/", handleImageUpload, asyncHandler(handleWinePost));
wineRoute.put("/:id", handleImageUpload, asyncHandler(handleWinePutOne));
wineRoute.delete("/:id", asyncHandler(handleWineDeleteOne));

module.exports = wineRoute;
