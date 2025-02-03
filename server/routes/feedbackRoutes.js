// Import required modules
const express = require("express");
const feedbackRouter = express.Router();

// Import booking controller
const {
  handlePostFeedbackForm,
} = require("../controllers/feedbackController.js");

// booking routes
feedbackRouter.post("/", handlePostFeedbackForm);

module.exports = { feedbackRouter };
