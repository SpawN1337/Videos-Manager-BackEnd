const express = require('express');
const router = express.Router();

// reuire Controller
const VideoController = require('../controllers/videoController')
const storage = require('../helpers/storage');

// add one Materiel
router.get('/getvideos', VideoController.getVideo);

// router.post('/addvideo', VideoController.ad)
router.post('/uploadvideo', storage, VideoController.postVideo);

// Remove one materiel
router.delete('/removevideo/:id', VideoController.removeVideo)

//get all materiels
// router.get('/allvideos', VideoController.allVideos)

// update materiel by id
// router.put('/updatevideo/:id', VideoController.updateVideo)

//get materiel by id
router.get('/getvideo/:id', VideoController.getVideo)



module.exports = router;