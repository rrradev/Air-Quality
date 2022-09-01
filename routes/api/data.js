const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Sensor data DB model
const Data = require('../../models/Data');

// @route   POST /api/data
// @desc    Post data to db
// @acc     Private
router.post('/', auth, (req, res) => {
    console.log('POST ' + JSON.stringify(req.body));

    const {pm25, pm10, temp, hum} = req.body;

    if(!+pm25 || !+pm10 || !+temp || !+hum) {
        res.status(400).json(req.body);
        console.log("Invalid data");
        
        return;
    }

    const newData = new Data({
        pm25,
        pm10,
        temp,
        hum,
        date: Date.now()
    });

     newData.save()
     .then(data => res.status(201).json(data));
});

module.exports = router;
