// const { countBy } = require('lodash');
const argon2 = require('argon2');
const {ValidationError, RecordNotFoundError } = require('../error-types')
const db = require ('../db.js')

const verifyPassword = async(user, plainPassword) => {
  return argon2.verify(user.encrypted_password, plainPassword)
}

const emailAlreadyExists = async (email) => {
    const rows = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length) {
      return true
    }
    return false;
}

const validate = async (datas) => {
  const {firstname, lastname, password, password_confirmation, email } = datas;
  if (firstname && lastname && email && password && password_confirmation) {
      if (password === password_confirmation) {   
        const emailExists = await(emailAlreadyExists(email));
        if(emailExists) throw new ValidationError();
        return true
      }
  }
  throw new ValidationError();
}

const hashPassword = async (password) => argon2.hash(password);

const createUser = async (datas) => {
  await validate(datas);
  const { firstname, lastname, email, password } = datas;
  const encrypted_password = await hashPassword(password);
  const dbres = await db.query('INSERT INTO user(firstname, lastname, email, encrypted_password) VALUES(?, ?, ?, ?)',  [firstname, lastname, email, encrypted_password]);
  return { email, id: dbres.insertId }
}

const findByEmail = async (email, failIfNotFound = true) => {
  const rows = await db.query('SELECT * FROM user WHERE email = ?', [email]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError
  return null;
}

const findAll = async () => {
    return db.query('SELECT * FROM user');
}

const findOne = async (req) => {
    const userId = req.params.id
    return db.query('SELECT * FROM user WHERE id=?', [userId]);
}

// const deleteUser = async (req) => {
//     const userId = req.params.id
//     return db.query('DELETE FROM user WHERE id=userId', [userId]);
// }

// const updateUser = async (req) => {
//     const userId = req.params.id
//     if (req.body.role === 'moderator') {
//         const { firstname, lastname, email, password, phone_number, bio, photo, website, role, facebook_url, twitter_url, instagram_url } = req.body;
//         return db.query('UPDATE user SET firstname=?, lastname=?, email=?, password=?, phone_number=?, bio=?, photo=?, website=?, role=?, facebook_url=?, twitter_url=?, instagram_url=? WHERE id=?',  [firstname, lastname, email, password, phone_number, bio, photo, website, role, facebook_url, twitter_url, instagram_url, userId]);
//     } 
//         const { firstname, lastname, email, password, phone_number} = req.body;
//         return db.query('UPDATE user SET firstname=?, lastname=?, email=?, password=?, phone_number=? WHERE id=?',  [firstname, lastname, email, password, phone_number, userId]);
    
    
// }

module.exports = { createUser, verifyPassword, findByEmail, findAll, findOne}