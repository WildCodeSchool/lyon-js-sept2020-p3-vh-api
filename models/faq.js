const db = require("../db.js");
const { RecordNotFoundError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");

const getAllQuestions = async (req) => {
  let request = "SELECT * from faq";
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

const findQuestionById = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM faq WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};

const postOneQuestion = async (formData) => {
  return db
    .query(
      `INSERT INTO faq SET ${definedAttributesToSqlSet(formData)}`,
      formData
    )
    .then((res) => findQuestionById(res.insertId));
};

const putOneQuestion = async (id, formData) => {
  const attribute = definedAttributesToSqlSet(formData);
  return db
    .query(`UPDATE faq SET ${attribute} WHERE id = :id`, {
      ...formData,
      id,
    })
    .then(() => findQuestionById(id));
};
const deleteOneQuestion = async (id) => {
  await db.query("DELETE FROM faq WHERE id = ?", id);
};

module.exports = {
  getAllQuestions,
  findQuestionById,
  postOneQuestion,
  putOneQuestion,
  deleteOneQuestion,
};
