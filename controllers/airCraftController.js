const AirCraft = require('../models/airCraftSchema')

//add AirCraft Controller
exports.addAirCraft = async (req, res) => {
    try {
        const createdAirCraft = await AirCraft.create(req.body)
        res.status(200).json({ message: 'تمت الإضافة بنجاح' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//remove by Id AirCraft Contoller
exports.removeAirCraft = async (req, res) => {
    try {
        const deletedAirCraft = await AirCraft.findByIdAndDelete(req.params.id)
        res.json({ message: 'تمت عملية الحذف بنجاح' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get all AirCrafts 
exports.allAirCrafts = async (req, res) => {
    try {
        const AirCrafts = await AirCraft.find({}).populate();
        res.json(AirCrafts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update AirCraft by id controller
exports.updateAirCraft = async (req, res) => {
    try {
        const updatedAirCraft = await AirCraft.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedAirCraft);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get AirCraft By id contoller
exports.getAirCraft = async (req, res) => {
    try {
        const getAirCraft = await AirCraft.findById(req.params.id)
        res.json(getAirCraft);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}