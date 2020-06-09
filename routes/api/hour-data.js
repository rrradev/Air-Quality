const express = require('express');

const router = express.Router();

//Sensor data model

const Data = require('../../models/Data');
// @route   GET /api/data
// @desc    Get sensor data for the past hour
// @acc     Public (for now)
router.get('/', (req, res) => {
    console.log("GET req");
    var pastHour = new Date(
        new Date()
            .getTime() - (1 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": pastHour} })
    .sort({date: 1})
    .then(data => res.json(data));
});

module.exports = router;