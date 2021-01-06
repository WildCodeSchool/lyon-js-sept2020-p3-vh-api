const { findAllEvents, findOneEvent, createEvent, updateEvent, deleteEvent } = require('../models/events');

module.exports.handleAllEvents = async (req, res) => {
 const datas = await findAllEvents();
 res.send(datas.map(({ id, date, title, price, description, moderator_id, duration_seconds, main_picture_url, address_id, street, zipcode, city, firstname, lastname, email, phone_number, bio, role, photo_url, website_url, facebook_url, twitter_url, instagram_url }) => ({ id, date, title, price, description, moderator_id, duration_seconds, main_picture_url, address_id, street, zipcode, city, firstname, lastname, email, phone_number, bio, role, photo_url, website_url, facebook_url, twitter_url, instagram_url })));
};

module.exports.handleAnEvent = async (req, res) => {
  res.send(await findOneEvent(req.params.id));
}

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