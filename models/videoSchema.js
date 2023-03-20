const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  filename : { type: String },
  uploaded: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Image', imageSchema);