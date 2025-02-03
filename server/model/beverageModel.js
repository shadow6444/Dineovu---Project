// Import required module
const { db } = require("../config/db.js");

// Beverage schema and model
const beverageSchema = new db.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  tags: { type: String, required: true },
  ingredients: { type: String, required: true },
  rating: { type: Number, required: true },
  isavailable: { type: Boolean, required: true },
});

const Beverage = db.model("beverages", beverageSchema);

module.exports = { Beverage };
