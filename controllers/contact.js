const { getAllMessages,getOneMessage, postOneMessage, deleteOneMessage  } = require('../models/contact.js');


module.exports.handleGetAllMessages = async (req, res) => {
  const rawData = await getAllMessages(req);
  res.json(rawData);
};

module.exports.handleGetOneMessage = async (req, res) => {
  const rawData = await getOneMessage(req);
  res.json(rawData);
};

module.exports.handleOneMessagePost = async (req, res) => {
  const rawData = await postOneMessage(req);
  res.json(rawData);
};

module.exports.handleDeleteOneMessage = async (req, res) => {
  const rawData = await deleteOneMessage(req);
  res.json(rawData);
};

