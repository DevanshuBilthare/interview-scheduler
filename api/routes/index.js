var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");


const Interview = require('../models/interviewModel');
const User = require('../models/userModel');

router.get('/', function(req, res, next) {
  Interview.find()
  .then( data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});

router.post('/create', function(req, res, next) {
  Interview.create({...req.body})
  .then( data => {
	let allparticipants = req.body.participant + "," + req.body.interviewer;
    mailsev(allparticipants);
    res.status(201).json(data)})
  .catch(err => res.status(500).json(err))
});

router.post('/update/:id', function(req, res, next) {
  Interview.findOneAndUpdate({_id: id}, {$set: {...req.body}},{new: true})
  .then( data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
});




// ----------------------------------------------------------------

router.post('/addparticipant', function(req, res, next) {
  User.create({...req.body})
  .then( data => res.status(201).json(data))
  .catch(err => res.status(500).json(err))
});

router.get('/participant', function(req, res, next) {
	User.find()
	.then( data => res.status(200).json(data))
	.catch(err => res.status(500).json(err))
  });






// ----------------------------------------------------------------


const mailsev = (participant) => {
	const output = `<p> You have a new message </p>
  <h3>Contact Details</h3>
  <ul>
  <li> Name:</li>
  <li> Company:</li>
  <li> Email:</li>
  <li> Phone:</li>
  </ul>
  <h3>Message</h3>
  <p></p>
  `;

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
