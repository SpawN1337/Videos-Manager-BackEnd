const Image = require('../models/videoSchema');
const fs = require('fs');
const atob = require('atob')
const { eq } = require('lodash');
const { name } = require('ejs');
exports.getImages = async (req, res) => {

  var pipeline = [{ $match: {  } }]
  const images = await Image.aggregate(pipeline);
  res.status(200).json({ images });
};

exports.getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
    res.json(image);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//remove by Id Inspecstib Contoller
exports.removeImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id)
    fs.unlinkSync('./images/' + image.filename);
    const deleteImage = await Image.findByIdAndDelete(req.params.id)

    res.json({ message: 'deleted Inspecstib successfully' });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//update Consominfo by id controller
exports.updateImage = async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedImage);
}
catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
}
  
}

exports.postImage = async (req, res) => {
  console.log("hereeeee" )
  const { name } = req.body;
  const filename = req.file.filename;
  const imagePath = 'http://localhost:5000/images/' + req.file.filename; // Note: set path dynamically
  const image = new Image({
    name,
    filename,
    imagePath,
  });
  const createdImage = await image.save();
  res.status(201).json({
    image: {
      ...createdImage._doc,
    },
  });
};