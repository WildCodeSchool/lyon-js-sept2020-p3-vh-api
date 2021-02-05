const db = require("../db.js");
const { RecordNotFoundError } = require("../error-types");

const findOne = async (id, failIfNotFound = true) => {
  const rows = await db.query(`SELECT * FROM carrousel WHERE id = ?`, [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("carrousel", id);
  return null;
};

const findById = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM carrousel WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("carrousel", id);
  return null;
};

const getPhoto = async (req) => {
  let request = "SELECT * from carrousel";
  if (req) {
    if (req.query.sort) {
      const parsedSort = JSON.parse(req.query.sort);
      request += ` ORDER BY ${parsedSort[0]} ${parsedSort[1]}`;
    }
    if (req.query.range) {
      const parsedRange = JSON.parse(req.query.range);
      request += ` LIMIT ${parsedRange[0]} OFFSET ${parsedRange[1]}`;
    }
  }
  return db.query(request);
};

const postPhoto = async (datas) => {
  const { name, description, image } = datas;
  return db
    .query(
      "INSERT INTO carrousel (name, description, image) VALUES (?, ?, ?)",
      [name, description, image]
    )
    .then((res) => findById(res.insertId));
};

const deletePhoto = async (req) => {
  const photoId = req.params.id;
  return db.query("DELETE FROM carrousel WHERE id= ?", [photoId]);
};

module.exports = { findOne, findById, getPhoto, postPhoto, deletePhoto };
