const express = require('express');
const router = express.Router();

//Sensor data DB model
const Data = require('../../models/Data');

// @route   GET /api/hour-data
// @desc    Get sensor data for the past hour
// @acc     Public
router.get('/', (req, res) => {
    console.log("GET hour data");
    var pastHour = new Date(
        new Date()
            .getTime() - (1 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": pastHour} })
    .sort({date: 1})
    .then(data => res.json(data));
});

module.exports = router;