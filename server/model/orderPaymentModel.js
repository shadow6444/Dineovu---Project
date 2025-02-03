// Import required module
const { db } = require("../config/db.js");

// OrderPayment schema and model
const orderPaymentModel = new db.Schema({
  name: { type: String, required: true },
  card: { type: String, required: true },
  expiredate: { type: String, required: true },
  zipcode: { type: String, required: true },
  billingaddress: { type: String, required: true },
  countryname: { type: String, required: true },
  orderId: { type: db.Schema.Types.ObjectId, ref: "orders" },
  total: { type: Number, required: true },
});

const OrderPayment = db.model("orderpayments", orderPaymentModel);

module.exports = { OrderPayment };
