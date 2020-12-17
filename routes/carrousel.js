const asyncHandler = require('express-async-handler');
const carrouselRouter = require('express').Router();

const {
  handleCarrouselPost,
  handleCarrouselDelete,
  handleCarrouselGet,
} = require('../controllers/carrousel');

carrouselRouter.get('/', asyncHandler(handleCarrouselGet));
carrouselRouter.post('/', asyncHandler(handleCarrouselPost));
carrouselRouter.delete('/:id', asyncHandler(handleCarrouselDelete));

module.exports = carrouselRouter;
