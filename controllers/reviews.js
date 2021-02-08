const {
  getReview,
  getOneReview,
  getReviewPerUserPerEvent,
  postReview,
  deleteReview,
} = require("../models/reviews");

module.exports.handleReviewGet = async (req, res) => {
  const rawData = await getReview(req);
  const allReviewsLength = await getReview();
  res.set("X-Total-Count", allReviewsLength.length);
  res.json(rawData);
};

module.exports.handleReviewGetPerUserPerEvent = async (req, res) => {
  const rawData = await getReviewPerUserPerEvent(
    req.params.user_id,
    req.params.event_id
  );
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
