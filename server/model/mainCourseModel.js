// Import required module
const { db } = require("../config/db.js");

// MainCourse schema and model
const mainCourseSchema = new db.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  tags: { type: String, required: true },
  ingredients: { type: String, required: true },
  rating: { type: Number, required: true },
  isavailable: { type: Boolean, required: true },
});

const MainCourse = db.model("MainCourse", mainCourseSchema);

module.exports = { MainCourse };
