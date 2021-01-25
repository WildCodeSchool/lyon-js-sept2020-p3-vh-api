const asyncHandler = require('express-async-handler');
const reviewsRouter = require('express').Router();
const requireRequestBody = require('../middlewares/requireRequestBody');

const {
  handleReviewPost,
  handleReviewDelete,
  handleReviewGet,
  handleReviewGetOne,
} = require('../controllers/reviews.js');

reviewsRouter.get('/', asyncHandler(handleReviewGet));
reviewsRouter.get('/:id', asyncHandler(handleReviewGetOne));
reviewsRouter.post('/', requireRequestBody, asyncHandler(handleReviewPost));
reviewsRouter.delete('/:id', asyncHandler(handleReviewDelete));

module.exports = reviewsRouter;
