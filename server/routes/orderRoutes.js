const express = require("express");
const orderRouter = express.Router();

// Import booking controller
const {
  handleDeleteOrder,
  handleGetSpecificUserOrder,
  handleGetSpecificOrder,
  handlePostCreateOrder,
  handleGetAllOrders,
  handlePostOrderPaymentForm,
} = require("../controllers/orderController.js");

// Import auth middleware
const { verifyToken } = require("../middleware/userAuth.js");

// booking routes
orderRouter.post("/", handlePostCreateOrder);
orderRouter.get("/", verifyToken, handleGetSpecificUserOrder);
orderRouter.get("/all", handleGetAllOrders);
orderRouter.get("/:id", handleGetSpecificOrder);
orderRouter.delete("/:id", handleDeleteOrder);
orderRouter.post("/payment", handlePostOrderPaymentForm);

module.exports = { orderRouter };
