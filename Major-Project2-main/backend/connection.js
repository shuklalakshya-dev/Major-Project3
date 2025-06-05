const mongoose = require('mongoose');

const url= "mongodb+srv://akmalahmad1209:Azad2024@mohdakmal.tcxsa.mongodb.net/mydatabase786?retryWrites=true&w=majority&appName=MohdAkmal"

// connect to the database
// asynchronous - returns a promise
mongoose.connect(url)
    .then((result) => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = mongoose;