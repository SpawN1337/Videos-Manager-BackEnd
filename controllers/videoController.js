const Image = require('../models/videoSchema');
const fs = require('fs');
const atob = require('atob')
const { eq } = require('lodash');
const { name } = require('ejs');
exports.getVideo = async (req, res) => {

  // currentrole = JSON.parse(atob(req.headers.authorization.split('.')[1])).role;
  var pipeline = [{ $match: {} }]
  //   if (currentbase != currentrole) {
  //     pipeline.unshift({ $match: { base: currentbase } });
  // }
  const videos = await Video.aggregate(pipeline);
  res.status(200).json({ videos });
};

exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
    res.json(video);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//remove by Id Inspecstib Contoller
exports.removeVideo = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
    fs.unlinkSync('./videos/' + image.filename);
    const deleteImage = await Video.findByIdAndDelete(req.params.id)

    res.json({ message: 'deleted Inspecstib successfully' });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//update Consominfo by id controller
// exports.updateImage = async (req, res) => {
//   try {
//     const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     res.json(updatedImage);
// }
// catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Internal server error' });
// }
// }

exports.postVideo = async (req, res) => {
  const { name } = req.body;
  const title = req.file.title;
  const date = req.file.date;
  const airCraft = req.file.airCraft;
  const place = req.file.place;
  const KeyWords = req.file.KeyWords;
  const uploaded = req.file.uploaded;
  const filename = req.file.filename;

  const videoPath = 'http://localhost:5000/videos/' + req.file.filename; // Note: set path dynamically
  const video = new Video({
    name,
    filename,
    title,
    date,
    airCraft,
    place,
    uploaded,
    KeyWords,
    videoPath,
  });
  const createdVideo = await video.save();
  res.status(201).json({
    video: {
      ...createdVideo._doc,
    },
  });
};