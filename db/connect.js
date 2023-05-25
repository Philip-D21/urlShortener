const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.URI

const connect = (uri) =>{
   return mongoose.connect(uri,{
    user
   })
}




module.exports = connect;