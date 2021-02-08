const {
  getAllMessages,
  getOneMessage,
  postOneMessage,
  deleteOneMessage,
  subscribeNewsletter
} = require("../models/contact.js");

module.exports.handleGetAllMessages = async (req, res) => {
  const rawData = await getAllMessages(req);
  const allMessagesLength = await getAllMessages();
  res.set("X-Total-Count", allMessagesLength.length);
  res.send(rawData);
};

module.exports.handleGetOneMessage = async (req, res) => {
  res.send(await getOneMessage(req.params.id));
};

module.exports.handleOneMessagePost = async (req, res) => {
  const { firstname, lastname, email, message, purpose } = req.body;
  const data = await postOneMessage({
    firstname,
    lastname,
    email,
    message,
    purpose,
  });
  return res.status(201).send(data);
};

module.exports.handleSubscribeNewsLetter = async (req, res) => {
  const { email } = req.body;
  const data = await subscribeNewsletter(email);
  return res.status(201).send(data);
};

module.exports.handleDeleteOneMessage = async (req, res) => {
  await deleteOneMessage(req);
  res.sendStatus(204);
};
