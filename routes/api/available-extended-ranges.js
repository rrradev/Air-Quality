const express = require('express');
const router = express.Router();
const Data = require('../../models/Data');
const { globalLimit } = require('../../middleware/rateLimit');
const { globalSlowDown } = require('../../middleware/slowDown');
const { countDistinctDaysWithData } = require('../../lib/db/db_pipelines');

/**
 * @swagger
 * /api/available-extended-ranges:
 *   get:
 *     tags:
 *       - extended ranges controller
 *     summary: Get available extended data ranges
 *     description: Returns available time ranges (1m, 3m, 6m, 1y) based on whether enough sensor data exists in each range. A range is considered available if at least 80% of the days contain data.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ranges:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["1m", "3m", "6m"]
 *       500:
 *         description: Server error
 */
router.get('/', globalSlowDown, globalLimit, async (req, res) => {

    try {
        const now = new Date();
        const ranges = [
            { id: '1m', days: 30 },
            { id: '3m', days: 90 },
            { id: '6m', days: 180 },
            { id: '1y', days: 365 },
        ];

        const aggregationPromises = ranges.map(async (range) => {
            const pastDate = new Date(now.getTime() - range.days * 24 * 60 * 60 * 1000);
            const daysWithDataResult = await Data.aggregate(countDistinctDaysWithData(pastDate));
            const distinctDays = daysWithDataResult[0]?.distinctDaysWithData || 0;
            return {
                id: range.id,
                meetsThreshold: distinctDays >= Math.floor(range.days * 0.8),
            };
        });

        const results = await Promise.all(aggregationPromises);

        const available = results
            .filter(result => result.meetsThreshold)
            .map(result => result.id);

        res.json({ ranges: available });

    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;