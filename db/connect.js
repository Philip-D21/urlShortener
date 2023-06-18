const mongoose = require("mongoose");
require("dotenv").config();

// const uri = process.env.URI||'mongodb://localhost:27017'

const connect = () =>{
   return mongoose.connect(process.env.URI)
}




module.exports = connect;