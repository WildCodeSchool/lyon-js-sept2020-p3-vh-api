// const Joi = require('joi');
const db = require("../db.js");
const { RecordNotFoundError } = require("../error-types");

const findOne = async (id, failIfNotFound = true) => {
  const rows = await db.query(`SELECT * FROM sponsors WHERE id = ?`, [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("sponsors", id);
  return null;
};

const findById = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM sponsors WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};

const findSponsor = async () => {
  const rows = await db.query("SELECT * FROM sponsors");
  if (rows.lenght === 0) {
    return null;
  }
  return rows;
};

const createSponsor = async (datas) => {
  const { name, image } = datas;
  return db
    .query(`INSERT INTO sponsors (name, image) VALUES (?, ?)`, [name, image])
    .then((res) => findById(res.insertId));
};

const updateSponsor = async (newAttributes) => {
  const { id, name, image } = newAttributes;
  return db
    .query(`UPDATE sponsors SET name = ?, image = ? WHERE id = ?`, [
      name,
      image,
      id,
    ])
    .then(() => findOne(id));
};

const deleteSponsor = async (id, failIfNotFound = true) => {
  const res = await db.query("DELETE FROM sponsors WHERE id = ?", [id]);
  if (res.affectedRows !== 0) {
    return true;
  }
  if (failIfNotFound) throw new RecordNotFoundError("sponsors", id);
  return false;
};

module.exports = {
  findSponsor,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  findOne,
  findById,
};
