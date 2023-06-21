const mongoose = require('mongoose');




const urlSchema = new mongoose.Schema({
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
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
});



module.exports = mongoose.model('Url', urlSchema);
