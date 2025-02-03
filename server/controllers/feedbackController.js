const { Feedback } = require("../model/feedbackModel.js");

const handlePostFeedbackForm = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      overallExperience,
      foodQuality,
      serviceQuality,
      cleanliness,
      additionalInfo,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !overallExperience ||
      !foodQuality ||
      !serviceQuality ||
      !cleanliness
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    if (!/^03\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format. Use 03XXXXXXXXX.",
      });
    }

    const feedback = new Feedback({
      name: `${firstname} ${lastname}`,
      email,
      phone,
      overallexperience: overallExperience,
      foodquality: foodQuality,
      servicequality: serviceQuality,
      cleanliness,
      comments: additionalInfo,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { handlePostFeedbackForm };
