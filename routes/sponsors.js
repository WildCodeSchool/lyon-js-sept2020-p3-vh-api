const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const Sponsor = require('../controllers/sponsors.js');
const protectByApiKey = require('../middlewares/protectByEnvAPIKey');
// const requireAdmin = require('../middlewares/requireAdmin.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');


router.get('/', protectByApiKey, asyncHandler(Sponsor.handleAllSponsor));

router.post(
  '/',
  protectByApiKey,
  requireRequestBody,
  asyncHandler(Sponsor.handleCreateSponsor)
);

router.put(
  '/:id',
  requireRequestBody,
  protectByApiKey,
  asyncHandler(Sponsor.handleUpdateSponsor)
);
router.delete('/:id', protectByApiKey, asyncHandler(Sponsor.handleDeleteSponsor));

exports = module.exports = router;