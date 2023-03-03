const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const airCraftSchema = new Schema({
  nomAirCraft: { type: String, required: true, unique: true },
}, {
  versionKey: false,
  timestamps: true
});
airCraftSchema.plugin(uniqueValidator)
const AirCraft = mongoose.model('airCraft', airCraftSchema);

module.exports = AirCraft;