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
    }]
  const videos = await Video.aggregate(pipeline);
  res.status(200).json({ videos });
};

const videoFileMap = {
  '12': 'videos/gg.mp4',
  'generate-pass': 'videos/gg.mp4',
  'get-post': 'videos/gg.mp4',
}

exports.getVideo = async (req, res) => {
  const video = await Video.findById(req.params.id)
  const filePath = video.videoPath
  console.log("ratatata",filePath)
  if (!filePath) {
    return res.status(404).send('File not found')
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(206, head);
    file.pipe(res);
  }
  else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res)
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
  const name = req.body.name;
  const aircraft = req.body.aircraft;
  const place = req.body.place;
  const date = req.body.date;
  const tag = req.body.tag.split(",");
  const filename = req.file.filename;
  const videoPath = 'videos/' + req.file.filename; // Note: set path dynamically
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