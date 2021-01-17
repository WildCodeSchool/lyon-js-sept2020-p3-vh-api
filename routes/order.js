const orderRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const {handleAllOrders, handleOrdersByUser, handleCreateOrder, handleUpdateOrder, handleDeleteOrder } = require('../controllers/order.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');


orderRouter.get('/', asyncHandler(handleAllOrders));
orderRouter.get('/:id', asyncHandler(handleOrdersByUser));
orderRouter.post('/',requireRequestBody, asyncHandler(handleCreateOrder));
orderRouter.put('/:id',requireRequestBody,asyncHandler(handleUpdateOrder));
orderRouter.delete('/user/:id/events/:id', asyncHandler(handleDeleteOrder));

module.exports = orderRouter;