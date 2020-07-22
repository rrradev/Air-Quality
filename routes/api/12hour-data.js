const express = require('express');
const router = express.Router();

//Sensor data DB model
const Data = require('../../models/Data');

// @route   GET /api/12hour-data
// @desc    Get sensor data for the past 12 hours
// @acc     Public
router.get('/', (req, res) => {
    console.log("GET 12h data");
    var past12Hours = new Date(
        new Date()
            .getTime() - (12 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": past12Hours }})
    .then(data => res.json(data));
});

module.exports = router;