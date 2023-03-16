const { toInteger } = require('lodash');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: { type: String },
    date: { type: String, format: Date },
    airCraft: { type: Schema.Types.ObjectId, ref: 'airCraft' },
    place: { type: String },
    uploaded: { type: Date, default: Date.now },
    videoPath: { type: String, required: true },
    filename : { type: String },
    KeyWords: { type: Array, default: []}
    }, {
    versionKey: false,
    timestamps: true,
});
// videoSchema.plugin(uniqueValidator)
const Video = mongoose.model('video', videoSchema);

module.exports = Video;