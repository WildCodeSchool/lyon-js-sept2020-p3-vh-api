const Joi = require("joi");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const db = require("../db.js");
const { RecordNotFoundError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");
const { ValidationError } = require("../error-types");
const { SENDINBLUE_API_KEY, MAIL_TO } = require("../env");

const validate = (datas) => {
  const schema = Joi.object().keys({
    firstname: Joi.string()
      .min(1)
      .max(70)
      .required()
      .regex(/^[a-z ,.'-]+$/i)
      .messages({
        "string.min": "Merci d'indiquer votre prénom",
        "string.max": "Votre prénom ne doit pas excéder 70 caractères",
        "string.pattern.base":
          "Votre prénom contient des caractères non autorisés",
      }),
    lastname: Joi.string()
      .min(1)
      .max(70)
      .required()
      .regex(/^[a-z ,.'-]+$/i)
      .messages({
        "string.min": "Merci d'indiquer votre nom",
        "string.max": "Votre nom ne doit pas excéder 70 caractères",
        "string.pattern.base":
          "Votre nom contient des caractères non autorisés",
      }),
    email: Joi.string().email().required().messages({
      required: "Merci d'indiquer votre email",
      "string.email": "Votre email n'est pas valide",
    }),
    message: Joi.string()
      .required()
      .messages({ required: "Merci de saisir un message" }),
    purpose: Joi.string()
      .required()
      .messages({ required: "Merci de choisir un sujet" }),
  });
  const { error } = schema.validate(datas, {
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

const sendMail = (datas) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = SENDINBLUE_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  const { firstname, lastname, email, message, purpose } = datas;
  sendSmtpEmail.subject = "Vous avez un nouveau message";
  sendSmtpEmail.htmlContent = `<html><body><h1>Vous avez reçu un nouveau message de ${firstname} ${lastname}</h1><p>Mail de l'expéditeur : ${email}</p><p>Sujet : ${purpose}</p><p>Message : ${message}</p></body></html>`;
  sendSmtpEmail.sender = { name: `${firstname} ${lastname}`, email };
  sendSmtpEmail.to = [{ email: MAIL_TO }];
  sendSmtpEmail.replyTo = { email, name: `${firstname} ${lastname}` };

  try {
    apiInstance.sendTransacEmail(sendSmtpEmail);
    return;
  } catch (err) {
    console.error(err);
  }
};

const newSubscriber = (email) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = SENDINBLUE_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Demande d'ajout à la newsletter";
  sendSmtpEmail.htmlContent = `<html><body><h1>Vous avez une nouvelle demande d'ajout à la newsletter</h1><p>Mail de l'expéditeur : ${email}</p></body></html>`;
  sendSmtpEmail.sender = { name: "Visiteur", email };
  sendSmtpEmail.to = [{ email: MAIL_TO }];
  sendSmtpEmail.replyTo = { email, name: `Visiteur` };

  try {
    apiInstance.sendTransacEmail(sendSmtpEmail);
    return;
  } catch (err) {
    console.error(err);
  }
};

const getAllMessages = async (req) => {
  let request = "SELECT * from messages";
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

const getOneMessage = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM messages WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};

const postOneMessage = async (formData) => {
  await validate(formData);
  await sendMail(formData);
  return db
    .query(
      `INSERT INTO messages SET ${definedAttributesToSqlSet(formData)}`,
      formData
    )
    .then((res) => getOneMessage(res.insertId));
};

const subscribeNewsletter = async (email) => {
  await newSubscriber(email);
};

const deleteOneMessage = async (req) => {
  const idMessage = req.params.id;
  return db.query("DELETE FROM messages WHERE id = ?", [idMessage]);
};

module.exports = {
  getAllMessages,
  getOneMessage,
  postOneMessage,
  deleteOneMessage,
  subscribeNewsletter,
};
