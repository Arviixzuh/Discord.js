const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    Server: String,
    Color: String
})

module.exports = mongoose.model('color', Schema)