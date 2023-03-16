const express = require('express');

const imageController = require('../controllers/imageController');

const storage = require('../helpers/storage');

const router = express.Router();

router.get('/getimages', imageController.getImages);

router.post('/uploadimage', storage, imageController.postImage);

// Remove one grade

router.delete('/removeimage/:id', imageController.removeImage)

//get consominfo by id
router.get('/getimage/:id', imageController.getImage)

// update image by id 
router.put('/updateimage/:id', imageController.updateImage)

module.exports = router;