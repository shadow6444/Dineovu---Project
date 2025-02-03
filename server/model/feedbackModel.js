// Import required module
const { db } = require("../config/db.js");

// Feedback schema and model
const feedbackSchema = new db.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  overallexperience: { type: Number, required: true },
  foodquality: { type: Number, required: true },
  servicequality: { type: Number, required: true },
  cleanliness: { type: Number, required: true },
  comments: { type: String },
});

const Feedback = db.model("feedbacks", feedbackSchema);

module.exports = { Feedback };
