/// handleAllOrder, handleOneOrder, handleOrdersByUser, handleCreateOrder, handleUpdateOrder, handleDeleteOrder

const {
 getAllOrders,
 findOrdersByUser,
 postOneOrder,
 // updateOneOrder,
 // deleteOneOrder,
} = require('../models/order');

module.exports.handleAllOrders = async (req, res) => {
 const rawData = await getAllOrders();
 res.send(rawData);
};

module.exports.handleOrdersByUser = async (req, res) => {
 res.send(await findOrdersByUser(req.params.id));
};

module.exports.handleCreateOrder = async (req, res) => {
 const {
   user_id,
   event_id
 } = req.body;
 const data = await postOneOrder({
  user_id,
   event_id
 });
 return res.status(201).send(data);
};

// module.exports.handleUpdateOrder = async (req, res) => {
//  const {
//   user_id,
//   event_id
//  } = req.body;
//  const attribute = {
//   user_id,
//   event_id
//  };
//  const data = await updateOneOrder(req.params.id, attribute);
//  res.send(data);
// };

// module.exports.handleDeleteOrder = async (req, res) => {
//  await deleteOneOrder(req.params.id);
//  res.sendStatus(204);
// };
