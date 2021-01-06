const { getReview, postReview, deleteReview } = require('../models/reviews');

module.exports.handleReviewGet = async (req, res) => {
  const rawData = await getReview(req);
  res.json(rawData);
};

module.exports.handleReviewPost = async (req, res) => {
  const rawData = await postReview(req);
  res.json(rawData);
};

module.exports.handleReviewDelete = async (req, res) => {
  await deleteReview(req);
  res.sendStatus(204);
};
