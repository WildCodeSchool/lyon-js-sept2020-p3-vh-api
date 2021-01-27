const asyncHandler = require("express-async-handler");
const carrouselRouter = require("express").Router();
const handleImageUpload = require("../middlewares/handleImageUpload");

const {
  handleCarrouselPost,
  handleCarrouselDelete,
  handleCarrouselGet,
  handleOneCarrousel,
} = require("../controllers/carrousel");

carrouselRouter.get("/", asyncHandler(handleCarrouselGet));
carrouselRouter.get("/:id", asyncHandler(handleOneCarrousel));
carrouselRouter.post("/", handleImageUpload, asyncHandler(handleCarrouselPost));
carrouselRouter.delete("/:id", asyncHandler(handleCarrouselDelete));

module.exports = carrouselRouter;
