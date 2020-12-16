const { getAllMessages,getOneMessage, postOneMessage  } = require('../models/contact.js');


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
