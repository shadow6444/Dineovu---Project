// Import required modules
const express = require("express");
const bookingRouter = express.Router();

// Import booking controller
const {
  handlePostBookingForm,
  handlePostBookingPaymentForm,
  handleGetBookings,
  handleDeleteReservation,
} = require("../controllers/bookingController.js");

// Import auth middleware
const { verifyToken } = require("../middleware/userAuth.js");

// booking routes
bookingRouter.post("/", verifyToken, handlePostBookingForm);
bookingRouter.post("/payment", handlePostBookingPaymentForm);
bookingRouter.get("/", verifyToken, handleGetBookings);
bookingRouter.delete("/:id", handleDeleteReservation);

module.exports = { bookingRouter };
