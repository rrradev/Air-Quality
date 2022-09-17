const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { groupByHourPipeline } = require('../../lib/db_pipelines');
const Data = require('../../models/Data');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   ApiKeyAuth:
 *    type: apiKey
 *    in: header  
 *    name: x-auth-token
 * 
 * security:
 *  - ApiKeyAuth: []  
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       required:
 *         - pm25
 *         - pm10
 *         - temp
 *         - hum
 *       properties:
 *         _id:
 *           type: String
 *           description: Auto-generated id of the sensor data entry
 *         pm25:
 *           type: Number
 *           description: Particulate Matter - 2.5 micrometers and smaller.
 *         pm10:
 *           type: Number
 *           description: Particulate Matter - 10 micrometers and smaller.
 *         temp: 
 *           type: Number
 *           description: Temperature, C
 *         hum:
 *           type: Number
 *           description: Humidity, %
 *         date:
 *            type: Date
 *            description: Auto-generated date of creation
 *         __v:
 *            type: Number
 *            description: Version key
 *       example:
 *         _id: 63134fb957ed91027b5cc970
 *         pm25: 5.5
 *         pm10: 9.1
 *         temp: 26.5
 *         hum: 77
 *         date: 2022-09-03T12:59:37.728Z
 *         __v: 0
 *     Data-Simple:
 *       type: object
 *       example:
 *         pm25: 5.5
 *         pm10: 9.1
 *         temp: 26.5
 *         hum: 77
 */

/** 
 * @swagger 
 * /api/data:
 *   post: 
 *     summary: Create new sensor data entry
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Data-Simple'
 *     security:
 *      - ApiKeyAuth: []
 *     responses:  
 *       201: 
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, (req, res) => {
    console.log('POST ' + JSON.stringify(req.body));

    const { pm25, pm10, temp, hum } = req.body;

    if (!+pm25 || !+pm10 || !+temp || !+hum) {

        let error = [{
            "error": "Invalid Data."
        }];

        error.push(req.body);
        res.status(400).json(error);
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

/** 
 * @swagger 
 * /api/data:
 *   get: 
 *     summary: Get sensor data
 *     description: By default the most recent data entry is returned (1). Getting multiple entires for a given time frame can be controlled via query params
 *     parameters:
 *      - in: query
 *        name: hours
 *        schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 24
 *        description: The sensor data for the past number of hours
 *      - in: query
 *        name: days
 *        schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 10
 *        description: The sensor data for the past number of days. Cancels hours.
 *      - in: query
 *        name: groupByHour 
 *        schema:
 *         type: boolean
 *        description: The average of the sensor data grouped by hour
 *     responses:  
 *       200: 
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Data' 
 */
router.get('/', (req, res) => {
    console.log('GET /api/data');
    console.log(req.query);

    if (Object.keys(req.query).length === 0) {
        Data.findOne()
            .sort({ $natural: -1 })
            .then(data => {
                data = data || [];
                return res.json(data);
            })
            .catch(err => res.status(500).json({}));

        return;
    }

    let { hours, days, groupByHour } = req.query;

    if (days == 1) {
        hours = 24;
    } else {
        hours = +hours || 1;
    }

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

    if (groupByHour === "true") {
        const pipeline = groupByHourPipeline(pastDate);
        Data.aggregate(pipeline)
            .then(data => res.json(data));
    } else {
        Data.find({ "date": { "$gte": pastDate } })
            .then(data => res.json(data));
    }
});

module.exports = router;
