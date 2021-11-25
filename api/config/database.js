const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://admin:admin@cluster0.cyxpd.mongodb.net/interview_scheduler?retryWrites=true&w=majority')
.then(() => console.log("connection established!"))
.catch(err => console.log(err))
//mongodb+srv://admin:<password>@cluster0.cyxpd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
