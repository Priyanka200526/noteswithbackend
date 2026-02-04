const mongoose = require("mongoose")

const createschemas = new mongoose.Schema({
    "name": String,
    "city": String
})

const friendmodule = mongoose.model("friend", createschemas)

module.exports = friendmodule