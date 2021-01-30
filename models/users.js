const argon2 = require("argon2");
const Joi = require("joi");
const crypto = require("crypto");
// const moment = require("moment");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");
const { ValidationError, RecordNotFoundError } = require("../error-types");
const db = require("../db.js");
const { SENDINBLUE_API_KEY, CLIENT_URL } = require("../env");

const findAllAnim = async () => {
  return db.query(`SELECT * FROM user WHERE role = "animator"`);
};

// find one user by his id
const findOne = async (id, failIfNotFound = true) => {
  const userId = id;
  const rows = await db.query("SELECT * FROM user WHERE id=?", [userId]);
  if (rows.length) {
    delete rows[0].encrypted_password;
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("users", userId);
  return null;
};

/// / HELPERS ////

// hash password
const hashPassword = async (password) => argon2.hash(password);

// verify password between plain password and encrypted password
const verifyPassword = async (user, plainPassword) => {
  return argon2.verify(user.encrypted_password, plainPassword);
};

// verify if email already exists in the database
const emailAlreadyExists = async (email) => {
  const rows = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  if (rows.length) {
    return true;
  }
  return false;
};

// validate datas on update or create
const validate = async (attributes, options = { udpatedRessourceId: null }) => {
  const { udpatedRessourceId } = options;
  const forUpdate = !!udpatedRessourceId;
  const schema = Joi.object().keys({
    firstname: forUpdate
      ? Joi.string()
          .min(1)
          .max(70)
          .regex(/^[a-z ,.'-]+$/i)
          .messages({
            "string.min": "Prénom manquant",
            "string.max": "Le prénom ne doit pas excéder 30 caractères",
            "string.pattern.base":
              "Votre prénom contient des caractères non autorisés",
          })
      : Joi.string()
          .min(1)
          .max(70)
          .required()
          .regex(/^[a-z ,.'-]+$/i)
          .messages({
            "string.min": "Prénom manquant",
            "string.max": "Le prénom ne doit pas excéder 30 caractères",
            "string.pattern.base":
              "Votre prénom contient des caractères non autorisés",
          }),
    lastname: forUpdate
      ? Joi.string()
          .min(1)
          .max(70)
          .regex(/^[a-z ,.'-]+$/i)
          .messages({
            "string.min": "Nom manquant",
            "string.max": "Le nom ne doit pas excéder 70 caractères",
            "string.pattern.base":
              "Votre nom contient des caractères non autorisés",
          })
      : Joi.string()
          .min(1)
          .max(70)
          .required()
          .regex(/^[a-z ,.'-]+$/i)
          .messages({
            "string.min": "Nom manquant",
            "string.max": "Le nom ne doit pas excéder 70 caractères",
            "string.pattern.base":
              "Votre nom contient des caractères non autorisés",
          }),
    email: forUpdate
      ? Joi.string().email()
      : Joi.string().email().required().messages({
          required: "Email manquant",
          "string.email": "Votre email n'est pas valide",
        }),
    password: forUpdate
      ? Joi.string().min(8).max(25).messages({
          "string.min": "Le mot de passe doit comprendre au moins 8 caractères",
          "string.max":
            "Le mot de passe doit comprendre moins de 25 caractères",
        })
      : Joi.string().min(8).max(25).required().messages({
          "string.min": "Le mot de passe doit comprendre au moins 8 caractères",
          "string.max":
            "Le mot de passe doit comprendre moins de 25 caractères",
        }),
    phone_number: forUpdate
      ? Joi.string().max(30).allow("").messages({
          "string.max":
            "Le numéro de téléphone ne doit pas dépasser 30 caractères",
        })
      : Joi.string().max(30).allow("").messages({
          "string.max":
            "Le numéro de téléphone ne doit pas dépasser 30 caractères",
        }),
    bio: forUpdate ? Joi.string().allow("") : Joi.string().allow(""),
    role: forUpdate ? Joi.string().allow("") : Joi.string().allow(""),
    photo_url: forUpdate ? Joi.allow("") : Joi.allow(""),
    website_url: forUpdate ? Joi.string().allow("") : Joi.string().allow(""),
    instagram_url: forUpdate ? Joi.string().allow("") : Joi.string().allow(""),
    facebook_url: forUpdate ? Joi.string().allow("") : Joi.string().allow(""),
    twitter_url: forUpdate ? Joi.string().allow("") : Joi.string().allow(""),
    password_confirmation: Joi.when("password", {
      is: Joi.string().min(8).max(30).required(),
      then: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Les mots de passe ne correspondent pas" }),
    }),
  });

  const { error } = schema.validate(attributes, {
    abortEarly: false,
  });
  if (error)
    throw new ValidationError([
      {
        message: error.details.map((err) => err.message),
        path: ["joi"],
        type: "unique",
      },
    ]);

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
        { message: ["Cet email existe déjà"], path: ["email"], type: "unique" },
      ]);
    }
  }
};

const validatePasswords = async (attributes) => {
  const schema = Joi.object().keys({
    newPassword: Joi.string().min(8).max(25).required().messages({
      "string.min": "Le mot de passe doit comprendre au moins 8 caractères",
      "string.max": "Le mot de passe doit comprendre moins de 25 caractères",
    }),
    newPasswordConfirmation: Joi.when("password", {
      is: Joi.string().min(8).max(30).required(),
      then: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Les mots de passe ne correspondent pas" }),
    }),
  });

  const { error } = schema.validate(attributes, {
    abortEarly: false,
  });
  if (error)
    throw new ValidationError([
      {
        message: error.details.map((err) => err.message),
        path: ["joi"],
        type: "unique",
      },
    ]);
};

/// / MODELS ////

// find an user by his email
const findByEmail = async (email, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound)
    throw new RecordNotFoundError("Cette adresse mail n'existe pas", email);
  return null;
};

// find all users in database
const findAll = async () => {
  return db.query(`SELECT * FROM user`);
};

// create an user
const createUser = async (datas) => {
  await validate(datas);
  const { password, password_confirmation, ...datasWithoutPasswords } = datas; // remove passwords from datas object
  const encrypted_password = await hashPassword(password); // encrypt password with argon2
  const datasToSave = { ...datasWithoutPasswords, encrypted_password }; // add encrypted password
  return db
    .query(
      `INSERT INTO user SET ${definedAttributesToSqlSet(datasToSave)}`,
      datasToSave
    )
    .then((res) => findOne(res.insertId));
};

// delete one user by his Id
const deleteUser = async (id, failIfNotFound = true) => {
  const res = await db.query("DELETE FROM user WHERE id=?", [id]);
  if (res.affectedRows !== 0) {
    return true;
  }
  if (failIfNotFound) throw new RecordNotFoundError("users", id);
  return false;
};
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

const sendLinkToResetPassword = (datas) => {
  const { email, token, userId, firstname, lastname } = datas;
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = SENDINBLUE_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Mise à jour de votre mot de passe";
  sendSmtpEmail.htmlContent = `<html><body><h1>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe</h1>
  <a href=${CLIENT_URL}reset/${userId}/${token}>Cliquez ici</a></body></html>`;
  sendSmtpEmail.sender = {
    name: firstname + lastname,
    email: "hypnose.et.vin@gmail.com",
  };
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.replyTo = {
    email: "hypnose.et.vin@gmail.com",
    name: firstname + lastname,
  };

  try {
    apiInstance.sendTransacEmail(sendSmtpEmail);
    return;
  } catch (err) {
    console.error(err);
  }
};

// find one user by his id in forgot_password table
const findOneInForgotPassword = async (id) => {
  const userId = id;
  const rows = await db.query("SELECT * FROM forgot_password WHERE userId=?", [
    userId,
  ]);
  if (rows.length) {
    return rows[0];
  }
  return false;
};

const resetPassword = async (email) => {
  const user = await findByEmail(email);
  const { firstname, lastname } = user;
  const userId = user.id;
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = await argon2.hash(token);
  const hasAlreadyReset = await findOneInForgotPassword(userId);
  // const expire = moment.utc();
  if (hasAlreadyReset) {
    await db.query("DELETE FROM `forgot_password` WHERE userId = ?", [userId]);
    await db.query(
      "INSERT INTO `forgot_password` (userId, resetPasswordToken) VALUES (?, ?)",
      [userId, hashedToken]
    );
  } else {
    await db.query(
      "INSERT INTO `forgot_password` (userId, resetPasswordToken) VALUES (?, ?)",
      [userId, hashedToken]
    );
  }
  await sendLinkToResetPassword({ email, token, userId, firstname, lastname });
};

const storePassword = async (datas) => {
  const { userId, newPassword, newPasswordConfirmation, token } = datas;
  await validatePasswords({ newPassword, newPasswordConfirmation });
  const isUserIdExist = await findOneInForgotPassword(userId);
  if (!isUserIdExist) {
    throw new RecordNotFoundError(
      "Erreur, veuillez refaire une demande de mot de passe",
      userId
    );
  } else {
    const verifyTokens = await argon2.verify(
      isUserIdExist.resetPasswordToken,
      token
    );
    if (verifyTokens) {
      const newHashedPassword = await argon2.hash(newPassword);
      return db.query("UPDATE user SET encrypted_password = ? WHERE id = ?", [
        newHashedPassword,
        userId,
      ]);
    }
    throw new RecordNotFoundError(
      "Erreur, veuillez refaire une demande de mot de passe",
      userId
    );
  }
};

module.exports = {
  createUser,
  verifyPassword,
  findByEmail,
  findAll,
  findOne,
  deleteUser,
  updateUser,
  findAllAnim,
  resetPassword,
  storePassword,
};
