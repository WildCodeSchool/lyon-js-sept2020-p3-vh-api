const asyncHandler = require("express-async-handler");
const carrouselRouter = require("express").Router();
const handleImageUpload = require("../middlewares/handleImageUpload");
const requireAdmin = require("../middlewares/requireAdmin.js");

const {
  handleCarrouselPost,
  handleCarrouselDelete,
  handleCarrouselGet,
  handleOneCarrousel,
} = require("../controllers/carrousel");

carrouselRouter.get("/", asyncHandler(handleCarrouselGet));
carrouselRouter.get("/:id", asyncHandler(handleOneCarrousel));
carrouselRouter.post(
  "/",
  requireAdmin,
  handleImageUpload,
  asyncHandler(handleCarrouselPost)
);
carrouselRouter.delete(
  "/:id",
  requireAdmin,
  asyncHandler(handleCarrouselDelete)
);

module.exports = carrouselRouter;
