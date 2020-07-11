const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/gas', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../',
        'client', 'public', 'icons', 'gas.png'));
});
router.get('/termometer', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../',
         'client', 'public', 'icons', 'termometer.png'));
});
router.get('/humidity', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../', 
        'client', 'public', 'icons', 'humidity.png'));
});

module.exports = router;