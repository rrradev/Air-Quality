const express = require('express');

const router = express.Router();

//Sensor data model
const Data = require('../../models/Data');

// @route   POST /api/data
// @desc    Post data to db
// @acc     Public (for now)
router.post('/', (req, res) => {
    console.log('POST post');
    const newData = new Data({
        pm25: req.body.pm25,
        pm10: req.body.pm10,
        date: Date.now()
    });
     newData.save()
     .then(data => res.json(data));
});

module.exports = router;
