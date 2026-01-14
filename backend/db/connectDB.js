const mongoose = require("mongoose");

const connectDB = async (DB) => {
  try {
    await mongoose.connect(DB);
    console.log("Database connected...");
  } catch (err) {
    console.log("Error connecting to database");
    console.log(err);
  }
};

module.exports = connectDB;
