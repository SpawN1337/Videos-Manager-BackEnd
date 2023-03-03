const Video = require('../models/videoSchema')
const mongoose = require('mongoose')

//add video Contoller
exports.addVideo = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.body.title) == false) {
            delete req.body.title
        }
        if (mongoose.Types.ObjectId.isValid(req.body.date) == false) {
            delete req.body.date
        }
        if (mongoose.Types.ObjectId.isValid(req.body.airCraft) == false) {
            delete req.body.airCraft
        }
        if (mongoose.Types.ObjectId.isValid(req.body.place) == false) {
            delete req.body.place
        }
        if (mongoose.Types.ObjectId.isValid(req.body.KeyWords) == false) {
            delete req.body.KeyWords
        }

        const createdVideo = await Video.create(req.body)
        await Video.findByIdAndUpdate(createdVideo._id, {
            $push: [{
                title: req.body.title,
                date: req.body.date,
                airCraft: req.body.airCraft,
                place: req.body.place,
                KeyWords: req.body.KeyWords,
            }],
        }, { new: true })
        res.json(createdVideo);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
//remove by Id materiel Contoller
exports.removeVideo = async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id)
        res.json({ message: 'deleted base successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// get all Materiels 
exports.allVideos = async (req, res) => {
    var pipeline = [
        {
            $lookup:
            {
                from: "aircrafts",
                localField: "airCraft",
                foreignField: "_id",
                as: "airCraft"
            }
        },
        {
            $set: {

                airCraft: "$airCraft.nomAirCraft",
            }
        },
        
    ]
    try {
        const video = await Video.aggregate(pipeline)

        res.json(video);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update Meteriel by id controller
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
//Get materiel By id contoller
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




