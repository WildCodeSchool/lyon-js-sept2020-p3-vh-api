const asyncHandler = require('express-async-handler');
const animatorsRouter = require('express').Router();
const {
  handleGetAllAnimators,
  handleGetOneAnimator,
  handleOnePostAnimator,
  handlePutOneAnimator,
  handleDeleteOneAnimator,
} = require('../controllers/contact');

animatorsRouter.get('/', asyncHandler(handleGetAllAnimators));
animatorsRouter.get('/:id', asyncHandler(handleGetOneAnimator));
animatorsRouter.post('/', asyncHandler(handleOnePostAnimator));
animatorsRouter.put('/:id', asyncHandler(handlePutOneAnimator))
animatorsRouter.delete('/:id', asyncHandler(handleDeleteOneAnimator));

module.exports = animatorsRouter;