const mongoose = require("mongoose");
const validator = require('validator');



const userSchema = new mongoose.Schema({
      username: {
        tyoe: String,
        required: true,
      },
      email:{
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      }
    },
    passowrd: {
        type: String,
        unique: true,
        required: true,
    }
})


module.exports= mongoose.model("User", userSchema);