import mongoose from 'mongoose';
import validator from 'validator';


export const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }
);


// module.exports = mongoose.model('User', userSchema);
