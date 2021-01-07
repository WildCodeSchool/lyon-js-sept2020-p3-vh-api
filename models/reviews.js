const db = require('../db.js');
const { RecordNotFoundError } = require('../error-types');

// helpers need to be done

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
  const { rating, id, comment, event_id, user_id } = req.body;
  return db
    .query(
      'INSERT INTO review (rating, id, comment, event_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [rating, id, comment, event_id, user_id]
    )
    .then((res) => getOneReview(res.insertId));
};

const deleteReview = async (req) => {
  const reviewId = req.params.id;
  return db.query('DELETE FROM review WHERE id = ?', [reviewId]);
};

module.exports = { getReview, getOneReview, postReview, deleteReview };
