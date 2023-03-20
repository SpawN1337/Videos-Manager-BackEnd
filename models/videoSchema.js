const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  name: { type: String, required: true },
  videoPath: { type: String, required: true },
  filename : { type: String },
  uploaded: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Video', videoSchema);