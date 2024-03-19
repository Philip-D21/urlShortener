import mongoose from 'mongoose';


export const Url = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: [true, "Please provide short Url"]
  },
  longUrl: {
    type: String,
    required: [true,"Please provide long url"] 
  },
  
  shortId:{
     type: String,
     required: [true, 'Please provide the short id']
  },
  clicks:{
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, 
  customUrl: {
    type: String,
    unique: true,
  },
},

);





// module.exports = mongoose.model('Url', urlSchema);
