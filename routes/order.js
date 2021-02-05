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
const requireAdmin = require("../middlewares/requireAdmin.js");

orderRouter.get("/", requireAdmin, asyncHandler(handleAllOrders));
orderRouter.get("/:id", requireAdmin, asyncHandler(handleOneOrder));
orderRouter.get("/user/:id", requireAdmin, asyncHandler(handleOrdersByUser));
orderRouter.get("/event/:id", asyncHandler(handleOrdersByEvent));
orderRouter.post("/", requireRequestBody, asyncHandler(handleCreateOrder));
orderRouter.delete("/:id", requireAdmin, asyncHandler(handleDeleteOrder));

module.exports = orderRouter;
