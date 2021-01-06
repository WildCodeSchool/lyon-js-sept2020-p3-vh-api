const asyncHandler = require('express-async-handler');
const reviewRouter = require('express').Router();

const {
  handleReviewPost,
  handleReviewDelete,
  handleReviewGet,
} = require('../controllers/reviews');

reviewRouter.get('/', asyncHandler(handleReviewGet));
reviewRouter.post('/', asyncHandler(handleReviewPost));
reviewRouter.delete('/:id', asyncHandler(handleReviewDelete));

module.exports = reviewRouter;
