// Import required module
const { db } = require("../config/db.js");

// BookingPayment schema and model
const bookingPaymentSchema = new db.Schema({
  name: { type: String, required: true },
  card: { type: String, required: true },
  expiredate: { type: String, required: true },
  zipcode: { type: String, required: true },
  billingaddress: { type: String, required: true },
  countryname: { type: String, required: true },
  bookingId: { type: db.Schema.Types.ObjectId, ref: "bookings" },
  total: { type: Number, required: true },
});

const BookingPayment = db.model("bookingPayments", bookingPaymentSchema);

module.exports = { BookingPayment };
