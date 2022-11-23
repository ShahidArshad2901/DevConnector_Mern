const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message, "Error is here");
    process.exit(1); //Exit process with failure
  }
};

module.exports = connectDB;
