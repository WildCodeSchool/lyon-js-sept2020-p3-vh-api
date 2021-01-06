const asyncHandler = require('express-async-handler');
const reviewsRouter = require('express').Router();

const {
  handleReviewPost,
  handleReviewDelete,
  handleReviewGet,
  handleReviewGetOne,
} = require('../controllers/reviews');

reviewsRouter.get('/', asyncHandler(handleReviewGet));
reviewsRouter.get('/:id', asyncHandler(handleReviewGetOne));
reviewsRouter.post('/', asyncHandler(handleReviewPost));
reviewsRouter.delete('/:id', asyncHandler(handleReviewDelete));

module.exports = reviewsRouter;
