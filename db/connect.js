const mongoose = require("mongoose");
require("dotenv").config();

// const uri = process.env.URI||'mongodb://localhost:27017'

const connect = (url) =>{
   return mongoose.connect(url)
}




module.exports = connect;