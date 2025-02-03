// Import required module
const { db } = require("../config/db.js");

// Starter schema and model
const starterSchema = new db.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  tags: { type: String, required: true },
  ingredients: { type: String, required: true },
  rating: { type: Number, required: true },
  isavailable: { type: Boolean, required: true },
});

const Starter = db.model("starters", starterSchema);

module.exports = { Starter };
