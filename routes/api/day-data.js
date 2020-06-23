const express = require('express');
const router = express.Router();

//Sensor data DB model
const Data = require('../../models/Data');

// @route   GET /api/day-data
// @desc    Get sensor data for the past 24 hours
// @acc     Public
router.get('/', (req, res) => {
    console.log("GET day data");
    var pastDay = new Date(
        new Date()
            .getTime() - (24 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": pastDay } })
    .sort({date: 1})
    .then(data => res.json(data));
});

module.exports = router;