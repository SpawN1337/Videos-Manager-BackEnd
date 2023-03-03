const express = require('express');
const router = express.Router();

// reuire Controller
const VideoController = require('../controllers/videoController')

// add one Materiel
router.post('/addvideo', VideoController.addVideo)

// Remove one materiel
router.delete('/removevideo/:id', VideoController.removeVideo)

//get all materiels
router.get('/allvideos', VideoController.allVideos)

// update materiel by id
router.put('/updatevideo/:id', VideoController.updateVideo)

//get materiel by id
router.get('/getvideo/:id', VideoController.getVideo)



module.exports = router;