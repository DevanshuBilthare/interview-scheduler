var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");


const Interview = require('../models/interviewModel');
const User = require('../models/userModel');

//show all interviews
router.get('/', function(req, res, next) {
  Interview.find()
  .then( data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});

//create the interview
router.post('/create', function(req, res, next) {
  Interview.create({...req.body})
  .then( data => {
	let allparticipants = req.body.participant + "," + req.body.interviewer;
    mailsev(allparticipants);
    res.status(201).json(data)})
  .catch(err => res.status(500).json(err))
});

//update the interview
router.post('/update/:id', function(req, res, next) {
  Interview.findOneAndUpdate({_id: req.params.id}, {$set: {...req.body}},{new: true})
  .then( data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});

//delete interview
router.post('.delete/:id', function(req, res, next){
	Interview.findOneAndDelete({_id: rea.parama.id})
	.then(data => res.status(200).json(data))
  	.catch(err => res.status(500).json(err))
})

// -----------------------PARTICIPANT ROUTES-----------------------------------------

//add the participant
router.post('/addparticipant', function(req, res, next) {
  User.create({...req.body})
  .then( data => res.status(201).json(data))
  .catch(err => res.status(500).json(err))
});

//get all participant
router.get('/participant', function(req, res, next) {
	User.find()
	.then( data => res.status(200).json(data))
	.catch(err => res.status(500).json(err))
});

// --------------------	NODEMAILER--------------------------------------------

const mailsev = async (participant) => {
	const myArr = participant.split(",");
	console.log(myArr);
	let interviewDetails =  await Interview.findOne({participant: myArr[0]})
	
	console.log(interviewDetails)
					
	const output = `<p>
		<h2> Interview ${interviewDetails.interviewer} X ${interviewDetails.participant}</h2>

		<h3> ${interviewDetails.title}</h3>
		<h4>You have new interview scheduled.</h4>
		<h4>Details:</h4>
		<h4>Interviewer name: ${interviewDetails.interviewer}</h4>
		<h4>Participant name: ${interviewDetails.participant}</h4>
		<h4>Date: ${interviewDetails.date}</h4>
		<h4>Start time: ${interviewDetails.startTime}</h4>
		<h4>End time: ${interviewDetails.endTime}</h4>
		</p>`;



	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: "hungrykiller821@gmail.com", // generated ethereal user
			pass: "Devopod@o2may2ooo", // generated ethereal password
		},
	});

	let mailOptions = {
		from: '"Nodemailer Contact" <testjain44@gmail.com>', // sender address
		to: participant, // list of receivers
		subject: "node contact ", // Subject line
		text: "Hello world?", // plain text body
		html: output, // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		res.send("mail send");
	});
};
module.exports = router;