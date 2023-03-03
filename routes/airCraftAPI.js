const express = require('express');
const router = express.Router();
// reuire controller
const airCraftContoller = require("../controllers/airCraftContollers");

// add one airCraft
router.post('/addaircraft', airCraftContoller.addAirCraft)

// Remove one airCraft
router.delete('/removeaircraft/:id', airCraftContoller.removeAirCraft)

//get all airCrafts
router.get('/allaircrafts', airCraftContoller.allAirCrafts)

// update airCraft by id
router.put('/updateaircraft/:id', airCraftContoller.updateAirCraft)

//get airCraft by id
router.get('/getaircraft/:id', airCraftContoller.getAirCraft)

module.exports = router;