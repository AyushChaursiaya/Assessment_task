const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL);
    console.log("DB successfully connected.");
  } catch (error) {
    console.log("DB connection failed: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
