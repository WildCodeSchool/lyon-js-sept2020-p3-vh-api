const { getAllMessages,getOneMessage, postOneMessage, deleteOneMessage  } = require('../models/contact.js');


module.exports.handleGetAllMessages = async (req, res) => {
  const rawData = await getAllMessages();
  res.send(rawData);
};

module.exports.handleGetOneMessage = async (req, res) => {
  res.send(await getOneMessage(req.params.id));
};

module.exports.handleOneMessagePost = async (req, res) => {
  const { firstname, lastname, email, message } = req.body;
  const data = await postOneMessage({ firstname, lastname, email, message });
  return res.status(201).send(data);
};

module.exports.handleDeleteOneMessage = async (req, res) => {
  await deleteOneMessage(req);
  res.sendStatus(204);
};



