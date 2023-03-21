const express = require('express');
const router = express.Router();
// reuire controller
const gradeContoller = require("../controllers/gradeContollers");

// add one grade
router.post('/addgrade', gradeContoller.addGrade)

// Remove one grade
router.delete('/removegrade/:id', gradeContoller.removeGrade)

//get all grade
router.get('/allgrades', gradeContoller.allGrades)

// update grade by id
router.put('/updategrade/:id', gradeContoller.updateGrade)

//get grade by id
router.get('/getgrade/:id', gradeContoller.getGrade)

module.exports = router;