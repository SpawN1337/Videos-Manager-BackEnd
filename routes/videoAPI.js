const express = require('express');
const router = express.Router();

// reuire Controller
const VideoController = require('../controllers/videoController')
const storage = require('../helpers/storage');

// add one Materiel
router.get('/getuploads', VideoController.getImage);

// router.post('/addvideo', VideoController.ad)
router.post('/upload', storage, VideoController.postImage);

// Remove one materiel
router.delete('/removeupload/:id', VideoController.removeImage)

//get all materiels
// router.get('/allvideos', VideoController.allVideos)

// update materiel by id
// router.put('/updatevideo/:id', VideoController.updateVideo)

//get materiel by id
router.get('/getupload/:id', VideoController.getImage)



module.exports = router;