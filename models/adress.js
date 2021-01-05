const db = require('../db.js');
const { RecordNotFoundError, } = require('../error-types');

const findOne = async (id, failIfNotFound = true) => {
    const rows = await db.query(`SELECT * FROM address WHERE id = ?`, [id]);
    if (rows.length) {
      return rows[0];
    }
    if (failIfNotFound) throw new RecordNotFoundError('address', id);
    return null;
  };


const findById = async (id, failIfNotFound = true) => {
    const rows = await db.query('SELECT * FROM address WHERE id = ?', [id]);
    if (rows.length) {
      return rows[0];
    }
    if (failIfNotFound) throw new RecordNotFoundError
    return null;
  }


const findAddress = async () => {
    const rows = await db.query('SELECT * FROM address');
    if (rows.lenght === 0) {
        return null
    }
    return rows;
}

const createAddress = async (req) => {
    const { name, image } = req.body;
    return db.query
    (`INSERT INTO address (name, image) VALUES (?, ?)`, [name, image])
    .then((res) => findById(res.insertId));
  };

  const updateAddress = async (req) => { 
    const { id, name, image } = req.body 
    const rows = await db.query('UPDATE address SET WHERE id = ?', [id, name, image])
      .then(() => findOne(rows));
  };
  
  const deleteAddress = async (id, failIfNotFound = true) => {
    const res = await db.query('DELETE FROM address WHERE id = ?', [id]);
    if (res.affectedRows !== 0) {
      return true;
    }
    if (failIfNotFound) throw new RecordNotFoundError('address', id);
    return false;
  };
  
  

module.exports = { findAddress, createAddress, updateAddress, deleteAddress };