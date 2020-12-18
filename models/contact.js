const db = require('../db.js');
const { RecordNotFoundError } = require('../error-types');
const definedAttributesToSqlSet = require('../helpers/definedAttributesToSQLSet.js');

const getAllMessages = async () => {
  return db.query('SELECT * FROM messages')
};

const getOneMessage = async (id, failIfNotFound = true) => {
  const rows = await db.query('SELECT * FROM messages WHERE id = ?', [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};


const postOneMessage = async (formData) => {
  return db
    .query(
      `INSERT INTO messages SET ${definedAttributesToSqlSet(formData)}`,
      formData
    )
    .then((res) => getOneMessage(res.insertId));
};

const deleteOneMessage = async (req) => {
  const idMessage = req.params.id
    return db.query('DELETE FROM messages WHERE id = ?'
    ,[idMessage]
    )
  };




module.exports = {getAllMessages,getOneMessage, postOneMessage, deleteOneMessage };