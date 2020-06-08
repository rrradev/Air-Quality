const express = require('express');

const router = express.Router();

//Sensor data model
const Data = require('../../models/Data');

// @route   GET /api/data
// @desc    Get all sensor data 
// @acc     Public (for now)
router.get('/', (req, res) => {
    console.log("GET req");
    var pastDay = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    Data
    .find({ "date": { "$gte": pastDay } })
    .sort({date: 1})
    .then(data => res.json(data));
});

// @route   POST /api/data
// @desc    Post sensor data to db
// @acc     Public (for now)
router.post('/', (req, res) => {
    console.log('POST req');
    const newData = new Data({
        pm25: req.body.pm25,
        pm10: req.body.pm10
    });
     newData.save()
     .then(data => res.json(data));
});

module.exports = router;
