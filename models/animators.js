const db = require('../db.js');
const { RecordNotFoundError } = require('../error-types');
const definedAttributesToSqlSet = require('../helpers/definedAttributesToSQLSet.js');

const getAllAnimators = async () => {
  return db.query('SELECT * FROM animators')
};

const getOneAnimator = async (id, failIfNotFound = true) => {
  const rows = await db.query('SELECT * FROM animators WHERE id = ?', [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};


const postOneAnimator = async (formData) => {
  return db
    .query(
      `INSERT INTO animators SET ${definedAttributesToSqlSet(formData)}`,
      formData
    )
    .then((res) => getOneAnimator(res.insertId));
};

const putOneAnimator = async (id, formData) => {
    const attribute = definedAttributesToSqlSet(formData);
    return db
      .query(`UPDATE animators SET ${attribute} WHERE id = :id`, {
        ...formData,
        id,
      })
      .then(() => getOneAnimator(id));
};


const deleteOneAnimator = async (req) => {
  const idAnimator = req.params.id
    return db.query('DELETE FROM animators WHERE id = ?'
    ,[idAnimator]
    )
  };




module.exports = {getAllAnimators,getOneAnimator, postOneAnimator,putOneAnimator, deleteOneAnimator };