const mongoose = require("mongoose")

function connectTodb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected successfully ");
        })
        .catch((err) => {
            console.log("MongoDB connection failed", err.message);
        })
}

module.exports = connectTodb