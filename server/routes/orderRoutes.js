const express = require("express");
const orderRouter = express.Router();

// Import booking controller
const {
  handleDeleteOrder,
  handleGetSpecificUserOrder,
  handleGetSpecificOrder,
  handlePostCreateOrder,
  handleUpdateOrder,
  handleGetAllOrders,
  handlePostOrderPaymentForm,
} = require("../controllers/orderController.js");

// booking routes
orderRouter.post("/", handlePostCreateOrder);
orderRouter.get("/", handleGetSpecificUserOrder);
orderRouter.get("/all", handleGetAllOrders);
orderRouter.get("/:id", handleGetSpecificOrder);
orderRouter.delete("/:id", handleDeleteOrder);
orderRouter.post("/payment", handlePostOrderPaymentForm);

module.exports = { orderRouter };
