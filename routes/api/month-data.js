const express = require('express');
const router = express.Router();
const { groupByHourAgg } = require('../../lib/db_aggregations');

//Sensor data DB model
const Data = require('../../models/Data');

// @route   GET /api/month-data
// @desc    Get sensor data for the past month
// @acc     Public
router.get('/', (req, res) => {
    console.log("GET day data");
    var pastMonth = new Date(
        new Date()
            .getTime() - (30 * 24 * 60 * 60 * 1000));
    var agg = groupByHourAgg(pastMonth);
    Data
    .aggregate(agg)
    .then(data => res.json(data));
});

module.exports = router;