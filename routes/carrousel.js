const asyncHandler = require('express-async-handler');
const carrouselRouter = require('express').Router();
const protectByApiKey = require('../middlewares/protectByApiKey');

const {
  handleCarrouselPost,
  handleCarrouselDelete,
  handleCarrouselGet,
} = require('../controllers/carrousel');

carrouselRouter.get('/', protectByApiKey, asyncHandler(handleCarrouselGet));
carrouselRouter.post('/', protectByApiKey, asyncHandler(handleCarrouselPost));
carrouselRouter.delete(
  '/:id',
  protectByApiKey,
  asyncHandler(handleCarrouselDelete)
);

module.exports = carrouselRouter;
