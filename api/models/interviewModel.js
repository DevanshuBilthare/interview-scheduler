const mongoose = require('mongoose')


const interviewSchema = new mongoose.Schema({
    title: String,
    interviewer: String,
    participant: String,
    date: String,
    startTime: String,
    endTime: String
})

module.exports = mongoose.model('interview', interviewSchema);