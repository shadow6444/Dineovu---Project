const jwt = require("jsonwebtoken");
const { Order } = require("../model/orderModel.js");
const { Starter } = require("../model/starterModel.js");
const { Beverage } = require("../model/beverageModel.js");
const { MainCourse } = require("../model/mainCourseModel.js");
const { OrderPayment } = require("../model/orderPaymentModel.js");

const jwt_secret_key = "859215";

const handleGetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const handlePostCreateOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!userId || !items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and items are required." });
    }

    let validatedItems = [];

    for (let item of items) {
      const starter = await Starter.findById(item.itemId);
      const beverage = await Beverage.findById(item.itemId);
      const mainCourse = await MainCourse.findById(item.itemId);

      const itemDetails = starter || beverage || mainCourse;

      if (!itemDetails) {
        return res
          .status(404)
          .json({ error: `Item with ID ${item.itemId} not found.` });
      }
      let itemType;
      if (starter) {
        itemType = "Starter";
      } else if (beverage) {
        itemType = "Beverage";
      } else if (mainCourse) {
        itemType = "MainCourse";
      }

      validatedItems.push({
        itemId: item.itemId,
        quantity: item.quantity,
        type: itemType,
      });
    }

    const newOrder = new Order({
      userId,
      items: validatedItems,
      totalAmount,
      expiredAt: new Date(Date.now() + validatedItems.length * 5 * 60 * 1000),
    });

    const isSaved = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order: isSaved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const handlePostOrderPaymentForm = async (req, res) => {
  try {
    const {
      name,
      card,
      expiredate,
      zipcode,
      billingaddress,
      countryname,
      total,
      orderId,
    } = req.body;

    if (
      !name ||
      !card ||
      !expiredate ||
      !zipcode ||
      !billingaddress ||
      !countryname ||
      !total ||
      !orderId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (!/^\d{16}$/.test(card)) {
      return res.status(400).json({
        success: false,
        message: "Invalid card number. Must be 16 digits.",
      });
    }

    const currentDate = new Date();
    const enteredDate = new Date(expiredate);
    if (enteredDate < currentDate) {
      return res.status(400).json({
        success: false,
        message: "Expiration date cannot be in the past.",
      });
    }

    const newPayment = new OrderPayment({
      name,
      card,
      expiredate,
      zipcode,
      billingaddress,
      countryname,
      total,
      orderId,
    });

    await newPayment.save();

    return res
      .status(200)
      .json({ success: true, message: "Payment successful!" });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const handleGetSpecificUserOrder = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);
    const userId = decoded._id;

    const orders = await Order.find({ userId })
      .populate("items.itemId")
      .populate("userId", "name");

    const currentTime = new Date();
    const pendingOrders = orders.filter(
      (order) => new Date(order.expiredAt) > currentTime
    );
    const oldOrders = orders.filter(
      (order) => new Date(order.expiredAt) <= currentTime
    );

    res.json({ success: true, pending: pendingOrders, old: oldOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const handleGetSpecificOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("userId");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    let populatedItems = [];

    for (const item of order.items) {
      let itemDetails;
      if (item.type === "MainCourse") {
        itemDetails = await MainCourse.findById(item.itemId);
      } else if (item.type === "Beverage") {
        itemDetails = await Beverage.findById(item.itemId);
      } else if (item.type === "Starter") {
        itemDetails = await Starter.findById(item.itemId);
      }
      populatedItems.push({
        itemId: itemDetails,
        quantity: item.quantity,
        type: item.type,
      });
    }

    const updatedOrder = {
      ...order.toObject(),
      items: populatedItems,
    };

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch order details" });
  }
};

const handleDeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};

const handleUpdateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { items, totalAmount } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (items) order.items = items;
    if (totalAmount) order.totalAmount = totalAmount;

    await order.save();
    res
      .status(200)
      .json({ success: true, message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    });
  }
};

module.exports = {
  handlePostCreateOrder,
  handleGetSpecificUserOrder,
  handleGetSpecificOrder,
  handleDeleteOrder,
  handleUpdateOrder,
  handleGetAllOrders,
  handlePostOrderPaymentForm,
};
