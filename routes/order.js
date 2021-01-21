const orderRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  handleAllOrders,
  handleOrdersByUser,
  handleCreateOrder,
  handleDeleteOrder,
  handleOrdersByEvent,
  handleOneOrder,
} = require("../controllers/order.js");
const requireRequestBody = require("../middlewares/requireRequestBody.js");

orderRouter.get("/", asyncHandler(handleAllOrders));
orderRouter.get("/:id", asyncHandler(handleOneOrder));
orderRouter.get("/user/:id", asyncHandler(handleOrdersByUser));
orderRouter.get("/event/:id", asyncHandler(handleOrdersByEvent));
orderRouter.post("/", requireRequestBody, asyncHandler(handleCreateOrder));
orderRouter.delete("/:id", asyncHandler(handleDeleteOrder));

module.exports = orderRouter;
