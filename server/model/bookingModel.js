// Import required module
const { db } = require("../config/db.js");

// Booking schema and model
const bookingSchema = new db.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  persons: { type: Number, required: true },
  userId: { type: db.Schema.Types.ObjectId, ref: "users" },
  message: { type: String },
});

const Booking = db.model("bookings", bookingSchema);

module.exports = { Booking };
