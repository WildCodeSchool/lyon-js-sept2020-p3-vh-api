const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Sponsor = require("../controllers/sponsors.js");
// const requireAdmin = require('../middlewares/requireAdmin.js');
const requireRequestBody = require("../middlewares/requireRequestBody.js");
const handleImageUpload = require("../middlewares/handleImageUpload");

router.get("/", asyncHandler(Sponsor.handleAllSponsor));

router.get("/:id", asyncHandler(Sponsor.handleOneSponsor));

router.post(
  "/",
  handleImageUpload,
  requireRequestBody,
  asyncHandler(Sponsor.handleCreateSponsor)
);

router.put(
  "/:id",
  handleImageUpload,
  requireRequestBody,
  asyncHandler(Sponsor.handleUpdateSponsor)
);
router.delete("/:id", asyncHandler(Sponsor.handleDeleteSponsor));

module.exports = router;
