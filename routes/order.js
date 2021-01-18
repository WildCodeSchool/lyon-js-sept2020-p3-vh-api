const orderRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  handleAllOrders,
  handleOrdersByUser,
  handleCreateOrder,
  handleUpdateOrder,
  handleDeleteOrder,
  handleOrdersByEvent,
} = require("../controllers/order.js");
const requireRequestBody = require("../middlewares/requireRequestBody.js");

orderRouter.get("/", asyncHandler(handleAllOrders));
orderRouter.get("/user/:id", asyncHandler(handleOrdersByUser));
orderRouter.get("/event/:id", asyncHandler(handleOrdersByEvent));
orderRouter.post("/", requireRequestBody, asyncHandler(handleCreateOrder));
orderRouter.put("/:id", requireRequestBody, asyncHandler(handleUpdateOrder));
orderRouter.delete("/user/:id/events/:id", asyncHandler(handleDeleteOrder));

module.exports = orderRouter;
