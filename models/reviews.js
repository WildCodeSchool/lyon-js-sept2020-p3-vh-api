const db = require('../db.js');
const { RecordNotFoundError } = require('../error-types');

const getOneReview = async (id, failIfNotFound = true) => {
  const rows = await db.query('SELECT * FROM review WHERE id = ?', [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError('review', id);
  return null;
};

const getReview = async () => {
  return db.query('SELECT * FROM review');
};

const postReview = async (req) => {
  const { rating, comment } = req.body;
  return db
    .query('INSERT INTO review (rating, comment) VALUES (?, ?)', [
      rating,
      comment,
    ])
    .then((res) => getOneReview(res.insertId));
};

const deleteReview = async (req) => {
  const reviewId = req.params.id;
  return db.query('DELETE FROM review WHERE id = ?', [reviewId]);
};

module.exports = { getReview, getOneReview, postReview, deleteReview };
