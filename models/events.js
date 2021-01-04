const Joi = require('joi').extend(require('@joi/date'));
const definedAttributesToSqlSet = require('../helpers/definedAttributesToSQLSet.js');
const {ValidationError, RecordNotFoundError } = require('../error-types')
const db = require ('../db.js')

// validate datas on update or create
const validate = async (attributes) => {
  const schema = Joi.object().keys({
    date: Joi.date().format('YYYY-MM-DD').required().messages({'any.required':'La date est manquante','format' :"Le format de la date n'est pas correct. Merci de saisir une date sous la forme "}),
    title:Joi.string().required().max(100).messages({ 'any.required':"Le titre de l'événement est manquant",'string.max':"Le titre de l'événement ne doit pas excéder 100 caractères'"}),
    price: Joi.number().required().messages({'any.required': 'Le prix est manquant', 'number':"Le prix contients des caractères invalides"}),
    description: Joi.string().required().messages({ 'any.required':'La descrption est manquante', 'string.empty': 'La description est manquante' }),
    moderator_id: Joi.number().integer().required().messages({ 'any.required' :'Le modérateur est manquant', 'number':"Le modérateur n'est pas valide", 'integer':"Le modérateur n'est pas valide"}),
    duration_seconds: Joi.number().integer().required().messages({ 'any.required' :'La durée est manquante', 'number':"La durée n'est pas valide", 'integer':"La durée n'est pas valide"}),
    main_picture_url: Joi.string().max(255).messages({'string.max': "Le lien de l'image dépasse la limite de 255 caractères"}),
    address_id: Joi.number().integer().required().messages({ 'any.required' :"L'adresse est manquante", 'number':"L'adresse n'est pas valide", 'integer':"L'adresse n'est pas valide"}),
  });
  const { error } = schema.validate(attributes, {
    abortEarly: false,
  });
  if (error) throw new ValidationError([
    { message: error.details.map(err => err.message), path: ['joi'], type: 'unique' },
  ]);
}

/// MODELS ///

// find one event by his id
const findOneEvent = async (id, failIfNotFound = true) => {
  const eventId = id
  const rows = await db.query('SELECT * FROM event WHERE id=?', [eventId]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError('event', eventId);
  return null;
};

// find all events in database
const findAllEvents = async () => {
  return db.query('SELECT * FROM event');
}

// create an event
const createEvent = async (datas) => {
  await validate(datas);
  return db.query(`INSERT INTO event SET ${definedAttributesToSqlSet(datas)}`, datas)
  .then((res) => findOneEvent(res.insertId))
  };

// delete one event by his Id
const deleteEvent = async (id, failIfNotFound = true) => {
    const res = await db.query('DELETE FROM event WHERE id=?', [id]);
    if (res.affectedRows !== 0) {
      return true;
    }
    if (failIfNotFound) throw new RecordNotFoundError('event', id);
    return false;
};
// update one event by his id

const updateEvent = async (id, newAttributes) => {
  await validate(newAttributes, { udpatedRessourceId: id });
  const namedAttributes = definedAttributesToSqlSet(newAttributes);
  return db
    .query(`UPDATE event SET ${namedAttributes} WHERE id = :id`, {
      ...newAttributes,
      id,
    })
    .then(() => findOneEvent(id));
};

module.exports = { findAllEvents, createEvent, updateEvent, deleteEvent }