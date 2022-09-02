const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { groupByHourPipeline } = require('../../lib/db_pipelines');

//Sensor data DB model
const Data = require('../../models/Data');

// @route   POST /api/data
// @desc    Post data to db
// @acc     Private
router.post('/', auth, (req, res) => {
    console.log('POST ' + JSON.stringify(req.body));

    const { pm25, pm10, temp, hum } = req.body;

    if (!+pm25 || !+pm10 || !+temp || !+hum) {
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

// @route   GET /api/data
// @desc    Get sensor data
// @acc     Public
router.get('/', (req, res) => {
    console.log('GET /api/data');
    console.log(req.query);

    if (Object.keys(req.query).length === 0) {
        Data.findOne()
            .sort({ $natural: -1 })
            .then(data => res.json(data));

        return;
    }

    let { hours, days, groupByHour } = req.query;
    hours = +hours || 1;
    days = +days || 1;

    if (hours < 0 || hours > 24 || days > 1) {
        hours = 24;
    }

    if (days < 0 || days > 365) {
        days = 365;
    }

    const pastDate = new Date(
        new Date().getTime() - (days * hours * 60 * 60 * 1000)
    );

    if (groupByHour == "true") {
        const pipeline = groupByHourPipeline(pastDate);
        Data.aggregate(pipeline)
            .then(data => res.json(data));
    } else {
        Data.find({ "date": { "$gte": pastDate } })
            .then(data => res.json(data));
    }
});

module.exports = router;
