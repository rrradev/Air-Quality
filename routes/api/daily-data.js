const express = require('express');

const router = express.Router();

//Sensor data model

const Data = require('../../models/Data');
// @route   GET /api/data
// @desc    Get sensor data for the past 24 hours
// @acc     Public (for now)
router.get('/', (req, res) => {
    console.log("GET req");
    var pastDay = new Date(
        new Date()
            .getTime() - (24 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": pastDay } })
    .sort({date: 1})
    .then(data => res.json(data));
});

module.exports = router;