// Import required modules
const db = require("mongoose");

// Connecting to MongoDB
db.connect("mongodb://localhost:27017/Dineovu")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(`MongoDB Connection Error: ${error}`);
  });

module.exports = { db };
