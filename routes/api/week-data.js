const express = require('express');
const router = express.Router();

//Sensor data DB model
const Data = require('../../models/Data');

// @route   GET /api/week-data
// @desc    Get sensor data for the past week
// @acc     Public
router.get('/', (req, res) => {
    console.log("GET day data");
    var pastWeek = new Date(
        new Date()
            .getTime() - (7* 24 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": pastWeek } })
    .sort({date: 1})
    .then(data => res.json(data));
});

module.exports = router;