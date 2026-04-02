const mongoose = require("mongoose");

// this will connect mongodb
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;