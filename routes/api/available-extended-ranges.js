const express = require('express');
const router = express.Router();
const Data = require('../../models/Data');
const { globalLimit } = require('../../middleware/rateLimit');
const { globalSlowDown } = require('../../middleware/slowDown');

router.get('/', globalSlowDown, globalLimit, async (req, res) => {
    const now = new Date();

    const ranges = [
        { id: '1m', duration: 30 },
        { id: '3m', duration: 90 },
        { id: '6m', duration: 180 },
        { id: '1y', duration: 365 },
    ];

    const available = [];

    for (const range of ranges) {
        const pastDate = new Date(now.getTime() - range.duration * 24 * 60 * 60 * 1000);

        const exists = await Data.exists({ date: { $lte: now, $gte: pastDate } });
        if (exists) {
            available.push(range.id);
        }
    }

    res.json({ ranges: available });
});

module.exports = router;