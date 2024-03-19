import mongoose from 'mongoose';


export const Clicks = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL',

  },
 createdAt: {
    type: Date,
    default: Date.now(),
    
  },
  ipAddress: {
    type: String,
  },
});


// module.exports = mongoose.model('Click', clickSchema);
