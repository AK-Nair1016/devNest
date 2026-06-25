const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoURI = "mongodb://127.0.0.1:27017/devNest";

    await mongoose.connect(mongoURI);
};

module.exports= connectDB;


