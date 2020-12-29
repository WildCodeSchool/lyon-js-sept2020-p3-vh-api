const Joi = require('joi');
const definedAttributesToSqlSet = require('../helpers/definedAttributesToSQLSet.js');
const {ValidationError, RecordNotFoundError } = require('../error-types')
const db = require ('../db.js')


// validate datas on update or create
const validate = async (attributes, options = { udpatedRessourceId: null }) => {
  const { udpatedRessourceId } = options;
  const forUpdate = !!udpatedRessourceId;
  const schema = Joi.object().keys({
    date: forUpdate
      ? Joi.date().format("DD/MM/YYYY").allow('').messages({'date':'La date est manquante','format' :"Le format de la date n'est pas correct. Merci de saisir une date sous la forme "})
      : Joi.date().format("DD/MM/YYYY").required().messages({'required':'La date est manquante','format' :"Le format de la date n'est pas correct. Merci de saisir une date sous la forme "}),
    title: forUpdate
      ? Joi.string().min(1).max(100).allow('').messages({ 'string.min':"Le titre de l'événement est manquant",'string.max':"Le titre de l'événement ne doit pas excéder 100 caractères'"})
      : Joi.string().min(1).max(100).messages({ 'string.min':"Le titre de l'événement est manquant",'string.max':"Le titre de l'événement ne doit pas excéder 100 caractères'"}),
    price: forUpdate 
    ? Joi.number().allow('').messages({'number':"Le prix contients des caractères invalides"}) 
    : Joi.number().allow('').required().messages({'required': 'Le prix est manquant', 'number':"Le prix contients des caractères invalides"}),
    description: forUpdate
      ? Joi.string().min(1).allow('').messages({ 'string.min':'La descrption est manquante' })
      : Joi.string().min(1).messages({ 'string.min':'La descrption est manquante' }),
    moderator_id: forUpdate
      ? Joi.number().integer().allow('').messages({ 'number':"Le modérateur n'est pas valide", 'integer':"Le modérateur n'est pas valide"})
      : Joi.number().integer().required().messages({ 'required' :'Le modérateur est manquant', 'number':"Le modérateur n'est pas valide", 'integer':"Le modérateur n'est pas valide"}),
    duration_seconds: forUpdate
      ? Joi.number().integer().allow('').messages({ 'number':"La durée n'est pas valide", 'integer':"La durée n'est pas valide"})
      : Joi.number().integer().required().messages({ 'required' :'La durée est manquante', 'number':"La durée n'est pas valide", 'integer':"La durée n'est pas valide"}),
    main_picture_url: forUpdate
      ? Joi.string().max(255).allow('').messages({'string.max' :"Le lien de l'image dépasse la limite de 255 caractères"})
      : Joi.string().max(255).allow('').messages({'string.max': "Le lien de l'image dépasse la limite de 255 caractères"}),
    address_id: forUpdate
      ? Joi.number().integer().allow('').messages({ 'number':"L'adresse n'est pas valide", 'integer':"L'adresse n'est pas valide"})
      : Joi.number().integer().required().messages({ 'required' :"L'adresse est manquante", 'number':"L'adresse n'est pas valide", 'integer':"L'adresse n'est pas valide"}),
  });
  const { error } = schema.validate(attributes, {
    abortEarly: false,
  });
  if (error) throw new ValidationError([
    { message: error.details.map(err => err.message), path: ['joi'], type: 'unique' },
  ]);
}

/// MODELS ///

// find one user by his id
const findOneEvent = async (id, failIfNotFound = true) => {
  const eventId = id
  const rows = await db.query('SELECT * FROM event WHERE id=?', [eventId]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError('users', eventId);
  return null;
};

// find all users in database
const findAllEvents = async () => {
    return db.query('SELECT * FROM event');
}

// create an user
const createEvent = async (datas) => {
  await validate(datas);
  return db.query(`INSERT INTO user SET ${definedAttributesToSqlSet(datas)}`, datas
  .then((res) => findOneEvent(res.insertId))
  )};

// delete one user by his Id
const deleteEvent = async (id, failIfNotFound = true) => {
    const res = await db.query('DELETE FROM user WHERE id=?', [id]);
    if (res.affectedRows !== 0) {
      return true;
    }
    if (failIfNotFound) throw new RecordNotFoundError('users', id);
    return false;
};
// update one user by his id

const updateEvent = async (id, newAttributes) => {
  await validate(newAttributes, { udpatedRessourceId: id });
  const namedAttributes = definedAttributesToSqlSet(newAttributes);
  return db
    .query(`UPDATE user SET ${namedAttributes} WHERE id = :id`, {
      ...newAttributes,
      id,
    })
    .then(() => findOneEvent(id));
};

module.exports = { findAllEvents, createEvent, updateEvent, deleteEvent }