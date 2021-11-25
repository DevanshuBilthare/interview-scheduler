const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    role: String,
    address: String
})

module.exports = mongoose.model('user', userSchema);