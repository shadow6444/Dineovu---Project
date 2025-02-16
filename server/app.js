const express = require("express");
const cors = require("cors");
const app = express();

//Import custom modules
const { userRouter } = require("./routes/userRoutes.js");
const { bookingRouter } = require("./routes/bookingRoutes.js");
const { feedbackRouter } = require("./routes/feedbackRoutes.js");
const { menuRouter } = require("./routes/menuRoutes.js");
const { orderRouter } = require("./routes/orderRoutes.js");

// middleware to parse incoming requests
app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// user router use
app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/menu", menuRouter);
app.use("/api/order", orderRouter);

// Server setup
const host = "localhost";
const port = 3000;
app.listen(port, host, () =>
  console.log(`> Server is up and running on http://${host}:${port}`)
);
