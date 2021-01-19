const asyncHandler = require('express-async-handler');
const carrouselRouter = require('express').Router();

const {
  handleCarrouselPost,
  handleCarrouselDelete,
  handleCarrouselGet,
  handleOneCarrousel,
} = require('../controllers/carrousel');

carrouselRouter.get('/', asyncHandler(handleCarrouselGet));
carrouselRouter.get('/:id', asyncHandler(handleOneCarrousel));
carrouselRouter.post('/', asyncHandler(handleCarrouselPost));
carrouselRouter.delete('/:id', asyncHandler(handleCarrouselDelete));

module.exports = carrouselRouter;
