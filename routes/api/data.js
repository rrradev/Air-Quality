const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Sensor data DB model
const Data = require('../../models/Data');

// @route   POST /api/data
// @desc    Post data to db
// @acc     Private
router.post('/', auth, (req, res) => {
    console.log('POST post');
    const {pm25, pm10, temp, hum} = req.body;

    const newData = new Data({
        pm25,
        pm10,
        temp,
        hum,
        date: Date.now()
    });
     newData.save()
     .then(data => res.json(data));
});

module.exports = router;
