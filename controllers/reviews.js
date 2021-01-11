const {
  getReview,
  getOneReview,
  postReview,
  deleteReview,
} = require('../models/reviews');

module.exports.handleReviewGet = async (req, res) => {
  const rawData = await getReview(req);
  res.json(rawData);
};

module.exports.handleReviewGetOne = async (req, res) => {
  const data = await getOneReview(req.params.id);
  res.send(data);
};

module.exports.handleReviewPost = async (req, res) => {
  const rawData = await postReview(req.body);
  res.json(rawData);
};

module.exports.handleReviewDelete = async (req, res) => {
  await deleteReview(req);
  res.sendStatus(204);
};
