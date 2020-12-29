const { findAllEvents, createEvent, updateEvent, deleteEvent } = require('../models/events');

module.exports.handleAllEvents = async (req, res) => {
 const datas = await findAllEvents();
 res.send(datas.map(({ id, email }) => ({ id, email })));
};

module.exports.handleCreateEvent = async (req, res) => {
 const { date, title, price , description, moderator_id, duration_seconds, main_picture_url, address_id } = req.body;
 const createdUserId = await createEvent({date, title, price , description, moderator_id, duration_seconds, main_picture_url, address_id});
 return res.status(201).json(createdUserId)
  };

module.exports.handleUpdateEvent = async (req, res) => {
 const { date, title, price , description, moderator_id, duration_seconds, main_picture_url, address_id } = req.body;
 const attributes = {date, title, price , description, moderator_id, duration_seconds, main_picture_url, address_id };
 const data = await updateEvent(req.params.id, attributes);
 res.send(data);
};

module.exports.handleDeleteEvent = async (req, res) => {
  await deleteEvent(req.params.id);
  return res.sendStatus(204)
};