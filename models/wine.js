const db = require("../db.js");
const { RecordNotFoundError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");

const getAllWine = async (req) => {
  let request = "SELECT * from wine";
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

const findById = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM wine WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};

const postOneWine = async (formData) => {
  return db
    .query(
      `INSERT INTO wine SET ${definedAttributesToSqlSet(formData)}`,
      formData
    )
    .then((res) => findById(res.insertId));
};

const putOneWine = async (id, formData) => {
  const attribute = definedAttributesToSqlSet(formData);
  return db
    .query(`UPDATE wine SET ${attribute} WHERE id = :id`, {
      ...formData,
      id,
    })
    .then(() => findById(id));
};

const deleteOneWine = async (id) => {
  await db.query("DELETE FROM wine WHERE id = ?", id);
};

module.exports = {
  getAllWine,
  findById,
  postOneWine,
  putOneWine,
  deleteOneWine,
};
