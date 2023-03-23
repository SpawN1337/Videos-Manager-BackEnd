const Video = require('../models/videoSchema');
const fs = require('fs');



exports.getVideos = async (req, res) => {
  var pipeline = [
    {
      $lookup:
      {
          from: "aircrafts",
          localField: "aircraft",
          foreignField: "_id",
          as: "aircraft"
      }
  },
  {
      $set: {
        aircraft: "$aircraft.nomAirCraft",
      }
  },
  {
    $project: {
       name: "$name",
       aircraft: "$aircraft",
       place: "$place",
       tag: "$tag",
       date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
    }
  } ]
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
    const video = await Video.findById(req.params.id)
    fs.unlinkSync('./videos/' + video.filename);
    const deleteVideo = await Video.findByIdAndDelete(req.params.id)

    res.json({ message: 'deleted Inspecstib successfully' });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//update Consominfo by id controller
exports.updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedVideo);
}
catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
}
  
}

exports.postVideo = async (req, res) => {
  const  name  = req.body.name;
  const  aircraft  = req.body.aircraft;
  const  place  = req.body.place;
  const  date  = req.body.date;
  const  tag  = req.body.tag.split(",");
  const filename = req.file.filename;
  const videoPath = 'http://localhost:5000/videos/' + req.file.filename; // Note: set path dynamically
  const video = new Video({
    name,
    aircraft,
    place,
    date,
    tag,
    filename,
    videoPath,
  });
  const createdVideo = await video.save();
  res.status(201).json({
    video: {
      ...createdVideo._doc,
    },
  });
};