const express = require('express');
const router = express.Router();

//Sensor data DB model
const Data = require('../../models/Data');

// @route   GET /api/last-rocord
// @desc    Get the last sensor data record
// @acc     Public
router.get('/', (req, res) => {
    
    Data
    .findOne()
    .sort({$natural: -1})
    .then(data => res.json(data));
});

module.exports = router;