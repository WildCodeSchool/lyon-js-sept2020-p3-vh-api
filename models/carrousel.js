const db = require('../db.js');
const { RecordNotFoundError } = require('../error-types');

const findById = async (id, failIfNotFound = true) => {
  const rows = await db.query('SELECT * FROM carrousel WHERE id = ?', [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError('carrousel', id);
  return null;
};

const getPhoto = async () => {
  return db.query('SELECT * FROM carrousel');
};

const postPhoto = async (req) => {
  const { name, description, image } = req.body;
  return db
    .query(
      'INSERT INTO carrousel (name, description, image) VALUES (?, ?, ?)',
      [name, description, image]
    )
    .then((res) => findById(res.insertId));
};

const deletePhoto = async (req) => {
  const photoId = req.params.id;
  return db.query('DELETE FROM carrousel WHERE id= ?', [photoId]);
};

module.exports = { getPhoto, postPhoto, deletePhoto };
