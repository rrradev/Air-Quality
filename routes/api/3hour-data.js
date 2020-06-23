const express = require('express');
const router = express.Router();

//Sensor data DB model
const Data = require('../../models/Data');

// @route   GET /api/3hour-data
// @desc    Get sensor data for the past 3 hours
// @acc     Public
router.get('/', (req, res) => {
    console.log("GET 3hour data");
    var past3Hours = new Date(
        new Date()
            .getTime() - (3 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": past3Hours} })
    .sort({date: 1})
    .then(data => res.json(data));
});

module.exports = router;