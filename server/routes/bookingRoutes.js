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

// booking routes
bookingRouter.post("/", handlePostBookingForm);
bookingRouter.post("/payment", handlePostBookingPaymentForm);
bookingRouter.get("/", handleGetBookings);
bookingRouter.delete("/:id", handleDeleteReservation);

module.exports = { bookingRouter };
