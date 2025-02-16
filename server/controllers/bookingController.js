const jwt = require("jsonwebtoken");
const { Booking } = require("../model/bookingModel.js");
const { BookingPayment } = require("../model/bookingPaymentModel.js");
const { User } = require("../model/userModel.js");

const jwt_secret_key = "859215";

const handlePostBookingForm = async (req, res) => {
  try {
    const requestedUser = req.user;
    const {
      firstname,
      lastname,
      email,
      phone,
      date,
      time,
      persons,
      additionalInfo,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !persons ||
      !additionalInfo
    )
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });

    const user = await User.findOne({ _id: requestedUser._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newBooking = new Booking({
      name: firstname + " " + lastname,
      email,
      phone,
      date: formattedDate,
      time,
      persons,
      additionalInfo,
      userId: user._id,
    });

    const isSaved = await newBooking.save();
    res.status(201).json({
      success: true,
      message: "Booking successfully created",
      booking: isSaved,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const handlePostBookingPaymentForm = async (req, res) => {
  try {
    const {
      name,
      card,
      expiredate,
      zipcode,
      billingaddress,
      countryname,
      total,
      bookingId,
    } = req.body;

    if (
      !name ||
      !card ||
      !expiredate ||
      !zipcode ||
      !billingaddress ||
      !countryname ||
      !total ||
      !bookingId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    if (!/^\d{16}$/.test(card)) {
      return res.status(400).json({
        success: false,
        message: "Invalid card number. Must be 16 digits.",
      });
    }

    const currentDate = new Date();
    const enteredDate = new Date(expiredate);
    if (enteredDate < currentDate) {
      return res.status(400).json({
        success: false,
        message: "Expiration date cannot be in the past.",
      });
    }

    const newPayment = new BookingPayment({
      name,
      card,
      expiredate,
      zipcode,
      billingaddress,
      countryname,
      total,
      bookingId,
    });

    await newPayment.save();

    return res
      .status(200)
      .json({ success: true, message: "Payment successful!" });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const handleGetBookings = async (req, res) => {
  try {
    const tokenId = req.user._id;
    const userId = tokenId;

    const bookings = await Booking.find({ userId });

    const currentTime = new Date();

    const pending = bookings.filter(
      (booking) => new Date(`${booking.date} ${booking.time}`) > currentTime
    );
    const old = bookings.filter(
      (booking) => new Date(`${booking.date} ${booking.time}`) <= currentTime
    );
    res.status(200).json({ success: true, pending, old });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const handleDeleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }

    await Booking.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting reservation", error });
  }
};

module.exports = {
  handlePostBookingForm,
  handlePostBookingPaymentForm,
  handleGetBookings,
  handleDeleteReservation,
};
