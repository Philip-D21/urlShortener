const mongoose = require("mongoose");


const connect = () =>{
   return  mongoose.connection()
}




module.exports = connect;