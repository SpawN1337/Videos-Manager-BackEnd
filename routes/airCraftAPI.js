const express = require('express');
const router = express.Router();
// reuire controller
const airCraftController = require("../controllers/airCraftController");

// add one airCraft
router.post('/addaircraft', airCraftController.addAirCraft)

// Remove one airCraft
router.delete('/removeaircraft/:id', airCraftController.removeAirCraft)

//get all airCrafts
router.get('/allaircrafts', airCraftController.allAirCrafts)

// update airCraft by id
router.put('/updateaircraft/:id', airCraftController.updateAirCraft)

//get airCraft by id
router.get('/getaircraft/:id', airCraftController.getAirCraft)

module.exports = router;