const mongoose = require('mongoose')


const interviewSchema = new mongoose.Schema({
    title: String,
    participants: [],
    date: Date,
    startTime: Number,
    endTime: Number
})

module.exports = mongoose.model('interview', interviewSchema);