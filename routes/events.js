const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {handleAllEvents, handleCreateEvent, handleUpdateEvent, handleDeleteEvent} = require('../controllers/events.js');
const requireAdmin = require('../middlewares/requireAdmin.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');


router.get('/', asyncHandler(handleAllEvents));

router.post(
  '/',
  requireRequestBody,
  requireAdmin,
  asyncHandler(handleCreateEvent)
);

router.put(
  '/:id',
  requireRequestBody, requireAdmin,
  asyncHandler(handleUpdateEvent)
);
router.delete('/:id', requireAdmin, asyncHandler(handleDeleteEvent));

module.exports = router;