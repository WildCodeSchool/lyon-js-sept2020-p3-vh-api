const argon2 = require('argon2');
const Joi = require('joi');
const definedAttributesToSqlSet = require('../helpers/definedAttributesToSQLSet.js');
const {ValidationError, RecordNotFoundError } = require('../error-types')
const db = require ('../db.js')


// verify password between plain password and encrypted password
const verifyPassword = async(user, plainPassword) => {
  return argon2.verify(user.encrypted_password, plainPassword)
}

// verify if email already exists in the database 
const emailAlreadyExists = async (email) => {
    const rows = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length) {
      return true
    }
    return false;
}

// find one user by his id

const findOne = async (id, failIfNotFound = true) => {
  const userId = id
  const rows = await db.query('SELECT * FROM user WHERE id=?', [userId]);
  if (rows.length) {
    delete rows[0].encrypted_password;
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError('users', userId);
  return null;
};

// validate datas on update or create

const validate = async (attributes, options = { udpatedRessourceId: null }) => {
  const { udpatedRessourceId } = options;
  const forUpdate = !!udpatedRessourceId;
  const schema = Joi.object().keys({
    firstname: forUpdate
      ? Joi.string().min(1).max(70)
      : Joi.string().min(1).max(70).required(),
      lastname: forUpdate
      ? Joi.string().min(1).max(70)
      : Joi.string().min(1).max(70).required(),
    email: forUpdate ? Joi.string().email() : Joi.string().email().required(),
    password: forUpdate
      ? Joi.string().min(8).max(30)
      : Joi.string().min(8).max(30).required(),
    password_confirmation: Joi.when('password', {
      is: Joi.string().min(8).max(30).required(),
      then: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .messages({ 'any.only': 'password_confirmation does not match' }),
    }),
  });

  const { error } = schema.validate(attributes, {
    abortEarly: false,
  });
  if (error) throw new ValidationError(error.details);

  if (attributes.email) {
    let shouldThrow = false;
    if (forUpdate) {
      const toUpdate = await findOne(udpatedRessourceId);
      shouldThrow =
        !(toUpdate.email === attributes.email) &&
        (await emailAlreadyExists(attributes.email));
    } else {
      shouldThrow = await emailAlreadyExists(attributes.email);
    }
    if (shouldThrow) {
      throw new ValidationError([
        { message: 'email already taken', path: ['email'], type: 'unique' },
      ]);
    }
  }
};


const hashPassword = async (password) => argon2.hash(password);

const createUser = async (datas) => {
  await validate(datas);
  const { firstname, lastname, email, password } = datas;
  const encrypted_password = await hashPassword(password);
  return db.query('INSERT INTO user(firstname, lastname, email, encrypted_password) VALUES(?, ?, ?, ?)',  [firstname, lastname, email, encrypted_password])
  .then((res) =>(res.insertId))
}

// find an user by his email

const findByEmail = async (email, failIfNotFound = true) => {
  const rows = await db.query('SELECT * FROM user WHERE email = ?', [email]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError
  return null;
}

// find all users in database

const findAll = async () => {
    return db.query('SELECT * FROM user');
}



// delete one user by his Id

const deleteUser = async (req) => {
    const userId = req.params.id
    return db.query('DELETE FROM user WHERE id=?', [userId]);
}

// update one user by his id

const updateUser = async (id, newAttributes) => {
  await validate(newAttributes, { udpatedRessourceId: id });
  const { password, password_confirmation, ...otherAttributes } = newAttributes;
  const encrypted_password = password && (await argon2.hash(password));
  const attributesToSave = { ...otherAttributes, encrypted_password };
  const namedAttributes = definedAttributesToSqlSet(attributesToSave);
  return db
    .query(`UPDATE user SET ${namedAttributes} WHERE id = :id`, {
      ...attributesToSave,
      id,
    })
    .then(() => findOne(id));
};

module.exports = { createUser, verifyPassword, findByEmail, findAll, findOne, deleteUser, updateUser}