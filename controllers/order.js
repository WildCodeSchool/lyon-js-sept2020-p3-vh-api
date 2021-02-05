const {
  getAllOrders,
  findOrdersByUser,
  findOrdersByEvent,
  postOneOrder,
  findOneOrder,
  deleteOneOrder,
} = require("../models/order");

module.exports.handleAllOrders = async (req, res) => {
  const rawData = await getAllOrders(req);
  const allOrdersLength = await getAllOrders();
  res.set("X-Total-Count", allOrdersLength.length);
  res.send(rawData);
};

module.exports.handleOrdersByUser = async (req, res) => {
  res.send(await findOrdersByUser(req.params.id));
};

module.exports.handleOrdersByEvent = async (req, res) => {
  res.send(await findOrdersByEvent(req.params.id));
};

module.exports.handleCreateOrder = async (req, res) => {
  const data = await postOneOrder(req);
  return res.status(201).send(data);
};

module.exports.handleOneOrder = async (req, res) => {
  res.send(await findOneOrder(req.params.id));
};

module.exports.handleDeleteOrder = async (req, res) => {
  await deleteOneOrder(req.params.id);
  res.sendStatus(204);
};
