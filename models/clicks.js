const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'URL',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Click', clickSchema);
