const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://dhanesh-malviya:dhanesh123@mastercluster.i7cpa.mongodb.net/dev?retryWrites=true&w=majority',)
.then(() => console.log("connection established!"))
.catch(err => console.log(err))